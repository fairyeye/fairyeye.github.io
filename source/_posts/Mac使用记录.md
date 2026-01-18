---
title: Mac使用记录
tags:
  - 工具
categories: 杂项
---

# 环境配置

## 安装 Homebrew、Java、Maven、Node.js、pnpm


```bash

# 1. 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 配置 Homebrew（Apple Silicon）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 3. 安装 Java
brew install --cask temurin17
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc

# 4. 安装 Maven
brew install maven

# 5. 安装 Node.js
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc

# 6. 安装 pnpm
npm install -g pnpm

# 7. 重载配置
source ~/.zshrc

```

## 安装 Oh My Zsh

### 使用 curl（推荐）

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```





# 软件设置

## iTerm2配置

![](https://s3.bmp.ovh/imgs/2026/01/18/e93b31e7c60f6725.png)

## idea 

### 护眼绿

#### 1. 进入颜色方案设置

`Editor → Color Scheme → General`

#### 2.修改背景色

- 在右侧列表中找到 **`Text` → `Default text`**
- 勾选 **`Background`**

| 颜色模式 | 值                      |
| ---- | ---------------------- |
| RGB  | R: 199, G: 237, B: 204 |
| HEX  | `#C7EDCC`              |

#### 3. 如果需要全局护眼绿

截图豆沙绿的图片，在`Appearance & Behavior → Appearance` 设置背景图片，不透明100即可。