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

##### 1. 全局配置用户信息

```
git config --global user.name "fairy"
git config --global user.email "fairy@gmail.com"
```

##### 2. 生成key

```
ssh-keygen -t rsa -C 'email' // Email可选，会在key中生成你的邮箱信息  一直回车就行
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
-   pyenv：切换python版本
    -   Invoke-WebRequest -UseBasicParsing -Uri "[https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1](https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1)" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"


  

## 电脑使用

###  软件
