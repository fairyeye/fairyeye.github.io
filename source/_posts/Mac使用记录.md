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