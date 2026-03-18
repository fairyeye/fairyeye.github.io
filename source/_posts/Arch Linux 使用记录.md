---
title: Arch Linux 使用记录
date: 2026-03-17 17:12:34
---



```sh

archinstall

# 安装git sshd vim
# 新建用户 






# 使用 非root用户 
git clone https://gitee.com/fairyeye/hyprland_dotfile ~/.dotfiles
```


# 新方案


## 安装临时图形环境 (or  archinstall 安装kde桌面)

[](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E4%BB%A3%E7%90%86#%E5%AE%89%E8%A3%85%E4%B8%B4%E6%97%B6%E5%9B%BE%E5%BD%A2%E7%8E%AF%E5%A2%83)

1. 安装labwc
    
    ```
    sudo pacman -S labwc kitty
    ```
    
    labwc是一个堆叠式窗口管理器，kitty是我使用的终端。会问你装哪个字体，回车默认就行
    
2. 启动labwc
    
    ```
    labwc
    ```
    
    labwc打开之后是纯黑的，正常点击桌面选择`terminal`就能打开终端，选`exit`可以退出
    

- 卸载labwc
    
    要做的事情结束之后想删除这个临时图像环境可以使用这条命令：
    
    ```
    sudo pacman -Rns labwc
    ```



## archlinuxcn源


1. 编辑pacman配置文件添加archlinuxcn源
    
    ```
    sudo vim /etc/pacman.conf
    ```
    
2. 文件底部写入
    
    ```
    [archlinuxcn]
    Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch 
    Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch 
    Server = https://mirrors.hit.edu.cn/archlinuxcn/$arch 
    Server = https://repo.huaweicloud.com/archlinuxcn/$arch 
    ```
    
3. 同步数据库并安装archlinuxcn密钥
    
    ```
    sudo pacman -Sy archlinuxcn-keyring 
    ```
    

## AUR助手


AUR是arch最强大的软件仓库。AUR助手可以方便从AUR安装软件。archlinuxcn上有编译好的版本，可以直接pacman从archlinuxcn安装。

```
sudo pacman -S --needed base-devel yay paru
```

`base-devel`是编译软件时必须的。`yay`和`paru`都是常用的助手，任选其一，也可以都装，用yay安装失败的包可以换另外一个试试。

## flclash


flclash支持随壁纸更换颜色，强推！

如果因为连不上aur装不上flclash的话可以从archlinuxcn装上clash-verge后开代理装flclash

0. [添加archlinuxcn并安装aur助手](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E5%AE%89%E8%A3%85%E6%A1%8C%E9%9D%A2%E7%8E%AF%E5%A2%83%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87#archlinuxcn%E6%BA%90)
    
1. 安装
    
    ```
    yay -S flclash-bin
    ```
    
2. 启动
    
    ```
    flclash
    ```
    
3. 主页开启TUN（虚拟网卡）
    
4. 导入链接

```
https://sub1.smallstrawberry.com/api/v1/client/subscribe?token=f1a81448bef507e08f35c99027ce4172
```
    
5. 右下角启动代理


## 一键安装

```sh
curl -L shorin.xyz/archsetup | bash 
```