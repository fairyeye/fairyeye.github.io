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

#### `MediaGo`是一个用Electron+Antd+Vite打造的开源视频下载工具。

专门针对m3u8格式的流媒体视频进行下载。这个工具不仅支持视频下载，还能处理B站视频下载，功能强大到让你惊呼“还有这种操作”！目前已经在GitHub上收获了超过4.7k的星星，可见其受欢迎程度。

#### 高颜值 Windows 系统桌面

Seelen UI 是一款专为 Windows 10 和 11 用户设计的桌面环境，旨在**通过高度自定义和提升生产力来优化您的桌面体验**。它无缝集成于系统，提供多种功能，允许您根据个人喜好定制桌面，并优化工作流程。

**个性化桌面：**Seelen UI 让您可以根据自己的风格和需求调整桌面。您可以自定义菜单、小部件等元素，打造最适合您的工作空间。

**平铺式窗口管理器：**Seelen UI 自动排列窗口，支持多任务处理，使工作流程更加流畅。

**音乐体验：**内置的媒体模块兼容大多数音乐播放器，您可以随时暂停、恢复和跳过曲目，而无需打开其他窗口。

开源地址：https://github.com/eythaann/Seelen-UI

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzESRD7Igh1GXjjsQZmeKKb6dOrjPbMLlCHvicWHeoWcW3LWcM8alo16bQMaLafQUHINmF3tvdTW1Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzESRD7Igh1GXjjsQZmeKKbUROW5GszEPMWmX3wcvduhUQCeGpR6uOISurcVUdb2rugxDr58XURcw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzESRD7Igh1GXjjsQZmeKKbVqXxdibYZrzc3wwXlxFM4R5w1icjngEuEOCUqvzaGyb7eRmz8RPiaONBg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzESRD7Igh1GXjjsQZmeKKbiakGW6YMDkpWRqlUIGdqABG6x54o0Aew8RLuozoDJuZk4pOslaS1nxw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzESRD7Igh1GXjjsQZmeKKbWxiaKNlN3fq2vJ7qetucrQLW7ibhmcKlg9krKdicfX2gxaus1ibTjKD1AA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



#### AI 驱动的简历匹配分析工具：Reactive-Resume

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNM62eLbdFNwVdxo9BK0DUaZGGXbdjw7vCXaBJbicwoibZer5ic12PNNgFMnREhq3WWr7Guibfe707RzBQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**主语言：Python**，**Star：5.1k**，**周增长：100**

这是一个基于 AI 的免费开源工具，可用于提升简历质量。它通过解析简历和职位描述，模拟求职者跟踪系统（ATS），并利用 FastEmbed 技术计算简历与职位描述的匹配程度，最后给出简历的修改建议，从而提高简历通过自动筛选系统的概率。

> GitHub 地址→github.com/srbhr/Resume-Matcher

#### 隐藏私人文件和应用的 Android 工具：Amarok-Hider

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNM62eLbdFNwVdxo9BK0DUaZjlvicibBMq5ibyE7YPeRx1ksXfeQ8Iluq9Ow6AwlqON4s7iaHNtxMXQGsg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：Java**，**Star：1.7k**

这是一款用于隐藏文件和应用的隐私保护工具，简单易用且界面美观。它通过混淆文件名来实现文件隐藏，而非加密操作，支持免 Root 一键隐藏应用、浮动按钮和快捷开关等功能。

> GitHub 地址→github.com/deltazefiro/Amarok-Hider

#### spotube：开源的 Spotify 客户端。

该项目是基于 Flutter 开发的 Spotify 客户端，完全免费且无广告。它使用 Spotify、JioSaavn 和 YouTube 作为音乐源，用户无需登录即可自由下载音乐，支持桌面和移动设备。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOiaxK5zKZxdQyUUkMwmvkkwpZz6kFqSIceLNqM9RRDgl5dTtsUYxlUZROLbwfa8dl32mEwaM3mJIA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/KRTirtho/spotube

#### frpc-desktop：跨平台的 frp 桌面客户端。

该项目是内网穿透工具 frp 的桌面客户端，更方便地实现内网穿透。它开箱即用、界面清爽，支持开机启动、多用户、配置导入和导出等功能，适用于 Windows、Linux 和 macOS 平台。来自 @蠢🐷 的分享

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOiaxK5zKZxdQyUUkMwmvkkw9eauoyVpCKk9nmwKibcyF5VFlvQnHhFDibTMsIDps851J858nb0MMnXA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/luckjiawei/frpc-desktop

