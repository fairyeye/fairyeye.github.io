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


#### [Hitomi](https://github.com/KurtBestor/Hitomi-Downloader)

**本周 star 增长数：400+**，**主语言：Python**

Hitomi-Downloader 知名下载工具，只需要一个 url 就能下载对应的图片、视频、音频。部分特性：

- 简洁的用户界面
    
- 支持下载加速，也支持限速
    
- 支持单任务由 24 个线程
    
- 支持多种下载方式

#### Python 搞定 UI：nicegui

**本周 star 增长数：850+**，**主语言：Python、JavaScript**

`New` 用 Python 搞定 Web UI，有了它，你可以用 Python 创建按钮、对话框、Markdown 文件、3D 场景。

> GitHub 地址→https://github.com/zauberzeug/nicegui

![](https://s3.bmp.ovh/imgs/2023/09/22/65aeeb9f2a95da35.png)


#### 炫酷的 Windows 终端软件：FluentTerminal

**主语言：C#**

基于 UWP 的 Windows 终端应用，拥有强大的自定义主题模块，能够轻松定制出风格各异的主题。提供了中文选项，支持多窗口、SSH 和搜索等功能。

> HG 评价地址→https://hellogithub.com/repository/352150f3034742cbbf67d301a86973ca


#### 1.2 AI 生图：ControlNet

**主语言：Python**

`New` 上周线稿上色的 style2paints 在 ControlNet 面前可能只是个弟弟。ControlNet 是一种通过添加额外条件来控制扩散模型的神经网络结构。为什么说 style2paints 是个弟弟呢？这是 ControlNet 的社生成效果图，从线稿到成品，一句话搞点。

> GitHub 地址→https://github.com/lllyasviel/ControlNet


#### [1Panel](https://github.com/1Panel-dev/1Panel)

```
[1Panel Log]: 1Panel 服务启动成功!
[1Panel Log]:
[1Panel Log]: =================感谢您的耐心等待，安装已经完成==================
[1Panel Log]:
[1Panel Log]: 请用浏览器访问面板:
[1Panel Log]: 面板地址: http://$LOCAL_IP:29252/821d637d70
[1Panel Log]: 用户名称: e0ae9ef986
[1Panel Log]: 用户密码: zhang...1997
[1Panel Log]:
[1Panel Log]: 项目官网: https://1panel.cn
[1Panel Log]: 项目文档: https://1panel.cn/docs
[1Panel Log]: 代码仓库: https://github.com/1Panel-dev/1Panel
[1Panel Log]:
[1Panel Log]: 如果使用的是云服务器，请至安全组开放 29252 端口
[1Panel Log]:
[1Panel Log]: ================================================================
```

###  [Nezha](https://github.com/naiba/nezha)

国产的轻量级服务器监控工具。这是一款名为“哪吒”的服务器监控面板，它安装简单、开箱即用，支持监控多个服务器的系统状态、SSL 证书状态、报警通知、流量监控、设置定时任务等功能，适用于 Linux、Windows、macOS、OpenWRT 等主流系统。

![](https://s3.bmp.ovh/imgs/2023/10/12/87fe9705e1078ecc.png)



### Git技巧


```
https://hellogithub.com/article/9aed28d4d64b4649bb364685ef557ae4
```