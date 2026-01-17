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

1. 在`com.li`新建`utils`包，新建`JwtUtils`
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

2. 在`com.li`新建`filter`包，新建`SaySomethingJWTFilter`
```java
/**  
 * @author zhanghuapeng  
 * @date 2024/2/22  
 * @desc 一次性请求过滤器  
 */  
@Component  
public class SaySomethingJWTFilter extends OncePerRequestFilter {  
    @Resource  
    private ObjectMapper objectMapper;  
    @Resource  
    private StringRedisTemplate stringRedisTemplate;  
    @Resource  
    private JwtUtils jwtUtils;  
  
    @Override  
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {  
        //获取请求uri  
        String requestURI = request.getRequestURI();  
        // 如果是登录页面，放行  
        if (requestURI.equals("/login")) {  
            filterChain.doFilter(request, response);  
            return;  
        }  
        //获取请求头中的Authorization  
        String authorization = request.getHeader("Authorization");  
        //如果Authorization为空，那么不允许用户访问，直接返回  
        if (!StringUtils.hasText(authorization)) {  
            printFront(response, "没有登录！");  
            return;  
        }  
  
        //Authorization 去掉头部的Bearer 信息，获取token值  
        String jwtToken = authorization.replace("Bearer ", "");  
        //验签  
        boolean verifyTokenResult = jwtUtils.verifyToken(jwtToken);  
        //验签不成功  
        if (!verifyTokenResult) {  
            printFront(response, "jwtToken 已过期");  
            return;  
        }  
  
        //从payload中获取userInfo  
        String userInfo = jwtUtils.getUserInfo(jwtToken);  
        //从payload中获取授权列表  
        List<String> userAuth = jwtUtils.getUserAuth(jwtToken);  
        //创建登录用户  
        SysUser sysUser = objectMapper.readValue(userInfo, SysUser.class);  
        SecurityUser securityUser = new SecurityUser(sysUser);  
          
        //设置权限  
        List<SimpleGrantedAuthority> authList = userAuth.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());  
        securityUser.setAuthorities(authList);  
  
  
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToke = new UsernamePasswordAuthenticationToken(securityUser  
                , null, authList);  
        //通过安全上下文设置认证信息  
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToke);  
        //继续访问相应的rul等  
        filterChain.doFilter(request, response);  
  
    }  
  
    private void printFront(HttpServletResponse response, String message) throws IOException {  
        response.setCharacterEncoding("UTF-8");  
        response.setContentType("application/json;charset=utf-8");  
        PrintWriter writer = response.getWriter();  
        HttpResult httpResult = new HttpResult();  
        httpResult.setCode(-1);  
        httpResult.setMsg(message);  
  
        writer.print(objectMapper.writeValueAsString(httpResult));  
        writer.flush();  
    }  
}
```

3. 调整`SecurityConfig`,将过滤器添加到配置中
```java
@Resource  
private SaySTokenFilter saySTokenFilter;

@Override  
protected void configure(HttpSecurity http) throws Exception {  
  // 增加配置
    http.addFilterBefore(saySomethingJWTFilter, UsernamePasswordAuthenticationFilter.class);  
// ...原来的配置
}
```

##### 调试

```
# 不携带token访问http://localhost:8080/user-info
返回：{"code":-1,"msg":"没有登录！","data":null}
# 携带错误token访问http://localhost:8080/user-info
返回：{"code":-1,"msg":"jwtToken 已过期","data":null}
```

4.  在`com.li.config`,新建`SaySAuthenticationSuccessHandler`








#### 设置权限

**在loadUserByUsername中获取权限，并设置到SecurityUser中**

```java
// com.li.service.impl.UserServiceImpl

SecurityUser securityUser = new SecurityUser(sysUser);  
// 获取权限信息  
List<String> authList = sysMenuDao.queryPermissionByUserId(sysUser.getUserId());  
if (!CollectionUtils.isEmpty(authList)) {  
    List<SimpleGrantedAuthority> authorities = authList.stream().map(SimpleGrantedAuthority::new).collect(toList());  
    // 设置权限  
    securityUser.setAuthorities(authorities);  
}  
return securityUser;
```

