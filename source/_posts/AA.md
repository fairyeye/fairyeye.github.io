---
title: 拉勾训练营5期
tags:
  - 学习
date: 2024-03-20 16:15:40
---

# JDBC

需要手动引入Mysql的jar包

```java
public class JDBCDemo {  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
        // 加载驱动  
        Class.forName("com.mysql.jdbc.Driver");  
        // 建立连接  
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "12345678");  
        // 定义SQL语句  
        String sql = "select * from db_account where id = 4";  
        // 获取预处理prepareStatement  
        PreparedStatement preparedStatement = connection.prepareStatement(sql);  
        // 设置参数  
        // preparedStatement.setInt(1, 4);  
        // 执行查询 得到结果  
        ResultSet resultSet = preparedStatement.executeQuery(sql);  
        // 处理结果  
        while (resultSet.next()) {  
            System.out.println("id:" + resultSet.getInt("id"));  
            System.out.println("email:" + resultSet.getString("email"));  
        }  
    }  
}
```


1. 为什么要有ORM框架
- 驱动uri、数据库地址、账号密码，硬编码，不灵活
- 重复的建立连接
- 处理结果集麻烦


