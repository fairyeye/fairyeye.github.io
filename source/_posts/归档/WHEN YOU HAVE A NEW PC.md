---
title: WHEN YOU HAVE A NEW PC
date: 2020年9月17日18:59:55
categories: "杂谈"
---
###  <center> WHEN YOU HAVE A NEW PC</center>

#### Java环境配置

##### 1. 安装

​	提前新建两个文件夹，jdk，jre，默认路径也可以

​	安装`jdk-8u111-windows-x64.exe`

​	设置jdk、jre的路径

##### 2. 配置环境变量

​	右键此电脑 -> 属性 -> 高级系统设置 -> 环境变量 ->  **系统变量(S)**

​	只有系统变量才是全局的。

```
新建	CLASSPATH	.;
新建	JAVA_HOME	jdk路径
修改	path		添加 %JAVA_HOME%\bin;

测试	java -version
	 javac -version	
```

#### Maven环境配置

1. 解压`apache-maven-3.3.9.rar` 到指定的目录。
2. 修改配置文件（压缩包已修改过）。

#### GIT 工具

##### 1. 配置用户信息

``` sh
# 用户级
git config --global user.name "fairy"
git config --global user.email "fairy@gmail.com"
# 仓库级 local可以省略
git config --local user.name "张华朋26190"
git config --local user.email "huapeng.zhang@going-link.com"
# 使配置不生效
git config --global --unset user.name
```

##### 2. 生成SSH密钥

```
ssh-keygen -t rsa -C 'email' //Email可选，会在key中生成你的邮箱信息  一直回车就行
```

​	生成的key文件  `C:\Users\你的用户名\.ssh\id_rsa.pub`

​	用文本编辑器打开，复制到GIT上。

#####  3. 上传项目到GIT

```
cd 项目文件加夹
git init
git remote add origin git@github.com:fairyeye/StudyJava.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

#### MySQL 安装

安装`https://www.runoob.com/mysql/mysql-install.html`

修改初始密码

MySQL版本5.7.6版本以前用户可以使用如下命令：

```
mysql> SET PASSWORD = PASSWORD('your pwd'); 
```
MySQL版本5.7.6版本开始的用户可以使用如下命令：
```
mysql> ALTER USER USER() IDENTIFIED BY 'your pwd';
```


登录报错 `https://www.cnblogs.com/lifan1998/p/9177731.html`

#### 去图标

​	管理员运行  `去图标.bat` 文件。

#### 谷歌访问助手

​	谷歌浏览器 -> 更多工具 -> 扩展程序 -> 开发者模式(打开) 。

​	拖动 `谷歌访问助手.crx` 到谷歌浏览器中。

#### 软件安装清单

- IDEA：

- Chrome：

- uTools：

- Typora：

- Another Redis Desktop Manager：很好看的Redis客户端

- XShell：好看 好用

-  tabby-terminal：https://github.com/Eugeny/tabby/releases/tag/v1.0.164

- Shadowsocks：小飞机

- Windows Termial:Windows终端
- -   nvm: Windows切换node版本
-   n：Mac切换node版本
	-  https://github.com/tj/n
	-  npm install -g n
-   pyenv：切换python版本
    -   Invoke-WebRequest -UseBasicParsing -Uri "[https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1](https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1)" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
- Redis图形化页面： [Tiny RDM](https://github.com/tiny-craft/tiny-rdm/releases)


以下是如何在Linux或macOS上创建和使用虚拟环境的步骤：

1. 打开终端。
   
2. 使用`python3 -m venv path/to/venv`命令创建一个新的虚拟环境，其中`path/to/venv`是你想要创建虚拟环境的目录。例如，你可以在家目录下创建一个名为`myenv`的虚拟环境，使用命令`python3 -m venv ~/myenv`。
   
3. 激活虚拟环境。在Linux或macOS上，你可以使用以下命令激活虚拟环境：
   
    复制
    
    ```
    source ~/myenv/bin/activate
    ```
    
    激活后，你的命令行提示符会改变，通常前面会加上虚拟环境的名字，比如`(myenv)`。
    
4. 在虚拟环境中，你可以使用`pip`安装、升级或删除包，而不会影响到系统级别的Python环境。例如，你可以使用以下命令安装一个包：
   
    复制
    
    ```
    pip install package-name
    ```
    
5. 当你完成工作后，你可以通过运行`deactivate`命令来停用虚拟环境。
   

请注意，如果你的系统上没有安装`python3`，或者你的Python版本不同，你可能需要根据你的实际情况调整上述命令。如果你使用的是Windows系统，步骤会有所不同，通常你会使用`path\to\venv\Scripts\activate`来激活虚拟环境


## Mac

### 终端：

##### oh my zsh
```
https://zhuanlan.zhihu.com/p/550022490
https://blog.csdn.net/weixin_42326144/article/details/121957795
```



**TomCat@9**

```bash
# tomcat9 
/usr/local/Cellar/tomcat@9/9.0.102/libexec
```



## IDEA

```
在 IntelliJ IDEA 中，要确保项目中的中文字符以 UTF-8 编码保存，可以按照以下步骤操作：

1. **打开项目设置**：在 IntelliJ IDEA 中，点击菜单栏中的 "File" -> "Settings"（或者直接使用快捷键 `Ctrl + Alt + S`）来打开项目设置。
    
2. **设置文件编码**：在设置窗口左侧的搜索框中输入 "File Encoding"，然后选择 "File Encodings" 选项。
    
3. **更改默认编码**：在右侧的界面中，找到 "Global Encoding" 下的 "IDE Encoding"，将其设置为 "UTF-8"。同样，也可以设置 "Project Encoding" 和 "Default encoding for properties files" 为 "UTF-8"。
    
4. **应用更改并重新加载项目**：点击 "OK" 按钮以应用更改，并可能需要重新加载项目以确保更改生效。
    
5. **保存文件为 UTF-8 编码**：对于现有的文件，可以通过以下方式将其保存为 UTF-8 编码：
    
    - 打开文件。
    - 点击菜单栏中的 "File" -> "Save with Encoding..."。
    - 在弹出的对话框中，选择 "UTF-8" 编码，然后点击 "OK" 保存文件。

通过以上步骤，您可以确保在 IntelliJ IDEA 中创建和编辑的所有文件都以 UTF-8 编码保存，包括中文字符。
```