---
title: Mac使用记录
description: 记录使用的软件、环境配置等
tags:
  - 日常记录
---
## 软件

###  ttygif

- 终端录制工具

#### 安装教程

```bash
brew install ttygif
```

#### 使用

```bash 命令行提示符 command:("[root@localhost] $":1,9-10||"[admin@remotehost] #":4-6)
ttyrec myrecording
```

### sshx

- 终端共享

#### 使用

```sh
zhanghuapengdeMacBook-Pro :: Downloads/work_space/AA % sshx

  sshx v0.2.1

  ➜  Link:  https://sshx.io/s/ZtVval8VO2#e9o4sruIiflVdh
  ➜  Shell: /bin/zsh
```



## Flutter

#### 环境安装：

[官方说明](https://docs.flutter.dev/get-started/install/macos)

## 环境

python环境

虚拟环境：~/

DP:DrissionPage


## LUA

[lua+redis限流](https://mp.weixin.qq.com/s/Ag5E6D81diE6M-uehWloJQ)



## Cargo


[install cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)


## 破解软件打不开

```sh
# 这个好像没生效
Mac :: ~ % sudo spctl --global-disable
Password:

# 将软件拖进来
Mac :: ~ % sudo xattr -r -c /Applications/Navicat\ Premium.app
```


## Jrebel 激活

```
docker pull qierkang/golang-reverseproxy
docker run -d -p 8888:8888 qierkang/golang-reverseproxy

#licene
http://127.0.0.1:8888/7a14c9f7-8a27-46d6-bb50-2b30c19e766c
```



###  一行命令下载全网视频
```sh
$ pip3 install you-get
```
**如何下载**

_**1.**_ 可通过如下命令查看该视频的详细信息。
```sh
you-get -i '视频url'
```
_**2.**_ 下载方式更简单，只需一行命令即可下载了：

```sh
you-get '视频url'
```


### Jan - 将人工智能带入您的桌面






```
```




## Sonoma系统退回到Catalina

![](https://s3.bmp.ovh/imgs/2024/03/18/26d4edbd95ba29b0.png)

20款MacBook Pro，使用Sonoma系统感觉有点卡顿，晚上说是新系统对旧Mac兼容不是很好，决定退回Catalina版本，最后一个Inter电脑发布的系统

准备：U盘（32G）（没有也行
时间机器：（没有也行 主打一个凑合
电脑硬盘：这个得有
Catalina系统安装器（去App Store下载好
0. 先分区
 - 有U盘的情况，直接新建一个系统分区就好（`APFS`格式）
 - 无U盘的情况，先建一个系统分区，再用至少20G空间做一个引导系统分区，格式选（Mac OS日志）
 - 分区的时候，该抹掉就抹掉，只要别把当前系统抹掉就行

1. 制作引导系统 （这步记不太清楚了

有U盘的情况下，重启电脑，按`option`键，显示小地球图标（没有图），大概就是下面的这种，
![](https://s3.bmp.ovh/imgs/2024/03/18/5ad8cd52fe6b475c.png)

2. 分区
3. 安装到分区上
4. 用Catalina系统制作时间机器，保证时间机器分区是Mac OS 扩展（日志式）
5. 将Sonoma系统数据备份到时间机器
6. 到Catalina系统，用迁移助理将数据迁移过来
7. 后续看情况删除Sonoma系统分区



## Docker

### QL

#### dailycheckin



```python
"""
获取i茅台账号cookie
"""
import hashlib

import json

import time

import requests

"""

获取地点信息,这里用的高德 api,需要自己去高德开发者平台申请自己的 key

"""

AMAP_KEY = "d13d06ac58fd360776f58583254c0079"

SALT = "2af72f100c356273d46284f6fd1dfc08"

CURRENT_TIME = str(int(time.time() * 1000))

headers = {}

mt_version = json.loads(

requests.get("https://itunes.apple.com/cn/lookup?id=1600482450").text

)["results"][0]["version"]

header_context = """

MT-Lat: 28.499562

MT-K: 1675213490331

MT-Lng: 102.182324

Host: app.moutai519.com.cn

MT-User-Tag: 0

Accept: */*

MT-Network-Type: WIFI

MT-Token: 1

MT-Team-ID: 1

MT-Info: 028e7f96f6369cafe1d105579c5b9377

MT-Device-ID: 2F2075D0-B66C-4287-A903-DBFF6358342A

MT-Bundle-ID: com.moutai.mall

Accept-Language: en-CN;q=1, zh-Hans-CN;q=0.9

MT-Request-ID: 167560018873318465

MT-APP-Version: 1.3.7

User-Agent: iOS;16.3;Apple;?unrecognized?

MT-R: clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdw==

Content-Length: 93

Accept-Encoding: gzip, deflate, br

Connection: keep-alive

Content-Type: application/json

userId: 2

"""

# 初始化请求头

def init_headers(

user_id: str = "1", token: str = "2", lat: str = "29.83826", lng: str = "119.74375"

):

for k in header_context.strip().split("\n"):

temp_l = k.split(": ")

dict.update(headers, {temp_l[0]: temp_l[1]})

dict.update(headers, {"userId": user_id})

dict.update(headers, {"MT-Token": token})

dict.update(headers, {"MT-Lat": lat})

dict.update(headers, {"MT-Lng": lng})

dict.update(headers, {"MT-APP-Version": mt_version})

# 用高德api获取地图信息

def select_geo(i: str):

# 校验高德api是否配置

if AMAP_KEY is None:

print("!!!!请配置 AMAP_KEY (高德地图的MapKey)")

raise ValueError

resp = requests.get(

f"https://restapi.amap.com/v3/geocode/geo?key={AMAP_KEY}&output=json&address={i}"

)

geocodes: list = resp.json()["geocodes"]

return geocodes

def signature(data: dict):

keys = sorted(data.keys())

temp_v = ""

for item in keys:

temp_v += data[item]

text = SALT + temp_v + CURRENT_TIME

hl = hashlib.md5()

hl.update(text.encode(encoding="utf8"))

md5 = hl.hexdigest()

return md5

# 获取登录手机验证码

def get_vcode(mobile: str):

params = {"mobile": mobile}

md5 = signature(params)

dict.update(

params, {"md5": md5, "timestamp": CURRENT_TIME, "MT-APP-Version": mt_version}

)

responses = requests.post(

"https://app.moutai519.com.cn/xhr/front/user/register/vcode",

json=params,

headers=headers,

)

if responses.status_code != 200:

print(

f"get v_code : params : {params}, response code : {responses.status_code}, response body : {responses.text}"

)

# 执行登录操作

def login(mobile: str, v_code: str):

params = {"mobile": mobile, "vCode": v_code, "ydToken": "", "ydLogId": ""}

md5 = signature(params)

dict.update(

params, {"md5": md5, "timestamp": CURRENT_TIME, "MT-APP-Version": mt_version}

)

responses = requests.post(

"https://app.moutai519.com.cn/xhr/front/user/register/login",

json=params,

headers=headers,

)

if responses.status_code != 200:

print(

f"login : params : {params}, response code : {responses.status_code}, response body : {responses.text}"

)

dict.update(headers, {"MT-Token": responses.json()["data"]["token"]})

dict.update(headers, {"userId": responses.json()["data"]["userId"]})

return responses.json()["data"]["token"], responses.json()["data"]["userId"]

def get_location():

while 1:

location = input(

"请输入精确小区位置，例如[小区名称]，为你自动预约附近的门店:"

).strip()

selects = select_geo(location)

a = 0

for item in selects:

formatted_address = item["formatted_address"]

province = item["province"]

print(f"{a} : [地区:{province},位置:{formatted_address}]")

a += 1

user_select = input("请选择位置序号,重新输入请输入[-]:").strip()

if user_select == "-":

continue

select = selects[int(user_select)]

formatted_address = select["formatted_address"]

province = select["province"]

print(f"已选择 地区:{province},[{formatted_address}]附近的门店")

return select

if __name__ == "__main__":

items = []

while 1:

init_headers()

location_select: dict = get_location()

province = location_select["province"]

city = location_select["city"]

location: str = location_select["location"]

mobile = input("输入手机号[18888888888]:").strip()

get_vcode(mobile)

code = input(f"输入 [{mobile}] 验证码[8888]:").strip()

token, userId = login(mobile, code)

item = {

"city": str(city),

"lat": location.split(",")[1],

"lng": location.split(",")[0],

"mobile": str(mobile),

"province": province,

"token": str(token),

"userid": str(userId),

"reserve_rule": 0,

"item_codes": ["10941", "10942"],

}

items.append(item)

condition = input("是否继续添加账号[y/n]:").strip()

with open("account.json", "w") as f:

f.write(json.dumps(items, ensure_ascii=False, indent=4))

if condition.lower() == "n":

break
```


## Scrcpy

``` sh
# 手机息屏启动
scrcpy --turn-screen-off
```



## 服务器FRP

##### path: `/home/li/frpc`