---
title: Spring Boot Admin
categories: java
tags:
  - 日常记录
---
### 服务端配置

新建一个SpringBoot项目

`pom.xml`

```xml
<!--如果不需要鉴权 可以不加Security依赖-->
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-web</artifactId>  
</dependency>  
<dependency>  
    <groupId>de.codecentric</groupId>  
    <artifactId>spring-boot-admin-starter-server</artifactId>  
</dependency>
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-security</artifactId>  
</dependency>
```

`application.properties`

```properties
# 端口
server.port=20000  
server.servlet.context-path=/admin
```

启动类加上 `@EnableAdminServer`注解

如果不需要鉴权  到这里就结束了，运行项目，然后访问`localhost:20000/admin`就可以看到SBA的UI

![](https://s3.bmp.ovh/imgs/2024/03/13/b436a3855a95e5cb.png)


#### 非必须项

 引入Security，开启认证登录，下面是一个简单的样例


```java
@Configuration(proxyBeanMethods = false)  
public class SecuritySecureConfig extends WebSecurityConfigurerAdapter {  
  
    private final AdminServerProperties adminServer;  
  
    public SecuritySecureConfig(AdminServerProperties adminServer) {  
        this.adminServer = adminServer;  
    }  
  
    @Override  
    protected void configure(HttpSecurity http) throws Exception {  
    SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();  
    successHandler.setTargetUrlParameter("redirectTo");  
    successHandler.setDefaultTargetUrl(this.adminServer.path("/"));  
  
    http.authorizeRequests()  
      .antMatchers(this.adminServer.path("/assets/**")).permitAll()   
      .antMatchers(this.adminServer.path("/login")).permitAll()  
      .anyRequest().authenticated()   
      .and()  
    .formLogin().loginPage(this.adminServer.path("/login")).successHandler(successHandler).and()   
    .logout().logoutUrl(this.adminServer.path("/logout")).and()  
    .httpBasic().and()   
    .csrf()  
      .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())  
      .ignoringRequestMatchers(  
        new AntPathRequestMatcher(this.adminServer.path("/instances"), HttpMethod.POST.toString()),  
        new AntPathRequestMatcher(this.adminServer.path("/instances/*"), HttpMethod.DELETE.toString()),    
        new AntPathRequestMatcher(this.adminServer.path("/actuator/**"))    
      )  
    .and()  
    .rememberMe().key(UUID.randomUUID().toString()).tokenValiditySeconds(1209600);  
    }  
  
    @Override  
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {  
        auth.inMemoryAuthentication().withUser("user").password("{noop}passwd").roles("USER");  
    }  
  
}
```

运行项目，然后访问`localhost:20000/admin`需要登录