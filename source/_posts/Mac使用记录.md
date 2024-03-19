---
title: Mac使用记录
description: 记录使用的软件、环境配置等
tags:
  - 日常记录
---
## 软件

###  ttygif

- 终端录制工具

#### 安装教程

```bash
brew install ttygif
```

#### 使用

```bash 命令行提示符 command:("[root@localhost] $":1,9-10||"[admin@remotehost] #":4-6)
ttyrec myrecording
```

### sshx

- 终端共享

#### 使用

```sh
zhanghuapengdeMacBook-Pro :: Downloads/work_space/AA % sshx

  sshx v0.2.1

  ➜  Link:  https://sshx.io/s/ZtVval8VO2#e9o4sruIiflVdh
  ➜  Shell: /bin/zsh
```



## Flutter

#### 环境安装：

[官方说明](https://docs.flutter.dev/get-started/install/macos)




## LUA

[lua+redis限流](https://mp.weixin.qq.com/s/Ag5E6D81diE6M-uehWloJQ)

![](https://s3.bmp.ovh/imgs/2024/01/25/41d94c7e3a65b7e2.png)


## Cargo


[install cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)


## 破解软件打不开

```sh
# 这个好像没生效
Mac :: ~ % sudo spctl --global-disable
Password:

# 将软件拖进来
Mac :: ~ % sudo xattr -r -c /Applications/Navicat\ Premium.app
```


## Jrebel 激活

```
docker pull qierkang/golang-reverseproxy
docker run -d -p 8888:8888 qierkang/golang-reverseproxy

#licene
http://127.0.0.1:8888/7a14c9f7-8a27-46d6-bb50-2b30c19e766c
```



###  一行命令下载全网视频
```sh
$ pip3 install you-get
```
**如何下载**

_**1.**_ 可通过如下命令查看该视频的详细信息。
```sh
you-get -i '视频url'
```
_**2.**_ 下载方式更简单，只需一行命令即可下载了：

```sh
you-get '视频url'
```


### Jan - 将人工智能带入您的桌面






```
```




## Sonoma系统退回到Catalina

![](https://s3.bmp.ovh/imgs/2024/03/18/26d4edbd95ba29b0.png)

20款MacBook Pro，使用Sonoma系统感觉有点卡顿，晚上说是新系统对旧Mac兼容不是很好，决定退回Catalina版本，最后一个Inter电脑发布的系统

准备：U盘（32G）（没有也行
时间机器：（没有也行 主打一个凑合
电脑硬盘：这个得有
Catalina系统安装器（去App Store下载好
0. 先分区
 - 有U盘的情况，直接新建一个系统分区就好（`APFS`格式）
 - 无U盘的情况，先建一个系统分区，再用至少20G空间做一个引导系统分区，格式选（Mac OS日志）
 - 分区的时候，该抹掉就抹掉，只要别把当前系统抹掉就行

1. 制作引导系统 （这步记不太清楚了

有U盘的情况下，重启电脑，按`option`键，显示小地球图标（没有图），大概就是下面的这种，
![](https://s3.bmp.ovh/imgs/2024/03/18/5ad8cd52fe6b475c.png)

2. 分区
3. 安装到分区上
4. 用Catalina系统制作时间机器，保证时间机器分区是Mac OS 扩展（日志式）
5. 将Sonoma系统数据备份到时间机器
6. 到Catalina系统，用迁移助理将数据迁移过来
7. 后续看情况删除Sonoma系统分区