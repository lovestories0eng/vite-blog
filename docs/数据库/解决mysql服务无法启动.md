---
title: 解决mysql服务无法启动
top: false
cover: false
toc: true
mathjax: true
date: 2021-12-01 11:27:45
password:
summary: 解决mysql服务无法启动
tags:
- MySQL
categories:
- MySQL
keywords:
description:
---

```
mysqld --initialize --user=root --console
```

```
2021-12-01T03:25:37.412027Z 0 [System] [MY-013169] [Server] E:\Program Files\MySQL\bin\mysqld.exe (mysqld 8.0.26) initializing of server in progress as process 9276
2021-12-01T03:25:37.444360Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-12-01T03:25:38.123056Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-12-01T03:25:40.064248Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2021-12-01T03:25:40.065214Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2021-12-01T03:25:40.312941Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: swSO2!rWsG59
```

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
```

```
Query OK, 0 rows affected (0.01 sec)
```

```
mysql -u root -p root
```

```
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.0.26 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

成功

bug解决

```
client does not support authentication
```

```
alter user 'root'@'localhost' identified with mysql_native_password by 'root';
```

```
Query OK, 0 rows affected (0.01 sec)
```

