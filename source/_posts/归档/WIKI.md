### Media2Doc



#### 安装部署



1. 安装依赖

```sh
pip install arkitect --index-url https://pypi.org/simple
pip install -r requirements.txt
```



可能出现的问题：

- arkitect 版本报错

```sh

ERROR: Could not find a version that satisfies the requirement arkitect==0.2.3 (from versions: 0.0.1, 0.1.0.dev0, 0.1.1, 0.1.2, 0.1.3, 0.1.4, 0.1.5, 0.1.6, 0.1.7, 0.1.8, 0.1.9, 0.1.10, 0.1.11)
ERROR: No matching distribution found for arkitect==0.2.3
```

需要升级Python，使用Python3.11可以正常安装依赖

