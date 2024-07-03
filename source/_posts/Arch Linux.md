---
title: Arch Linux安装
categories: 杂项
date: 2024-07-03 21:04:21
---
[很详细的链接](https://blog.csdn.net/u010383467/article/details/135876682)

### 制作U盘

使用 [Rufus](https://rufus.ie/)

[下载链接v4.5 ](https://github.com/pbatard/rufus/releases/download/v4.5/rufus-4.5.exe)

### 使用 archInstall 安装

```sh
archinstall
# 设置一下即可
```
### 启用并启动显示管理器

假设你选择了 GDM 作为显示管理器：

```sh
sudo systemctl enable gdm sudo systemctl start gdm
sudo systemctl enable sddm sudo systemctl start sddm
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