---
title: Ubuntu
date: 2020年9月17日18:59:55
tags: "系统集成"
categories: ""
description: 
---



### NETDATA

#### 1. 安装编译环境

```
sudo apt install zlib1g-dev gcc make git autoconf autogen automake pkg-config uuid-dev
```

#### 2. 克隆项目

```
git clone https://github.com/firehol/netdata.git --depth=1
```

#### 3. 安装netdata

```
./netdata-installer.sh
```

然后访问 `IP:19999` 

![](https://i.loli.net/2020/09/23/Zp2AJqzlKPSaW7E.png)



### NGINX

#### 1. 安装Nginx

```
apt-get install nginx
```

浏览器地址栏输入 `IP`看到如下页面表示已经安装好了Nginx，如果有域名，输入域名也是同样的效果（前提是已经给域名添加了解析）

![](https://i.loli.net/2020/09/23/45jPeQEu2TCoOyb.png)

#### 2.Nginx 转发端口

我已经在服务器上安装了`netdata`服务，端口为`19999`,但是通过`Nginx`访问服务器时默认是`80`端口，所以需要做一些配置，在我们输入域名的时候访问不同的端口。

```
# nginx.conf里包含	include /etc/nginx/conf.d/*.conf; 所以可以在/etc/nginx/conf.d 文件夹下新增一个配置文件

server {
    listen 80;
    server_name xxxx.cn;

    location / {
      client_max_body_size   3000m;
      proxy_next_upstream http_502 http_504 error timeout invalid_header;

      proxy_set_header   Host $host;
      proxy_set_header   X-Real-IP $remote_addr;
      proxy_set_header   X-Real-PORT $remote_port;
      proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;

      proxy_pass http://127.0.0.1:19999;
      proxy_redirect default;
      proxy_connect_timeout 3000;

    }
}
```

这样 当我们在浏览器地址栏输入 域名时 就会自动跳转到`netdata`的主页



























































