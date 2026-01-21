---
title: Mac使用记录
tags:
  - 工具
categories: 杂项
hidden: true
---

# 环境配置

## 安装 Homebrew、Java、Maven、Node.js、pnpm


```bash
# 1. 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 💡 如果是 Apple Silicon Mac（M1/M2/M3），Homebrew 会自动安装到 /opt/homebrew. 如果是 Intel Mac，则安装到 /usr/local

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

- 安装之前 先激活IDEA

```sh
主页地址 http://jb.ide.to
```

### 使用 curl（推荐）

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 美化、插件、配置

#### 安装 Powerline 字体

```bash
# 克隆仓库 
git clone --depth=1 https://github.com/powerline/fonts.git ~/powerline-fonts 

# 安装所有字体 
cd ～/powerline-fonts 
./install.sh 

# 清理 
cd .. && rm -rf ~/powerline-fonts
```

设置终端使用 Powerline 字体：

1. 打开 **Terminal（终端）**
2. `Terminal → Settings → Profiles → Text`
3. 字体选择：**`Meslo LG M Regular for Powerline`**（或其他带 "for Powerline" 的字体）
4. 关闭设置，重启终端

#### 使用 Powerlevel10k

```bash
# 安装
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# 修改 ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# 重载
source ~/.zshrc

```


#### 插件

##### 安装

```bash
# zsh-autosuggestions  根据历史命令 灰色自动建议
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-～/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting  实时语法高亮
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-～/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```


```bash
# 修改配置
vim ~/.zshrc

# 找到 plugin 修改成：
plugins=(
  git
  brew
  npm
  pnpm
  zsh-autosuggestions
  zsh-syntax-highlighting   # 必须放最后！
)

# 装完插件后 再执行下面的
source ~/.zshrc
```



## 使用 SDKMAN!（强烈推荐，尤其开发者）

> **优点**：一键切换 Gradle 版本、自动配置 PATH、支持 Groovy/Kotlin/Java 等工具链

### 1. 安装 SDKMAN!

```bash
# 安装 SDKMAN!
curl -s "https://get.sdkman.io" | bash

# 重载 shell 配置
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

### 2. 安装 Gradle

```bash
# 查看可用版本
sdk list gradle

# 安装最新稳定版（推荐）
sdk install gradle

# 或安装指定版本（如 LTS 版）
sdk install gradle 8.5
```

### 3. 验证


```bash
gradle -v
```

✅ 输出应包含 Gradle 版本、JVM 信息等。

> 💡 后续升级：`sdk upgrade gradle`  
> 切换版本：`sdk use gradle 8.5`

## 其它Home Brew应用

```bash
brew install gemini-cli

npx zcf
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


## Claude 备份配置

```json

[
    {
        "ANTHROPIC_BASE_URL": "https://api.xiaomimimo.com/anthropic",
        "ANTHROPIC_AUTH_TOKEN": "sk-ca1v8uqezj1bxcp61jzfcubrbbdjz8kk8klt3ychxca650eb",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "mimo-v2-flash",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "mimo-v2-flash",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "mimo-v2-flash"
    },
    {
        "ANTHROPIC_AUTH_TOKEN": "ak_2Xp3dn4tW7NU66s1c06929ww7u090",
        "ANTHROPIC_BASE_URL": "https://api.longcat.chat/anthropic",
        "ANTHROPIC_MODEL": "LongCat-Flash-Chat",
        "ANTHROPIC_SMALL_FAST_MODEL": "LongCat-Flash-Chat",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-Flash-Chat",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-Flash-Chat",
        "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "6000",
        "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
    }
]
```



## Zsh 激活 Idea





![[jb]]

![[ja-netfilter.jar]]