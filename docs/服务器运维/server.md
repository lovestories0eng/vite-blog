### 服务器常见运维指令

安装宝塔控制面板

```shell
sudo yum install -y wget && sudo wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sudo sh install.sh ed8484bec
```

结果: 

```shell
Complete!
Created symlink from /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service to /usr/lib/systemd/system/firewalld.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/firewalld.service to /usr/lib/systemd/system/firewalld.service.
success
==================================================================
Congratulations! Installed successfully!
==================================================================
外网面板地址: http://124.223.164.9:8888/8892304a
内网面板地址: http://10.0.16.4:8888/8892304a
username: obcf9tp9
password: 2e6f62fa
If you cannot access the panel,
release the following panel port [8888] in the security group
若无法访问面板，请检查防火墙/安全组是否有放行面板[8888]端口
```

在本地就可以通过http://10.0.16.4:8888/8892304a访问宝塔控制面板了。