#### 根据菜谱生成图片、根据毛坯设计房间

开源地址：https://github.com/Nutlope/roomGPT  
开源地址：https://github.com/Nutlope/picMenu

#### Rust 驱动的 HTTP 压测工具：oha

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNP1QBiaJpyxVV9vaUIloeALZhY4OEgRNwM8fVmOYqv9OEuPDqw96DR9QiaU6VvRzmRWwnDySHUwazaQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**主语言：Rust**

这是一个用 Rust 开发的 HTTP 请求压测工具，它操作简单、带 TUI 动画界面，支持生成请求延迟、吞吐量等指标的报告，以及动态 URL 和更灵活的请求间隔（burst-delay）等功能。

> 项目详情→hellogithub.com/repository/98b46ea0d7d84f4c944d0a35a9d2d140

####  免费的 API 学习平台：apihub

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNMmicoKVicSqSt2t1qze8SqazYXhvBicx42j1w1VoJxibgWuibmQQxMRxyu7qn0eH0iczKLicS0Z0iaRkFEfg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：JavaScript**，**Star：6.4k**，**周增长：1k**

这是一个功能齐全的 API 学习平台，支持多种编程语言（Node.js、Python、Go 等）的 API 开发和学习。它免费提供丰富的 API 集合，涉及社交媒体集成、支付网关、物联网设备连接和机器学习等领域。你可以在该平台获取 API 开发的各类资源，包括详细教程、接口文档、代码示例和在线尝试。除了使用在线服务外，强烈推荐用户选择本地部署，以避免官网服务每两小时重置数据的限制。

> GitHub 地址→github.com/hiteshchoudhary/apihub

#### 轻松启动本地 HTTPS 代理的工具：ophiuchi-desktop

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNMmicoKVicSqSt2t1qze8SqazefXibHqfAB99pX4ibia4L8kia5ic1tyuxO8hBYqHFVuNH30R50h583EoS1Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：TypeScript**，**Star：928**

这是一个本地 HTTPS 代理服务器管理工具，无需复杂配置即可轻松设置本地 HTTPS 代理。它使用 Docker 作为后端，并采用 Tauri 编写 GUI 界面，极大地简化了本地 HTTPS 代理的配置流程。不过，使用前需确保本机已安装 Docker。

> GitHub 地址→github.com/apilylabs/ophiuchi-desktop

#### 一个鼠标操作多个电脑

Deskflow 帮助用户**在多台计算机（包括 Windows、macOS 和 Linux）之间共享键盘和鼠标**，就像软件版的 KVM（但不包含视频功能）。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruxEzPa6F6qa1cut1bqhYJhHt83ekve7dmia3gKf5o4uBmB4SopibY3E3bhsHjBFbyh3HOP89dlLvBmA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

它支持 TLS 加密、Wayland 显示协议，**并且具备剪贴板共享功能**。作为社区驱动项目，Deskflow 鼓励用户参与开发和改进，同时与类似的开源项目合作，如 Synergy 和 Input Leap。用户可以通过安装包或源码编译来使用该软件。

> 开源地址：https://github.com/deskflow/deskflow


#### beszel：轻量级高颜值的 Docker 监控平台。

这是一个轻量级的服务器监控平台，包括 Docker 统计、历史数据和警报功能。它拥有友好的 Web 界面，配置简单、开箱即用，支持自动备份、多用户、OAuth 认证和 API 访问等功能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOh3AWZPLqMIsPX4YffnmwYV9dDjYm6WqUcYibM871CUYI68LMkXoulEEic338TkicJff30ibJQ7aL0kg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/henrygd/beszel

####  mame：开源的街机模拟器。

这是一款支持海量街机游戏的模拟器。它通过模拟多种硬件平台，实现了在电脑上运行各种复古软件的功能。不仅支持街机，还有老式电脑和游戏机。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOh3AWZPLqMIsPX4YffnmwYtkutJpJlCCvRfNLkleaadxwjQAkL97nicmVqVgIM4vYtcALQCfUk5FA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/mamedev/mame


#### shadPS4：开源的 PS4 模拟器。

