#!/bin/sh
 
echo "####### 开始自动提交 #######"
 
# ls
 
echo "开始执行命令"
 
git add .
 
git status
 
#写个sleep 1s 是为了解决并发导致卡壳
 
sleep 1s
 
echo "####### 添加文件 #######"
 
git commit -m "auto committed"
 
echo "####### commit #######"
 
sleep 1s
 
echo "####### 开始推送 #######"
 
 
git push 
 
echo "####### 推送成功 #######"

sleep 3s

hexo d

echo "####### 部署成功 #######"