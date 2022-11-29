
```
# 数据库中运行
# 判断binlog是否开启
show variables like '%log_bin%';

# 找到数据库data位置
show variables like 'datadir';
```


- data目录下数据  找到当天的binlog
![](https://s3.uuu.ovh/imgs/2022/11/28/9c0f7495a6838922.png)

```
# 转换为SQL 只转换操作时间内的数据即可
root@VM-4-10-ubuntu:/var/lib/mysql# mysqlbinlog --base64-output=decode-rows -v --database=smart-admin-dev --start-datetime="2022-11-28 10:50:00" --stop-datetime="2022-11-28 11:00:00" binlog.000018 > 000018.sql
```

- 000018.sql
![](https://s3.uuu.ovh/imgs/2022/11/28/09e65127e32811f6.png)

```
# 将SQL转换为insert语句
root@VM-4-10-ubuntu:/var/lib/mysql# cat 000018.sql | sed -n '/###/p' | sed 's/### //g;s/\/\*.*/,/g;s/DELETE FROM/;INSERT INTO/g;s/WHERE/SELECT/g;' |sed -r 's/(@17.*),/\1;/g' | sed 's/@1=//g'| sed 's/@[1-9]=/,/g' | sed 's/@[1-9][0-9]=/,/g' > 000018OK.sql
```

- 000018OK.sql
![](https://s3.uuu.ovh/imgs/2022/11/28/070cfb64cc8045dc.png)

最后将数据导入数据库即可。