这是用 C++ 编写的 PlayStation 4（PS4）模拟器，支持在 Windows、Linux 和 macOS 系统上玩 PS4 游戏。虽然项目仍处于早期开发阶段，能运行的游戏有限，但最新版已经能够成功运行《血源诅咒》和《黑暗之魂II》等游戏。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOTjhAHG3PgHxdZU0es1tDH182TnOW81kW8UAfmVEShP3jgU8sAxFnbh2yVowy3PEhfuqD9SNbkqw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/shadps4-emu/shadPS4

#### 索尼 PS1 模拟器“开源”项目

Duckstation是由stenzek开发的索尼PS 模拟器，适用于 x86-64/AArch32/AArch64/RV64。

这开源项目**专注于可玩性，速度，目标是尽可能让相对低端的设备也能玩 PS 游戏。默认设置即可运行所有支持的游戏，仅有部分兼容性问题。**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruw20geLdOwGhgyiaOuZa8ibWic1akIEo730UbTvrwbFk6ciaX2DOjYAF8WBgoibj50s7V1DyAwO8r27Zfw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> “开源”地址：https://github.com/stenzek/duckstation

#### omakub：精美的 Ubuntu 配置方案。

该项目可以将全新的 Ubuntu 24.04 系统配置成美观、功能齐全、适合 Web 开发的系统。只需简单的一条命令，即可拥有配置好的 GNOME 桌面环境、窗口管理工具、Alacritty 终端、Neovim 和 VSCode 编辑器等应用，还会将 Chrome 设置成默认浏览器。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNNHACLhrT0cZJ0t608OhI2GWqg5Bc66ZrtqTLuGkxpEYw2bs1ib2YcGFevbjsxMvWOCAribDibZXWniaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/basecamp/omakub

#### [Oshi](https://github.com/oshi/oshi)获取操作系统和硬件信息的 Java 库。

```
获取操作系统和硬件信息的 Java 库。这是一个基于 JNA 实现的获取本机操作系统和硬件信息的库，支持操作系统版本、进程、内存、 CPU 使用率、磁盘和分区、设备、传感器等信息。
```

#### [PlayEdu](https://github.com/PlayEdu/PlayEdu)一款 Java 写的内部培训系统。

```
一款 Java 写的内部培训系统。这是一款基于 SpringBoot+React 开发而成的视频培训系统，它界面清爽、交互流畅，支持上传资源、创建部门、添加学员、指派课程等功能，可用于企业和机构搭建内部培训平台。
```

#### [Holer](https://github.com/wisdom-projects/holer) 一个将局域网中的应用映射到公网访问的端口映射软件，支持转发基于 TCP 协议的报文。

