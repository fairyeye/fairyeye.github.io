---
title: Springboot
date: 2020年9月17日18:59:55
tags: "基础"
categories: ""
description: 
---



# Springboot返回html 



  注：Springboot的版本2.1.3.RELEASE

 *List-1* application.properties文件

```javascript
server.port=8080
#url中，项目的前缀
server.servlet.context-path=/project


spring.mvc.view.prefix=/
spring.mvc.view.suffix=.html
```

  整体结构如下图1所示，html要放在static下，不是templates下

![img](https://ask.qcloudimg.com/http-save/yehe-5089774/1k8adq8jn7.jpeg?imageView2/2/w/1620)


　　　　　　　　　　　　　　　　　　　　　　　　　图１

 *List-2* HelloController的内容如下

```javascript
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class HelloController {

    @RequestMapping(value = "/hello")
    public String index() {
        log.info("收到请求");
        return "html/hello";
    }
}
```

 *List-3* 启动springboot，之后在浏览器中输入

```javascript
#返回index.html的内容
http://localhost:8080/project/

#返回hello.html的内容
http://localhost:8080/project/hello
```

  网上很多关于模板的（Thymeleaf 、FreeMarker 等），但是我不需要，我只需要纯的html。

  index.html是springboot的默认welcome page。

## Reference

1. https://www.jianshu.com/p/eb4c0fc2dfc4
2. https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-spring-mvc-static-content
3. https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-spring-mvc-welcome-page

​     (adsbygoogle = window.adsbygoogle || []).push({});  

