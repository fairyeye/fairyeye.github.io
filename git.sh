#!/bin/bash

# 提交dairy
hexo g
hexo d
git add .
git commit -m "auto commit"
git push -u origin dev
read -p "按回车键退出..."