```
一个将局域网中的应用映射到公网访问的端口映射软件，支持转发基于 TCP 协议的报文。内网穿透工具，包含 Web 后台管理系统。用到的技术如下：

- 服务端采用 SpringBoot 和 Netty 实现
- 客户端采用 Java Netty 和 Go 语言实现
```
![](https://s3.bmp.ovh/imgs/2023/09/13/e1c366275bdb16f6.png)


#### [SoloPo](https://github.com/alipay/SoloPi)一个不需要连接电脑、非侵入式的 Android 自动化工具。

```
一个不需要连接电脑、非侵入式的 Android 自动化工具。公测版拥有录制回放、性能测试、一机多控三项主要功能，能为测试开发人员节省宝贵时间。安卓版本多、终端型号多，一个成熟安卓应用的上线需要进行大量测试，而很多测试都是属于重复操作，通过此工具可以极大简化测试人员的工作量
```
![](https://s3.bmp.ovh/imgs/2023/09/13/f9f815c624347451.png)


#### [Hitomi](https://github.com/KurtBestor/Hitomi-Downloader) Hitomi-Downloader 知名下载工具

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


#### AI 生图：ControlNet

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

####  [Nezha](https://github.com/naiba/nezha) 国产的轻量级服务器监控工具。

这是一款名为“哪吒”的服务器监控面板，它安装简单、开箱即用，支持监控多个服务器的系统状态、SSL 证书状态、报警通知、流量监控、设置定时任务等功能，适用于 Linux、Windows、macOS、OpenWRT 等主流系统。

![](https://s3.bmp.ovh/imgs/2023/10/12/87fe9705e1078ecc.png)

#### Deskreen：将任何屏幕变成你的扩展显示器

我们经常需要在多个设备之间切换工作，但有时候，如果能将手机或平板变成电脑的第二屏幕，那将大大提高工作效率。

Deskreen，一个开源项目，正是为此而生！这是一个简单而强大的工具，**它允许你将任何带有网络浏览器的设备变成电脑的第二屏幕。**

无论是为了扩展你的工作空间，还是为了在大屏幕上展示你的演示文稿，Deskreen 都能轻松实现。

```
开源地址：https://github.com/pavlobu/deskreen
```

#### [Etcher](https://github.com/balena-io/etcher) 简单易用的 USB/SD 启动盘制作工具。

该项目可以将操作系统镜像烧录进 SD 卡或 USB 设备，可用于制作可启动、便携式的操作系统。它拥有友好的操作界面，仅需 3 步就能完成 USB 启动盘制作，适用于 Linux、macOS 和 Windows 10 及更高版本。

![etcher](https://img.hellogithub.com/i/fWOuYpyAv4TVn0j_1715044602.png)


#### MoneyPrinterTurbo：一键生成短视频的 AI 工具。

该项目是基于大模型服务的 AI 视频生成工具，只需要提供一个主题或关键字，就可以自动生成高清的短视频。它拥有简单易用的 Web 界面，支持批量生成、设置视频时长和横/竖屏尺寸等功能。来自 @jolahua 的分享

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/xBgIbW1vdNN1km98o6YnFZUWnr5GgkXLouuzgRL6B31s7Cml6iammZaXRia7tmadAyicQ2N30F7IbB2kmDgbXwRgg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/harry0703/MoneyPrinterTurbo


#### Omost ：极简提示词的文生图工具。

该项目基于 LLM 的编程能力帮用户自动完善文生图的提示词，可以根据用户输入的简短提示词生成高质量的图片，还支持图片局部修改等功能，比如将图片中的龙变成恐龙，极大地降低了编写文生图的门槛，无需复杂的提示词即可生成满意的图片。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN1km98o6YnFZUWnr5GgkXLGCiaHdCxvkicicwrooTMpYbYIu9s8q5hzqWRcOz9kicuHXibHpkeiaYEG2PA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/lllyasviel/Omost


#### Scrapegraph-ai ：基于 AI 的 Python 爬虫。

这是一个由 AI 驱动的 Python 爬虫库，它借助 LLM 的能力，可以根据提示词自动抓取目标网站的数据。

`smart_scraper_graph = SmartScraperGraph(       prompt="List me all the projects with their descriptions",       source="目标网站",       config=graph_config   )      result = smart_scraper_graph.run()   print(result)   `

> 地址：github.com/VinciGit00/Scrapegraph-ai

#### 全平台通用的换源工具：chsrc

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNPOhVtJmAeAhSWNbpRZiaYYr4hlmr7EP4u9SwNwoiajgOBCupEI188sMH4lg7D0hDVVHguZrReHfHfQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：C**

该项目能够为常见的 Linux 发行版、编程语言和软件切换至国内镜像源，操作简单仅需一条命令。它采用 C 语言编写，具有高效和轻量级的特点，支持测速、多平台以及项目级换源等功能，适用于优化下载速度或解决源受限的场景。

> 项目详情→hellogithub.com/repository/7666ba91e01e4a59be5809b02d9e8ff6

#### 免费的可视化 Web 页面构建平台：GrapesJS

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNM0SdfZZBicTn5DWTZgHx0ae1PnTfOx0QvPticBlnJAfI1ZOr1GBiaJqUPhoO9XqtZ5KXWQ0wEXSBZpg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：TypeScript**

该项目通过直观的可视化界面，让用户能够通过拖拽的方式，快速设计和构建网站的 HTML 模板。它所见即所得、移动端适配，适用于官网、新闻和 CMS 等类型的网站。

> 项目详情→hellogithub.com/repository/572e31f5fc7541efb19c16d331796edf

####  轻量级的 AI 证件照制作工具：HivisionIDPhotos

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOAQ2JbRhibxP6B2lFu0NIwksC40TA1kdW1q8bM1koyGYOQkI2NoooWDLFcp0vsUG18Vc5pqErLoTQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：Python**，**Star：1.9k**，**周增长：1.5k**

这是一款简单易用的 AI 证件照制作工具，能够生成标准证件照和六寸排版照。它提供了简洁的 Web 界面和 API 服务，即使在没有 GPU 的电脑上也能够运行，支持抠图、尺寸调整和自定义底色等功能。

> GitHub 地址→github.com/Zeyi-Lin/HivisionIDPhotos


#### Windows 激活：Microsoft-Activation-Scripts

**本周 star 增长数：1,100+**

有了 Microsoft-Activation-Scripts，激活 Windows 和 Office 不再是问题。它注重开源、减少反病毒软件的检测，这个用到 HWID、Ohook、KMS38、在线 KMS 激活方法的工具，一定能帮你解决 Windows 的激活问题。

> GitHub 地址→github.com/massgravel/Microsoft-Activation-Scripts


#### **source-code-hunter**：Spring 全家桶源码解读。该项目提供了一系列互联网主流框架和中间件的源码讲解，包括 Spring 全家桶、Mybatis、Netty、Dubbo 等框架。

> 地址：https://github.com/doocs/source-code-hunter


#### 免费的 AI 图像升级器：Upscaler

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNPydvTukojzHTnhQlLXGLsJ4t0OiaCFCQYqtp5SXDiclDBw2xQ0MIAtnHCFSwUJeT33Hq40VnjuV9RA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**主语言：TypeScript**，**Star：25k**，**周增长：1k**

这是一款通过 AI 算法提高图像分辨率（超级分辨率，简称超分）的桌面工具，它免费、开源、无需联网、开箱即用，安装包大概 200+MB，需要有 GPU 的机器才能运行，适用于 Windows、Linux 和 macOS 系统。

> GitHub 地址→github.com/upscayl/upscayl


####  在线的数据库设计工具：DrawDB

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNNpuPH55ddPkSnH9H4wHVSG5YudMeeSnXGSEw2HhFD6yPXgWyedmSQ7wO3hWIqSZEeialYhgoianlsA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**主语言：JavaScript**，**Star：4.7k**，**周增长：3.8k**

这个开源项目是一个免费、简单、强大的数据库实体关系（DBER）在线编辑器，无需注册即可直接在浏览器中使用。它提供了直观、可视化的操作界面，用户通过点击即可构建数据库表和导出建表语句，还可以导入建表语句，实现可视化编辑、错误检查等。支持 MySQL、PostgreSQL、SQLite、MariaDB、SQL Server 共 5 种常用的关系数据库。

> GitHub 地址→github.com/drawdb-io/drawdb



#### WingetUI：带界面的 Windows 包管理器。

该项目是一个为 Windows 常用的命令行包管理工具设计的用户界面，如 Winget、Scoop、Pip、NPM、.NET Tool 等。它的界面友好、设计美观、支持中文，通过它你可以轻松下载、安装、更新和卸载包管理器上发布的任何软件以及其它日常应用，如浏览器、PDF 阅读器等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkxbJX9TVeXSVphhvpywb7IRHMbJVW9Mf29bXj2iaFp6jDLg4xnjEhZJA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/marticliment/WingetUI



#### freeze：生成代码图片的终端工具。

该项目可以将代码片段和终端输出，转换成 PNG、SVG 和 WebP 格式的图片，它采用 Go 语言开发，特点是安装简单和易于使用，支持一条命令生成图片，也可以通过交互模式生成定制的图片。

`# macOS or Linux   brew install charmbracelet/tap/freeze      # Arch Linux (btw)   pacman -S freeze      # Nix   nix-env -iA nixpkgs.charm-freeze   `

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkvHXibe5VF36piaofqXtfe19mDWWw7bPowMChlhic3vmdzXEJfWIzvPLIQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

> 地址：github.com/charmbracelet/freeze



#### CompreFace：免费、开源的人脸识别系统。

该项目提供了用于人脸识别、检测、验证、头部姿势检测、性别和年龄识别的 REST API 服务，不用懂机器学习就能轻松集成到任何系统中。它后端采用 Java 编写，人脸识别是基于 FaceNet 和 InsightFace 实现，同时支持 Docker 部署。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFklgLXIgse7X1bUGibNltiaiaeILsfG4HqCUpCD2Ylpx30dLDdjufpWNMXg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/exadel-inc/CompreFace

#### fdroidclient：免费、开源的 Android 应用商店。

该项目是 F-Droid 的 Android 客户端，专门收集各类开源安卓软件（FOSS）的应用商店。它里面大部分是免费且无广告的应用，如遇到资源加载慢的情况，可通过设置镜像源解决。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkZibGRXYunyDJoORM0r5hho5QWH12xlRBCgeuE8vR7SkMGHjtkj8yINw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/f-droid/fdroidclient



#### tailwind-landing-page-template：免费、开源的落地页模板。

该项目是基于 TailwindCSS、React 和 Next.js 构建的落地页模板，它界面美观、代码简单、设计在线，适用于快速制作公司主页、活动落地页等。

`git clone 项目   yarn install   yarn dev   # http://localhost:3000   `

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkvXzGZmE2MMYSWkczoFgbz7e8Oh0m56R53r2LZF1HCFOicR2LMmAibSrw/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

> 地址：github.com/cruip/tailwind-landing-page-template




####  python-miio：用于控制小米智能家电的 Python 库。
该项目提供了一个 Python 库和命令行工具，可以用来控制使用小米的 miIO 和 MIoT 协议的设备。借助它用户可以轻松地与小米智能设备进行通信和远程控制，包括扫地机器人、灯泡、空气净化器等，非常适合喜欢 DIY 智能家居系统的开发者。

> 地址：github.com/rytilahti/python-miio


#### undetected-chromedriver：绕过反爬检测的 Python 库。

这是一个经过优化的 Selenium WebDriver 补丁，专门用于防止浏览器自动化过程中，触发反机器人机制。它能够隐藏浏览器特征（指纹），使用起来十分方便，就像一个 Python 的第三方库一样。

`import undetected_chromedriver as uc   driver = uc.Chrome(headless=True,use_subprocess=False)   driver.get('https://nowsecure.nl')   driver.save_screenshot('nowsecure.png')   `

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFk1FIGdy5Ya4F82sGRNjmzMqysdiarqXicPOxZYqfpPGp5licTuAWMvHC1Q/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

> 地址：github.com/ultrafunkamsterdam/undetected-chromedriver




####  reminders-menubar：极简的 macOS 菜单栏提醒工具。

这是一款使用 SwiftUI 开发的小工具，能够在 macOS 菜单栏查看/提醒待办事项。它体积小、交互简单、界面清爽，支持开机启动、多语言（包括中文）、菜单栏显示计数、快捷键等功能。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkWbYLJNXibzGw3vLsTAbLHKys7s4VJM9Zucicr9oF0jDwQ0nfOyVNMy4A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/DamascenoRafael/reminders-menubar

###


#### ServiceLogos：超可爱的 Logo 集合。

这里是用来存放 Sawaratsuki 制作的各种 logo 的仓库，这些 logo 制作精美、画风可爱，包括编程语言、框架、工具和各大社交媒体的商标™️。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNN21ibUI7LydiadUd7XaCRrFkg5uv5yRia0J7MzVJUiccurARChJuSmJYKWiaqk490eO8kOewpuhAia5pHA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/SAWARATSUKI/ServiceLogos



#### how-to-learn-robotics：机器人学自学指南。

这本指南专为非科班的小伙伴而设计，旨在指导他们如何学习机器人学。它包含了必备知识、入门教材推荐、实践项目以及进阶方法等内容，帮助读者逐步成长为一名优秀的机器人工程师。

> 地址：github.com/qqfly/how-to-learn-robotics


####  免费、开源的落地页模板：tailwind-landing-page-template

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNNopDgmYXxHEOsNjAbajpFicNWJrrkoveg9zDmqS0hrrf7fNngdGjOMymnZcPPtwUAUNhGNtCnVHtg/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**主语言：TypeScript**

该项目是基于 TailwindCSS、React 和 Next.js 构建的落地页模板，它界面美观、代码简单、设计在线，适用于快速制作公司主页、活动落地页等。

> 项目详情→hellogithub.com/repository/9f205fad64b241609ce3feec456ab818


####  RunCat_for_windows：在 Windows 任务栏飞奔的“小猫”。

这是一个用 C# 写的小工具，它会在 Windows 任务栏显示一只奔跑的小猫动画，CPU 使用率越高它跑得越快。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/xBgIbW1vdNNEZCicibZu6NibpUibZkOcDy0ICLfJm011mOVMNibjTO2BKrDnXCgibjQROB5SGS5ibTiat02POkf5HUibicxA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

> 地址：github.com/Kyome22/RunCat_for_windows


#### mactop：专为苹果芯片打造的 Mac 性能监控工具。

该项目用不到 1k 行的 Go 代码，实现了一个类似 top 命令的工具。它可以实时显示 Apple M 系列芯片的性能指标，包括 CPU、GPU 使用率、内存、网络和硬盘等信息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNNEZCicibZu6NibpUibZkOcDy0IQghM8WzLANkVqeJLMA5ELVO8enFQBRo2PzXbsSq760LRepj74zzOMg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/context-labs/mactop


#### superfile：非常漂亮的终端文件管理器。

这是一个现代终端文件管理器，为命令行文件操作提供了一个直观且漂亮的界面。它默认采用 Vim 风格的快捷键操作，还支持插件和主题自定义。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNNEZCicibZu6NibpUibZkOcDy0IxjDDtDYbYermMXiaHDBicsfmicDhVhOWR50ys7k5Qzia4kWwRgRibOnfTKg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/yorukot/superfile


####  chsrc：全平台通用的换源工具。


该项目能够为常见的 Linux 发行版、编程语言和软件切换至国内镜像源，操作简单仅需一条命令。它采用 C 语言编写，具有高效和轻量级的特点，支持测速、多平台以及项目级换源等功能，适用于优化下载速度或解决源受限的场景。来自 @ccmywish 的分享

#chsrc

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOTjhAHG3PgHxdZU0es1tDHZoVqIM0vSQj3ocHOR3xczuRWRDNyIJoHibBhadLaJl1nEnzFTb2tCyA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/RubyMetric/chsrc


####  lnav：强大的终端日志文件查看工具。

这是一款用于查看和分析日志文件的轻量级工具。它无需配置、开箱即用，可自动识别日志格式并解压文件，支持同时处理多个文件和目录、实时更新、文本高亮、正则与 SQL 过滤日志等功能，特别适合在服务器和开发环境中使用。来自 @DeShuiYu 的分享

![图片](https://mmbiz.qpic.cn/mmbiz_png/xBgIbW1vdNOTjhAHG3PgHxdZU0es1tDH1xLFIZT7lCVaROvmQdHYlHbZFv0YlFCogjSPv7g3SNib0xmWHBelgJQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 地址：github.com/tstack/lnav



##### 登录页面HTML

https://mp.weixin.qq.com/s?__biz=MzkyOTY0MTc2Mw==&mid=2247484615&idx=1&sn=ea7f0a83d59cbecd8d35bcc8593df965&chksm=c379bfb1c9e47cd5f6cb9f2f1549b14c7e6ae9d5df148869070d42df10a94ff5fc731bc5ea2b&scene=132&exptype=timeline_recommend_article_extendread_extendread_interest&show_related_article=1&subscene=132&scene=132#wechat_redirect


## 在Master分之发生变化的时候，pull一下代码


要在Git仓库的master分支发生变化时自动执行`git pull`操作，可以设置一个Git hook来触发这个动作。具体步骤如下：

1. **安装Git：** 确保系统上已经安装了Git。如果没有安装，可以运行以下命令：

    `sudo yum install git`
    
2. **克隆仓库：** 如果您还没有克隆仓库，请先克隆它：
    
    `git clone https://github.com/username/repository.git /path/to/your/local/repo cd /path/to/your/local/repo`
    
3. **设置Git hook：** Git hooks 是一些脚本，在Git仓库中的特定事件发生时执行。我们可以使用`post-merge`和`post-receive` hooks来实现这个功能。
    
    1. **创建一个钩子脚本：**
        
        `vi /path/to/your/local/repo/.git/hooks/post-merge`
        
        添加以下内容：
        
```sh
#!/bin/bash  
# 切换到仓库目录 
cd /path/to/your/local/repo  # 执行 git pull 
git pull origin master
```

 保存并关闭文件。
        
**注意：** 确保替换`/path/to/your/local/repo`为您的实际仓库路径。
        
2. **为钩子脚本添加执行权限：**


```sh
chmod +x /path/to/your/local/repo/.git/hooks/post-merge
```


## Github Hooks

[GitHooks ](https://juejin.cn/post/7249281117169614904)


![](https://s3.bmp.ovh/imgs/2024/06/12/d328d835ab6947bb.png)
### Git技巧


```
https://hellogithub.com/article/9aed28d4d64b4649bb364685ef557ae4
```

