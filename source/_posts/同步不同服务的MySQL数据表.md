---
title: MySQL查询
date: 2020年10月22日
tags: utils
categories: 数据库
description: 通过FEDERATED同步在不同MySQL服务的两张表
---



#### 1. 首先要保证本地的MySQL服务支持FEDERATED引擎。

```
输入：SHOW ENGINES;
如下 FEDERATED 行的Support为YES则表示开启了FEDERATED。
如果为 NO 则表示未开启。

如果 FEDERATED 没有开启的话 要启用。
```

![](https://i.loli.net/2020/10/22/7a8G6nUXbLM24wl.png)

#### 2.启用 FEDERATED

```
在MySQL的配置文件
安装目录下的my.ini或my.cnf 
加上 一行  `FEDERATED`
```

![](https://i.loli.net/2020/10/22/HhLBosuOdeNDbgQ.png)

#### 3.建表

**建表一般应的是InnoDB引擎，这里需要修改一下 改为** `ENGINE=FEDERATED`

从原表导出表结构SQL，然后修改 `ENGINE = InnoDB`->`ENGINE=FEDERATED CONNECTION='mysql://用户名:密码@IP:PORT/库名/表名'`

然后打开这张表，可以看到远程表里的数据已经同步到了这张表。