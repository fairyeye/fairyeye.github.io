---
title: Git
date: 2023-06-17 22:33:35
tags: git
categories: use
description: 
---


### Gitee Go

#### 流水线

```
# 官方文档
https://blog.gitee.com/2022/11/23/pipeline/
```

#### 前端CI

手动创建流水线，选择部署分之，需要手动增加部署阶段

##### 添加部署阶段

1. 点击发布后面的＋    添加新阶段

2. 点击部署  点击主机部署

![](https://s3.bmp.ovh/imgs/2023/06/17/2e1e2d665f8fcd29.png)


3. 选择执行主机组（如果没有就先去添加主机，选择

![](https://s3.bmp.ovh/imgs/2023/06/17/d1715a1b2ec593f8.png)

4. 填写部署脚本，前端项目把上游构建的包，解压到服务器指定路径即可

```sh
# 功能：部署脚本会在部署主机组的每台机器上执行
# 使用场景：先将制品包解压缩到指定目录中，再执行启动脚本deploy.sh，脚本示例地址：https://gitee.com/gitee-go/spring-boot-maven-deploy-case/blob/master/deploy.sh
# mkdir -p /home/admin/app
# tar zxvf ~/gitee_go/deploy/output.tar.gz -C /home/admin/app
# sh /home/admin/app/deploy.sh restart
# 如果你是php之类的无需制品包的制品方式，可以使用 git clone 或者 git pull 将源代码更新到服务器，再执行其他命令
# git clone ***@***.git
tar zxvf ~/gitee_go/deploy/output.tar.gz -C /home/ubuntu 


```





#### 添加主机

1. 点击新建主机组

![](https://s3.bmp.ovh/imgs/2023/06/17/e0925018357ec4d5.png)

2. 选择新建类型（以腾讯云为例），填写基本信息（以Linux为例），点击确认

![](https://s3.bmp.ovh/imgs/2023/06/17/09807a134b458ca9.png)

3. 添加主机

点击添加Linux主机，选择通过命令行逐台添加，

复制命令到目标腾讯云主机命令行

刷新页面即可见关联服务器信息

![](https://s3.bmp.ovh/imgs/2023/06/17/ba5c1004444b1e6a.png)


![](https://s3.bmp.ovh/imgs/2023/06/17/b3943c35c7f70d3b.png)



#### 后端CI



##### 部署脚本

```sh
cd ~/gitee_go/deploy/
ls
tar -zxf API.tar.gz
cd target
pid=`ps -ef|grep smart-admin-api-1.0.0|grep -v grep|awk '{print $2}'`
if [ $pid ]
then
sudo kill -15 $pid  
fi

sudo nohup /usr/lib/jvm/jdk1.8.0_341/bin/java -jar smart-admin-api-1.0.0.jar >/home/ubuntu/log.log &


```


```sh
cd ~/gitee_go/deploy/
ls
tar -zxf API.tar.gz
cd target
pid=`ps -ef|grep smart-admin-api-1.0.0|grep -v grep|awk '{print $2}'`
if [ $pid ]
then
sudo kill -15 $pid  
fi

sudo nohup /usr/lib/jvm/jdk1.8.0_341/bin/java -jar smart-admin-api-1.0.0.jar





> /home/ubuntu/log.log 2>&1 &

```



### 开源项目


#### [Oshi](https://github.com/oshi/oshi)

```
获取操作系统和硬件信息的 Java 库。这是一个基于 JNA 实现的获取本机操作系统和硬件信息的库，支持操作系统版本、进程、内存、 CPU 使用率、磁盘和分区、设备、传感器等信息。
```

#### [PlayEdu](https://github.com/PlayEdu/PlayEdu)

```
一款 Java 写的内部培训系统。这是一款基于 SpringBoot+React 开发而成的视频培训系统，它界面清爽、交互流畅，支持上传资源、创建部门、添加学员、指派课程等功能，可用于企业和机构搭建内部培训平台。
```

#### [Holer](https://github.com/wisdom-projects/holer)

```
一个将局域网中的应用映射到公网访问的端口映射软件，支持转发基于 TCP 协议的报文。内网穿透工具，包含 Web 后台管理系统。用到的技术如下：

- 服务端采用 SpringBoot 和 Netty 实现
- 客户端采用 Java Netty 和 Go 语言实现
```
![](https://s3.bmp.ovh/imgs/2023/09/13/e1c366275bdb16f6.png)


#### [SoloPo](https://github.com/alipay/SoloPi)

```
一个不需要连接电脑、非侵入式的 Android 自动化工具。公测版拥有录制回放、性能测试、一机多控三项主要功能，能为测试开发人员节省宝贵时间。安卓版本多、终端型号多，一个成熟安卓应用的上线需要进行大量测试，而很多测试都是属于重复操作，通过此工具可以极大简化测试人员的工作量
```
![](https://s3.bmp.ovh/imgs/2023/09/13/f9f815c624347451.png)



### Git技巧


```
https://hellogithub.com/article/9aed28d4d64b4649bb364685ef557ae4
```