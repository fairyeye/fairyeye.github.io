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