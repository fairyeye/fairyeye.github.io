



虚拟机的Docker启动一个MySQL5.7  



```
docker run -d --name mysql57 \
  -e MYSQL_ROOT_PASSWORD=mysql57 \
  -p 3307:3306 \  # 主机 3307 → 容器 3306
  mysql:5.7
```





强制删除容器：`docker rm -f mysql57`



