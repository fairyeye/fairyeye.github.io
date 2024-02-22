---
title: security
---

## 1. 

引入依赖：
```xml
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-security</artifactId>  
</dependency>  
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-web</artifactId>  
</dependency>
```

一些必要的配置：


新建一个配置类 `WebSecurityConfig`继承`WebSecurityConfigurerAdapter`重写`configure`方法。（**重要**）
- 是SpringSecurity的核心

```java  
@Configuration  
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {  
    @Override  
    protected void configure(HttpSecurity http) throws Exception {  
        // 开启登录  
        http.formLogin();  
}  
}
```

新建一个controller用来测试登录

```java
/**  
 * @author zhanghuapeng  
 * @date 2024/1/28  
 */@RestController  
public class UserController {  
  
    /**  
     * 获取当前登录用户信息  
     */  
    @GetMapping("/user-info")  
    public Authentication getUserInfo(Authentication authentication) {  
        return authentication;  
    }  
}
```
启动项目：终端会有这么一段日志
```
Using generated security password: f429b724-db54-4a56-ae82-7ebb63f22d69
```
表示：没有设置用户信息，给出了一个默认用户及密码，默认用户`user`

登录之后，默认会跳转到Index页面，但是目前没有这个页面，所以会报错。
暂不处理。

访问：`http://localhost:8080/user-info`
返回结果：
```json
{"credentials":null,"details":null,"authenticated":false,"authorities":null,"principal":null,"name":"not login!"}
```

可以通过`http://localhost:8080/logount`退出登录

之后在访问user-info接口，发现不在包含用户信息


## 2.

实际使用中 没有登录的用户是不能访问接口的

修改`WebSecurityConfig`
``` 
@Configuration  
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {  
    @Override  
    protected void configure(HttpSecurity http) throws Exception {  
        // 开启登录  
        http.formLogin();  
        // 设置访问权限  任何请求均需要认证（登录成功）才能访问  
http.authorizeRequests().anyRequest().authenticated();    }  
}
```

重启项目
此时，访问：`http://localhost:8080/user-info` 
发现会直接跳转到登录页面


## 增加一些细节

### 依赖
```xml
<dependencies>  
    <!-- Web -->  
    <dependency>  
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-starter-web</artifactId>  
        <exclusions>            <exclusion>                <groupId>org.springframework.boot</groupId>  
                <artifactId>spring-boot-starter-tomcat</artifactId>  
            </exclusion>        </exclusions>    </dependency>  
    <!-- Undertow -->  
    <dependency>  
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-starter-undertow</artifactId>  
    </dependency>  
    <!-- Security -->  
    <dependency>  
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-starter-security</artifactId>  
    </dependency>  
    <!-- Test -->  
    <dependency>  
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-starter-test</artifactId>  
        <scope>test</scope>  
    </dependency>  
    <!--lombok-->  
    <dependency>  
        <groupId>org.projectlombok</groupId>  
        <artifactId>lombok</artifactId>  
        <scope>provided</scope>  
    </dependency>  
    <!--mybatis-->  
    <dependency>  
        <groupId>mysql</groupId>  
        <artifactId>mysql-connector-java</artifactId>  
        <scope>runtime</scope>  
    </dependency>    <dependency>        <groupId>org.mybatis.spring.boot</groupId>  
        <artifactId>mybatis-spring-boot-starter</artifactId>  
        <version>2.2.2</version>  
    </dependency>  
    <!-- 添加jwt的依赖 -->  
    <dependency>  
        <groupId>com.auth0</groupId>  
        <artifactId>java-jwt</artifactId>  
        <version>3.11.0</version>  
    </dependency>  
    <!--Redis-->  
    <dependency>  
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-starter-data-redis</artifactId>  
    </dependency></dependencies>
```
### 配置
```yml
server:  
  port: 8080  
  
spring:  
  output:  
    ansi:  
      enabled: always   # 强制启用 ansi 输出  
  datasource:  
    driver-class-name: com.mysql.cj.jdbc.Driver  
    url: jdbc:mysql://127.0.0.1:3306/security_study?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai  
    username: root  
    password: 12345678  
  redis:  
      host: 127.0.0.1  
      port: 6379  
      database: 1  
jwt:  
    secretKey: a3e4cd2d191a017bf49dbdf49a4c62b1fb292c5b112d6a51bdc4e2ea5052e816  
    expiration: 3600  
  
logging:  
  pattern:  
    # 控制台日志格式  
    console: "%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(%5p) %clr(${PID:- }){magenta} %clr(%-40.40logger{39}){cyan} : %msg%n"  
  
mybatis:  
  type-aliases-package: com.li.entity  
  configuration:  
    map-underscore-to-camel-case: true  
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl  
  mapper-locations: classpath:mapper/*.xml
```