在SaySAuthenticationSuccessHandler.onAuthenticationSuccess中，生成Token时，可以将权限信息一起放入Token中。

```java
List<String> authList = new ArrayList<>();  
// 获取权限  
List<SimpleGrantedAuthority> authorities = (List<SimpleGrantedAuthority>) securityUser.getAuthorities();  
if (!CollectionUtils.isEmpty(authorities)) {  
    // 转成String 用于生成Token  
    authList = authorities.stream().map(SimpleGrantedAuthority::getAuthority).collect(Collectors.toList());  
}

// 创建Token  增加authList参数
String token = saySJwtUtils.createToken(userInfo, authList);
```


#### 注销处理

**Jwt本质上是一个字符串，无法手动将其过期，也就是说，即使手动退出登录，对于Token来说，还是一个有效的Token，可以通过接入Redis来解决这一问题**

1. 登录成功时，将Token写入Redis
```java
// SaySAuthenticationSuccessHandler
// 设置过期时间  
@Value("${jwt.expiration}")  
private long expiration;
// 引入StringRedisTemplate
@Resource  
private StringRedisTemplate stringRedisTemplate;

// 在创建Token之后，将Token存到Redis中

onAuthenticationSuccess(){
// 创建Token  
String token = saySJwtUtils.createToken(userInfo, authList);

// 写入Redis  
stringRedisTemplate.opsForValue().set("login_token:" + token, objectMapper.writeValueAsString(authentication), expiration, TimeUnit.MILLISECONDS);
}

```

2. 校验Token时，先验签，再去Redis中判断Token是否还存在
- 如果验签成功，但是Redis中不存在，说明Token被手动过期了
```java 
doFilterInternal(){
...
// 从Redis获取token并校验  
String tokenInRedis = stringRedisTemplate.opsForValue().get("login_token:" + jwtToken);  
if (!StringUtils.hasText(tokenInRedis)) {  
    printFront(response, "用户已退出，请重新登录");  
    return;  
}
...
}
```

在`com.li.config`，新建`SaysLogoutSuccessHandler`
```java
 
/**  
 * 退出成功处理器，用户退出成功后，执行此处理器  
 */  
@Component  
public class SaysLogoutSuccessHandler implements LogoutSuccessHandler {  
    //使用此工具类的对象进行序列化操作  
    @Resource  
    private ObjectMapper objectMapper;  
    @Resource  
    private StringRedisTemplate stringRedisTemplate;  
  
    @Override  
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {  
        //从请求头中获取Authorization信息  
        String authorization = request.getHeader("Authorization");  
        //如果授权信息为空，返回前端  
        if (null == authorization) {  
            response.setCharacterEncoding("UTF-8");  
            response.setContentType("application/json;charset=utf-8");  
            HttpResult httpResult = HttpResult.builder().code(-1).msg("token不能为空").build();  
            PrintWriter writer = response.getWriter();  
            writer.write(objectMapper.writeValueAsString(httpResult));  
            writer.flush();  
            return;  
        }  
        //如果Authorization信息不为空，去掉头部的Bearer字符串  
        String token = authorization.replace("Bearer ", "");  
  
        //redis中删除token，这是关键点  
        stringRedisTemplate.delete("login_token:" + token);  
  
        response.setCharacterEncoding("UTF-8");  
        response.setContentType("application/json;charset=utf-8");  
        HttpResult httpResult = HttpResult.builder().code(200).msg("退出成功").build();  
        PrintWriter writer = response.getWriter();  
        writer.write(objectMapper.writeValueAsString(httpResult));  
        writer.flush();  
    }  
}
```

调整`SecurityConfig`
```java

@Resource  
private SaysLogoutSuccessHandler saysLogoutSuccessHandler;

configure(){
http.logout().logoutSuccessHandler(saysLogoutSuccessHandler);
// 禁用跨域请求保护 要不然logout不能访问(目前体现是弹出了确认退出登录的确认框  
http.csrf().disable();
}
```

`org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider#authenticate`
`org.springframework.security.authentication.dao.DaoAuthenticationProvider#retrieveUser`

`org.springframework.security.authentication.dao.DaoAuthenticationProvider#additionalAuthenticationChecks`