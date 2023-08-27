### 前言

在学校参加了一个挑战杯课外学术作品，主要目的是为了实现安全驾驶检测。但是由于经费有限，最后的呈现形式就是前端上传一个文件过去，后端就实时返回识别结果。

### 硬盘扩容

由于docker镜像太大，VMWare虚拟机需要先扩充一下硬盘，无需求的读者可跳过。

原地址：[VMWare增加磁盘空间的操作 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1873402)

```bash
[root@localhost ~]# fdisk /dev/sda
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type:
   p   primary (2 primary, 0 extended, 2 free)
   e   extended
Select (default p): p
Partition number (3,4, default 3): 
First sector (64483328-167772159, default 64483328): 
Using default value 64483328
Last sector, +sectors or +size{K,M,G} (64483328-167772159, default 167772159): 
Using default value 167772159
Partition 3 of type Linux and of size 49.3 GiB is set

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.

WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
The kernel still uses the old table. The new table will be used at
the next reboot or after you run partprobe(8) or kpartx(8)
Syncing disks.

[root@localhost ~]# mkfs -t ext3 /dev/sda3
mke2fs 1.42.9 (28-Dec-2013)
warning: 512 blocks unused.

Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
3233952 inodes, 12910592 blocks
645529 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
394 block groups
32768 blocks per group, 32768 fragments per group
8208 inodes per group
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000, 7962624, 11239424

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done  

[root@localhost ~]# mkdir -p /oradata

[root@localhost ~]# mount /dev/sda3 /oradata

[root@localhost ~]# lsblk -f
NAME            FSTYPE      LABEL UUID                                   MOUNTPOINT
sda                                                                      
├─sda1          xfs               845f5658-c424-4ff6-9a1c-ef1b8177b715   /boot
├─sda2          LVM2_member       pCZSe6-u0uB-K0GH-415S-sGNp-1neL-pcgrUn 
│ ├─centos-root xfs               91320aa3-89f2-4c41-b0c4-3e67b88bafc0   /
│ ├─centos-swap swap              5351f74d-99f1-470f-b20a-733bb326bc96   [SWAP]
│ └─centos-home xfs               56a261c7-e7d6-4969-ae3c-0ec6daa023d8   /home
└─sda3          ext3              b7644c17-76ac-4bc4-84e0-2ed1b32e3b3d   /run/media
sr0    
```

### 后端识别逻辑

* 图像处理：利用yolov5调库实现
  * 这部分逻辑是团队另一个同学实现的，因此不进行相关叙述，有兴趣的同学可以看我[github](https://github.com/lovestories0eng/detect)地址。

* 数据传输：把前端传过来的mp4文件逐帧分解，一帧帧进行识别
  * 主要用到了`ffmpeg`这个库

* web服务：使用flask展示web界面并提供socket套接字服务

中间会报一个错误，按照如下连接改掉库文件源码即可。

[YOLOV5 | AttributeError: ‘Upsample‘ object has no attribute ‘recompute_scale_factor‘ 问题解决 亲测有效_RodgeH的博客-CSDN博客](https://blog.csdn.net/weixin_43401024/article/details/124428432)

### 前端websocket

* 使用`WebSocket`对象与服务器进行套接字传输服务
* 完善心跳重连机制

具体待我补充～～～

### docker部署

```dockerfile
# 拉取pytorch轻量镜像
FROM python:3.7-slim-buster
# 更新系统库
RUN apt-get update
# 安装图像转码库
RUN apt-get install ffmpeg libsm6 libxext6 -y
# 更新pip
RUN python -m pip install --upgrade pip

# 把当前文件夹下的依赖库文件拷贝到容器中
COPY requirements.txt .
# 安装依赖
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# 创建工作目录
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# 把当前所有文件复制到容器的工作目录中
COPY . /usr/src/app
# 暴露5000端口
EXPOSE 5000
CMD ["python", "project.py"]
```

```shell
# 使用docker-compose打包文件
docker build --tag yolov5:prodction .
# 以交互式方式进入容器，debug时有用
docker run -it yolov5:demo /bin/bash
# debug完成后，把当前容器打包成镜像
docker commit -m "test" -a "psh" -c 'CMD ["python", "final.py"]' 35b77baa57d3 yolov5:demo
# 本地虚拟机运行
docker run -d -p 8082:8082 --name detect -v /oradata/tmp/images:/usr/src/app/images yolov5:demo
# 将镜像打包并上传至服务器
docker save yolov5:demo -o /oradata/tmp/images/yolov5.tar
# scp利用ssh上传文件到服务器
scp /oradata/data/tmp/yolov5.tar root@124.223.164.9:/data/images/yolov5.tar
# 服务端运行
docker run -d -p 8082:8082 --name detect -v /usr/service/tomcat/webapps/ROOT/static/images:/usr/src/app/images yolov5:demo
```

### websocket原理、心跳检测

等待后续更新

### 结果呈现

在页面中上传文件，然后点击发送文件按钮，就可以实时接收识别结果了。

### 完整代码

https://github.com/lovestories0eng/detect

#### 参考文献

[Centos7修改Docker默认存储位置 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1604396)

