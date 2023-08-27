### 前言

跟着老师做了一个项目，虽然因为一个同学的问题导致项目黄了～，为了代码的保密性，因此不选用`GitHub`或者`gitee`，选择自用`gitlab`。

### 步骤

查询可用镜像

```shell
docker search gitlab
```

下载镜像

```shell
docker pull gitlab/gitlab-ce
```

由于服务器22端口是用于shell登陆的，因此选择使用10010端口作为gitlab的ssh端口。

```shell
docker run -d -p 80:80 -p 10009:443 -p 10010:22 --restart always --name gitlab -v /docker/gitlab/etc/gitlab:/etc/gitlab -v /docker/gitlab/var/log/gitlab:/var/log/gitlab -v /docker/gitlab/var/opt/gitlab:/var/opt/gitlab --privileged=true gitlab/gitlab-ce
```

### 参考配置

```shell
external_url 'http://47.122.21.14'
gitlab_rails['gitlab_ssh_host'] = '47.122.21.14'
gitlab_rails['time_zone'] = 'Asia/Shanghai'

gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "1494121350@qq.com"
gitlab_rails['smtp_password'] = "eqapgxlnojxihhji"
gitlab_rails['smtp_domain'] = "smtp.qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true

gitlab_rails['gitlab_email_enabled'] = true

gitlab_rails['gitlab_email_from'] = '1494121350@qq.com'
gitlab_rails['gitlab_email_display_name'] = 'gitlab.ABC.com'
gitlab_rails['gitlab_email_reply_to'] = 'noreply@example.com'
```

### 重启gitlab

```shell
docker restart gitlab
```

### 测试

```shell
docker exec -it gitlab /bin/bash
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
```

参考文件配置（部分）

```shell
# This file is managed by gitlab-ctl. Manual changes will be                                                                    
# erased! To change the contents below, edit /etc/gitlab/gitlab.rb                                                              
# and run `sudo gitlab-ctl reconfigure`.                                                                                        
                                                                                                                                
production: &base                                                                                                               
  #                                                                                                                             
  # 1. GitLab app settings                                                                                                      
  # ==========================                                                                                                  
                                                                                                                                
  ## GitLab settings                                                                                                            
  gitlab:                                                                                                                       
    ## Web server settings (note: host is the FQDN, do not include http://)                                                     
    host: 47.122.21.14                                                                                                          
    port: 80                                                                                                                    
    https: false                                                                                                                
                                                                                                                        
                                                                                                                                
    # The maximum time puma can spend on the request. This needs to be smaller than the worker timeout.                         
    # Default is 95% of the worker timeout                                                                              
    max_request_duration_seconds: 57                                                                                            
                                                                                                                                
    # Uncommment this line below if your ssh host is different from HTTP/HTTPS one                                              
    # (you'd obviously need to replace ssh.host_example.com with your own host).                                        
    # Otherwise, ssh host will be set to the `host:` value above                                                                
    ssh_host: 47.122.21.14
```

### 密码设定

```shell
cat /docker/gitlab/etc/gitlab/initial_root_password
```

之后在web界面中修改成自己的密码即可。

### 测试邮件功能

```shell
gitlab-ctl reconfigure
gitlab-rails console -e production
Notify.test_email('1494121350@qq.com', 'Hello World', 'This is a test message').deliver_now
```

参考文献:

https://juejin.cn/post/6844903967600672782
https://blog.csdn.net/JackMaF/article/details/119369639
https://developer.aliyun.com/article/922952



