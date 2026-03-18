---
title: Arch Linux 使用记录
date: 2026-03-17 17:12:34
---
# Arch Linux 安装与配置指南

## 连接网络

### 使用 `iwctl` 连接 WiFi

```sh
# 进入 iwctl 交互模式
iwctl

## 以下是在交互模式下的命令

# 列出可用的无线网卡
device list

# 扫描 WiFi 网络（假设网卡是 wlan0）
station wlan0 scan

# 查看扫描结果
station wlan0 get-networks

# 连接到指定 WiFi（替换 "YourSSID" 为你的 WiFi 名称）
station wlan0 connect "YourSSID"

# 输入密码（如果需要）

# 检查连接状态
station wlan0 show

# 退出交互模式
exit
```

---

## 安装系统

### 使用 `archinstall` 图形化安装器

```sh
archinstall
```

**安装基础系统时，建议勾选：**
- `git`
- `sshd`
- `vim`
- 创建新用户（非 root 用户）

---

## 安装 Hyprland 配置

```sh
# 使用非 root 用户克隆配置
git clone https://gitee.com/fairyeye/hyprland_dotfile ~/.dotfiles
```

---

## 安装临时图形环境（用于测试或临时使用）

### 方法一：使用 `archinstall` 直接安装 KDE 桌面

### 方法二：手动安装 Labwc

1. **安装 Labwc 和 Kitty 终端**
    ```sh
    sudo pacman -S labwc kitty
    ```
    > **注意**：安装过程中会询问字体选择，直接回车使用默认即可。

2. **启动 Labwc**
    ```sh
    labwc
    ```
    > Labwc 启动后界面是纯黑的，右键点击桌面可以选择 `terminal` 打开终端，选择 `exit` 可退出。

3. **卸载 Labwc（临时环境结束后）**
    ```sh
    sudo pacman -Rns labwc
    ```

---

## 配置 Arch Linux CN 软件源

### 1. 编辑 pacman 配置文件
```sh
sudo vim /etc/pacman.conf
```

### 2. 在文件末尾添加以下内容
```ini
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
Server = https://mirrors.hit.edu.cn/archlinuxcn/$arch
Server = https://repo.huaweicloud.com/archlinuxcn/$arch
```

### 3. 同步数据库并安装密钥环
```sh
sudo pacman -Sy archlinuxcn-keyring
```

---

## 安装 AUR 助手

```sh
sudo pacman -S --needed base-devel yay paru
```
- `base-devel`：编译软件所必需的工具包。
- `yay` 和 `paru`：都是常用的 AUR 助手，建议任选其一或都安装（当一个安装失败时可尝试另一个）。

---

## 安装 Flclash（代理工具）

> Flclash 支持随壁纸更换颜色，推荐使用。

**安装步骤：**


1. **首先确保已配置好 Arch Linux CN 源并安装了 AUR 助手**（参考上方步骤）。

2. **先安装 Clash(不然安装flclash太慢了)**

```sh
    sudo pacman -S clash-verge-rev
```

1. **启动 Clash 的代理**（在 Clash 界面中开启），然后在终端中执行：

```sh
    yay -S flclash-bin
```

4. **启动 Flclash**

```sh
    flclash
```

5. **在 Flclash 主页开启 TUN（虚拟网卡）模式**。

6. **导入订阅链接**

```
https://sub1.smallstrawberry.com/api/v1/client/subscribe?token=f1a81448bef507e08f35c99027ce4172
```

7. **在右下角系统托盘中启动代理**。

---

## 一键安装脚本

```sh
curl -L shorin.xyz/archsetup | bash
```


# 新新方案

```
# 可以做成U盘一键启动 （没代理能行？

https://github.com/mylinuxforwork/dotfiles

https://ml4w.com/os/


```

---

## 参考新方案

- **[Shorin ArchLinux Guide - 代理](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E4%BB%A3%E7%90%86)**
- **[Shorin ArchLinux Guide - 安装桌面环境前的准备](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E5%AE%89%E8%A3%86%E6%A1%8C%E9%9D%A2%E7%8E%AF%E5%A2%83%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87)**
- **[ML4W Installation Guide](https://ml4w.com/os/getting-started/install)**