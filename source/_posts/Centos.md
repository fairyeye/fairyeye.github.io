---
title: Centos
description: 虚拟机
---


### 1.frpc内网穿透



### 2. 青龙
### 3.xdd-plus

https://www.qqmate.cn/652.html
1.进入xdd目录找到 device.json 文件
2.双击打开，修改： “protocol”:0,改为"protocol":2,



## FRPC

```
1. 在`frpc.exe`所在的文件夹中，右键点击空白处，选择“新建” -> “快捷方式”。
2. 在创建快捷方式向导中，浏览并选择`frpc.exe`文件，然后点击“下一步”。
3. 给快捷方式命名，然后点击“完成”。
4. 找到刚刚创建的快捷方式，右键点击它，选择“属性”。
5. 在“快捷方式”标签页下，找到“目标”字段。默认情况下，它应该只包含`"C:\Path\To\frpc.exe"`（假设`frpc.exe`在`C:\Path\To`目录下）。
6. 在“目标”字段的末尾，添加一个空格，然后输入`-c frpc.toml`，确保整个命令看起来像这样：`"C:\Path\To\frpc.exe" -c frpc.toml`。
7. 点击“应用”和“确定”保存更改。
8. 将这个修改过的快捷方式拖放到“启动”文件夹中。这样，每次您登录Windows时，`frpc.exe`都会以`frpc.toml`作为配置文件运行。

请注意，这种方法不会在后台静默运行`frpc.exe`，它会在用户登录时打开一个命令行窗口。如果您想要`frpc.exe`在后台运行而不显示命令行窗口，您应该考虑使用任务计划程序或将其安装为服务。
```


```
1. **使用任务计划程序**:
    
    - 打开“任务计划程序”（可以在开始菜单中搜索“任务计划程序”来找到它）。
    - 创建一个新的基本任务，设置触发器按照您的需要启动任务（例如，计算机启动时）。
    - 在操作步骤中，选择“启动程序”，然后浏览并选择`frpc.exe`，并在“添加参数（可选）”中输入`-c frpc.toml`。
2. **使用Windows服务**:
    
    - 使用第三方工具如[nssm](https://nssm.cc/)（Non-Sucking Service Manager）将`frpc.exe`安装为一个服务。
    - 下载并解压`nssm.exe`。
    - 打开命令提示符或PowerShell，导航到`nssm.exe`所在的文件夹。
    - 运行命令`nssm install <ServiceName>`来创建新的服务，然后`nssm set <ServiceName> AppPath <PathTofrpc.exe>`设置应用路径，接着`nssm set <ServiceName> AppParameters -c frpc.toml`设置参数。
    - 最后，启动服务使用`nssm start <ServiceName>`。
3. **使用批处理文件**:
    
    - 创建一个批处理文件（`.bat`），在其中写入`frpc.exe -c frpc.toml`。
    - 将批处理文件放置在`frpc.exe`相同的文件夹中。
    - 您可以双击运行此批处理文件，或者将其添加到启动文件夹以在用户登录时自动运行。
```



## 端口

#####  3001   


`账号：li  gz123456`






##


开机启动frpc全部服务


```sh
[Unit]
Description=Frp Multiple Client Services
After=network.target

[Service]
Type=simple
ExecStart=/root/frpc/frpc/start_all_frpc.sh
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

start_all_frpc.sh

```sh
#!/bin/bash

/root/frpc/frpc -c /root/frpc/frpc/frpc.toml &
/root/frpc/frpc -c /root/frpc/frpc/frpc-29252.toml &
/root/frpc/frpc -c /root/frpc/frpc/frpc-3001.toml &

wait
```





## Nginx

#### 安装

```sh
sudo yum install nginx

# 如果报错：没有可用软件包 nginx


sudo vi /etc/yum.repos.d/nginx.repo


[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

```

#### 使用 

```
curl localhost可以
curl ip 不可以

修改配置文件

/etc/nginx/config.d/default.conf
```


## GitHub Page

#### NGINX配置

```conf
    listen       80;
    server_name  10.213.42.79;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/fairyeye.github.io;
        index  index.html index.htm;
    }
```


分之：`master`
位置：`/usr/share/nginx/fairyeye.github.io`



- [/] 未实现部分

- [ ] 自动拉代码
- [ ] 本地每天部署一遍
- [ ] 更新图片地址


## Windows开机启动虚拟机


在虚拟机安装目录新建`start_vm.bat`，

ps：如果vmx文件包含中文，保存编码选择GB开头的格式

```bat
@echo off

.\vmrun.exe start  "D:\Centos\CentOS 7 64位.vmx"

exit

```