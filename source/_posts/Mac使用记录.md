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