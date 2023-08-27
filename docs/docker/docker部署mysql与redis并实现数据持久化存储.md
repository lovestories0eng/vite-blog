### Mysql数据持久化

```bash
# 利用阿里云脚本安装docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 拉取mysql5.7镜像
docker pull mysql:5.7
```

在这里，由于我的`mysql`服务是要部署到服务器中的，因此宿主机使用`12276`端口（不使用`3306`端口）映射到容器内部的3306端口。

`Ps`: 一定要事先在宿主机中创建好相关文件。

```bash
docker run -d -p 12276:3306  -v /docker/mysql/conf:/etc/mysql/conf.d -v /docker/mysql/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=Abc.12345 --name mysql5.7 mysql:5.7
```

参数解释:

* -d: 表示在后台运行
* -p: 端口映射，宿主机`12276`映射至容器`3306`端口
* -v: 数据卷挂载
  * `/docker/mysql/conf:/etc/mysql/conf.d` 表示宿主机`/docker/mysql/conf`映射至容器内部`/etc/mysql/conf.d`文件
  * 其他依此类推
* -e: 容器环境变量
  * `MYSQL_ROOT_PASSWORD=Abc.12345`表示设置密码为`Abc.12345`
* --name: 容器名称，这里为`mysql5.7`

### redis数据持久化

redis参考配置文件: [redis配置文件参考](./redis-configure-file.md)

同理，要首先在宿主机创建相关文件及文件夹

```shell
docker pull redis
docker run -p 6379:6379 --name forredis2 --privileged=true -v /docker/redis/redis.conf:/etc/redis/redis.conf -v /docker/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```

参数介绍:

docker run -p 6380:6380 --name forredis2 别名

* --privileged=true 挂载容器卷目录权限

* -v /docker/redis/redis.conf[宿主机配置文件]:/etc/redis/redis.conf [容器配置文件]

* -v /docker/redis/data[宿主机数据存储位置]:/data [容器数据存储位置]

* -d  redis redis-server /etc/redis/redis.conf 容器运行`redis redis-server /etc/redis/redis.conf`命令

为了验证redis持久化，先进去存一些键值。然后删除容器，但是不删除宿主机的文件，试着删除容器后重新启动一下看原来的键值还在不在。

#### 1.启动redis服务

```perl
[root@localhost data]# docker exec -it forredis2 /bin/bash
root@d536dd728243:/data# redis-server /etc/redis/redis.conf
24:C 02 Jun 2022 02:42:56.096 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
24:C 02 Jun 2022 02:42:56.096 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=24, just started
24:C 02 Jun 2022 02:42:56.096 # Configuration loaded
24:M 02 Jun 2022 02:42:56.097 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 6.2.6 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6380
 |    `-._   `._    /     _.-'    |     PID: 24
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'
复制代码
```

如果要后台运行，将启动redis命令后加上&，即

redis-server /etc/redis/redis.conf &

“/etc/redis/redis.conf”为容器内配置文件，已通过启动容器时挂载到宿主机的/docker/redis/redis.conf

#### 2.指定6380端口登陆客户端

```ruby
root@ce16f8c4fd8c:/data# redis-cli -p 6380
127.0.0.1:6380> auth 123
OK
127.0.0.1:6380> keys *
(empty array)
127.0.0.1:6380> set a 1
OK
127.0.0.1:6380> keys *
1) "a"
复制代码
```

#### 3.删除容器后重新启动容器

为了验证redis持久化，删除容器后数据在宿主机不会丢失，我们尝试删除容器后重新启动

1.删除，然后查看宿主机目录下是否有持久化文件，查看这一步可以放在上一步后

```shell
[root@localhost ~]# docker rm -f forredis2
forredis2
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED        STATUS                      PORTS     NAMES
e28f2bd4b59e   redis           "docker-entrypoint.s…"   10 hours ago   Exited (130) 10 hours ago             exciting_yalow
4e291d491cda   redis           "docker-entrypoint.s…"   10 hours ago   Exited (0) 10 hours ago               dreamy_rhodes
be3f2f06ed9f   redis           "docker-entrypoint.s…"   12 hours ago   Exited (0) 12 hours ago               awesome_jones
9a206e517842   redis           "docker-entrypoint.s…"   12 hours ago   Exited (0) 12 hours ago               hopeful_volhard
69c9f429c98a   7614ae9453d1    "docker-entrypoint.s…"   16 hours ago   Exited (1) 16 hours ago               youthful_goodall
25f26d7892d5   redis           "docker-entrypoint.s…"   18 hours ago   Exited (0) 16 hours ago               amazing_lovelace
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@localhost ~]# cd /docker/redis/data/
[root@localhost data]# ls
appendonly.aof  dump.rdb
```

2.重启容器

```shell
[root@localhost data]# docker run -p 6380:6380 --name forredis2 --privileged=true -v /docker/redis/redis.conf:/etc/redis/redis.conf -v /docker/redis/data:/data -d redis
d536dd728243ccee23b78e0289e30f7ee25084d308766fb9aa317d691d0dea7dc
```

重复第【二】步的操作，进入redis，查看数据是否存在

```shell
[root@localhost ~]# docker exec -it forredis2 /bin/bash
root@d536dd728243:/data# redis-cli -p 6380
127.0.0.1:6380> auth 123
127.0.0.1:6380> keys *
1) "a"
```

数据存在，成功！

参考文献：

* [docker 安装redis：挂载容器卷，同时开启持久化 - 掘金 (juejin.cn)](https://juejin.cn/post/7104480777907224590)
