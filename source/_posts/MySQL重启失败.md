my.cnf -> 查看 err_log 位置

查看日志报错



```
ERROR:-----------> The innodb_system data file 'ibdata1' must be writable
```

```
# 5.7之后版本 [根据MySQL安装路径]
chmod -R 777 /var/lib/mysql
```

