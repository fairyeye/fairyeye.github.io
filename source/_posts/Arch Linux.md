---
title: Arch Linux安装
categories: 杂项
date: 2024-07-03 21:04:21
---
[很详细的链接](https://blog.csdn.net/u010383467/article/details/135876682)

## 制作U盘

使用 [Rufus](https://rufus.ie/)

[下载链接v4.5 ](https://github.com/pbatard/rufus/releases/download/v4.5/rufus-4.5.exe)

## 使用 archInstall 安装

```sh
archinstall
# 设置一下即可

# 必选：设置硬盘、root密码   网络！！  选第二个
# 可选：时区
```


![](https://s3.bmp.ovh/imgs/2024/07/04/977f126f1c2f2a59.png)


## 启用SSH

如果你安装完系统后无法通过 SSH 远程登录，可能是由于 SSH 服务未安装、未启动或防火墙配置问题。以下是一些可能的解决方法：

### 1. 检查并安装 OpenSSH

确保 OpenSSH 已安装：

安装 `sshd`

`sudo pacman -S openssh`

### 2. 启动并启用 SSH 服务

启动 SSH 服务：


`sudo systemctl start sshd`

启用 SSH 服务，使其在系统启动时自动运行：


`sudo systemctl enable sshd`

### 3. 检查防火墙设置

如果你启用了防火墙，需要确保允许 SSH 端口（默认端口 22）的连接。例如，如果你使用 `ufw` 作为防火墙，可以使用以下命令：

`sudo ufw allow ssh`

如果使用 `iptables`，可以使用以下命令：

`sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`

### 4. 检查 SSH 配置文件

检查 SSH 配置文件 `/etc/ssh/sshd_config` 是否正确配置。例如，确保以下行没有被注释掉（去掉前面的 `#`）：


`Port 22 PermitRootLogin yes  # 如果你需要以 root 登录 PasswordAuthentication yes  # 如果你使用密码登录`

编辑完配置文件后，重新启动 SSH 服务以应用更改：

`sudo systemctl restart sshd`

### 5. 检查网络连接

确保你的计算机在网络中是可访问的，可以通过以下命令查看 IP 地址：

`ip addr show`

确保你使用的是正确的 IP 地址和端口连接。

### 6. 检查 SSH 客户端输出

如果仍然无法连接，使用 SSH 客户端连接时查看详细输出，以获取更多调试信息。例如，在 Linux 或 macOS 上，可以使用以下命令：

`ssh -v user@hostname`

这个命令会显示详细的连接过程，有助于找出问题所在。

### 7. 确保 SSH 服务在运行

使用以下命令检查 SSH 服务状态：


`sudo systemctl status sshd`

确保显示的状态为 `active (running)`。如果不是，请检查日志文件以获取更多信息：

`sudo journalctl -u sshd`

### 8. 确保主机名解析正常

确保你连接的主机名可以正确解析。如果你使用主机名连接，尝试改用 IP 地址连接，以排除 DNS 解析问题。

### 9. 确保网络没有阻塞 SSH 端口

某些网络环境（如企业网络或公共 WiFi）可能会阻止 SSH 端口的流量。尝试在不同的网络环境中进行连接测试。

### 10. 检查用户权限

确保你使用的用户在目标机器上存在，并且具有适当的权限。你可以使用以下命令查看当前用户列表：

`cat /etc/passwd`

确保用户存在并且可以登录。




## 启用并启动显示管理器

假设你选择了 GDM 作为显示管理器：

```sh
sudo systemctl enable gdm
sudo systemctl start gdm
```

如果选择了 SDDM：

```sh
sudo systemctl enable sddm
sudo systemctl start sddm
```

安装缺失的软件包:

```
sudo pacman -S gnome  # 安装 GNOME
sudo pacman -S plasma  # 安装 KDE Plasma
sudo pacman -S gdm  # 安装 GDM
sudo pacman -S sddm  # 安装 SDDM
```


到这里 系统就算安装完成了



## 安装Hyprland   报错中 

需要创建一个非root用户

给sudo权限


需要安装编辑器  vim或者nano