在`com.li`新建`utils`包，新建`JwtUtils`
```java 
@Component  
@Slf4j  
public class JwtUtils {  
    //算法密钥  
    @Value("${jwt.secretKey}")  
    private String jwtSecretKey;  
    // 过期时间  
    @Value("${jwt.expiration}")  
    private long expiration;  
  
    /**  
     * 创建jwt  
     * @param userInfo 用户信息  
     * @param authList 用户权限列表  
     * @return 返回jwt（JSON WEB TOKEN）  
     */  
    public String createToken(String userInfo, List<String> authList) {  
        //创建时间  
        Date currentTime = new Date();  
        //过期时间，5分钟后过期  
        Date expireTime = new Date(currentTime.getTime() + expiration);  
        //jwt 的header信息  
        Map<String, Object> headerClaims = new HashMap<>();  
        headerClaims.put("type", "JWT");  
        headerClaims.put("alg", "HS256");  
        //创建jwt  
        return JWT.create()  
                .withHeader(headerClaims) // 头部  
                .withIssuedAt(currentTime) //已注册声明：签发日期，发行日期  
                .withExpiresAt(expireTime) //已注册声明 过期时间  
                .withIssuer("thomas")  //已注册声明，签发人  
                .withClaim("userInfo", userInfo) //私有声明，可以自己定义  
                .withClaim("authList", authList) //私有声明，可以自定义  
                .sign(Algorithm.HMAC256(jwtSecretKey)); // 签名，使用HS256算法签名，并使用密钥  
//        HS256是一种对称算法，这意味着只有一个密钥，在双方之间共享。 使用相同的密钥生成签名并对其进行验证。 应特别注意钥匙是否保密。  
    }  
  
    /**  
     * 验证jwt的签名，简称验签  
     *  
     * @param token 需要验签的jwt  
     * @return 验签结果  
     */  
    public boolean verifyToken(String token) {  
        //获取验签类对象  
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(jwtSecretKey)).build();  
        try {  
            //验签，如果不报错，则说明jwt是合法的，而且也没有过期  
            DecodedJWT decodedJWT = jwtVerifier.verify(token);  
            return true;  
        } catch (JWTVerificationException e) {  
            //如果报错说明jwt 为非法的，或者已过期（已过期也属于非法的）  
            log.error("验签失败：{}", token);  
        }  
        return false;  
    }  
  
    /**  
     * 获取用户id  
     *     * @param token jwt  
     * @return 用户id  
     */    public String getUserInfo(String token) {  
        //创建jwt验签对象  
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(jwtSecretKey)).build();  
        try {  
            //验签  
            DecodedJWT decodedJWT = jwtVerifier.verify(token);  
            //获取payload中userInfo的值，并返回  
            return decodedJWT.getClaim("userInfo").asString();  
        } catch (JWTVerificationException e) {  
            log.error("getUserInfo error", e);  
        }  
        return null;  
    }  
  
    /**  
     * 获取用户权限  
     *  
     * @param token  
     * @return  
     */  
    public List<String> getUserAuth(String token) {  
        //创建jwt验签对象  
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(jwtSecretKey)).build();  
        try {  
            //验签  
            DecodedJWT decodedJWT = jwtVerifier.verify(token);  
            //获取payload中的自定义数据authList（权限列表），并返回  
            return decodedJWT.getClaim("authList").asList(String.class);  
        } catch (JWTVerificationException e) {  
            log.error("getUserAuth error", e);  
        }  
        return null;  
    }  
  
}
```