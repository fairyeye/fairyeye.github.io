小技巧篇（3）

_绘梨衣 2021-04-12 22:01:35  3  收藏
分类专栏： 小技巧 文章标签： linux nodejs node.js
版权


切换nodejs版本
遇到过很多项目对node版本都有要求，高于x.xx低于x.xx。
就很烦。
所以，我就去搜了下有没有什么工具可以切换node的版本，很快啊，嗖的一下，就搜到了。

Mac(CentOS\Ubuntu应该也可以)
这个工具的名字叫做 n，对，你没有看错。

使用方法
如果有node环境
# 记得加sudo
➜  ~ sudo npm install -g n 

Password:
/usr/local/bin/n -> /usr/local/lib/node_modules/n/bin/n
+ n@7.1.0
added 1 package from 2 contributors in 0.767s

# 安装另一个版本的node
➜  ~ sudo n 10.13.0
  installing : node-v10.13.0
       mkdir : /usr/local/n/versions/node/10.13.0
       fetch : https://nodejs.org/dist/v10.13.0/node-v10.13.0-darwin-x64.tar.xz
   installed : v10.13.0 (with npm 6.4.1)
  # 这就装好了 
  # 切换  输入n  就会出现下图
  ➜  ~ n

然后按照提示， up/down 选择版本，回车确认，就会切换node环境。

如果没有nodejs环境
要么你装一个，要么你再搜下吧。
