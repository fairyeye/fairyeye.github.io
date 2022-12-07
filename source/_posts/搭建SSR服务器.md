---
title: 搭建SSR服务器
date: 2022-12-7 11:00:24
tags: others
categories: 杂项
---

```
apt install git 
报错：Temporary failure resolving 'archive.ubuntu.com
具体如下：

Ign:1 http://archive.ubuntu.com/ubuntu xenial/main i386 liberror-perl all 0.17-1.2
Ign:2 http://archive.ubuntu.com/ubuntu xenial/main i386 git-man all 1:2.7.4-0ubuntu1
Err:3 http://archive.ubuntu.com/ubuntu xenial/main amd64 git amd64 1:2.7.4-0ubuntu1
  Temporary failure resolving 'archive.ubuntu.com'
Err:1 http://archive.ubuntu.com/ubuntu xenial/main i386 liberror-perl all 0.17-1.2
  Temporary failure resolving 'archive.ubuntu.com'
Err:2 http://archive.ubuntu.com/ubuntu xenial/main i386 git-man all 1:2.7.4-0ubuntu1
  Temporary failure resolving 'archive.ubuntu.com'
E: Failed to fetch http://archive.ubuntu.com/ubuntu/pool/main/libe/liberror-perl/liberror-perl_0.17-1.2_all.deb  Temporary failure resolving 'archive.ubuntu.com'

E: Failed to fetch http://archive.ubuntu.com/ubuntu/pool/main/g/git/git-man_2.7.4-0ubuntu1_all.deb  Temporary failure resolving 'archive.ubuntu.com'

E: Failed to fetch http://archive.ubuntu.com/ubuntu/pool/main/g/git/git_2.7.4-0ubuntu1_amd64.deb  Temporary failure resolving 'archive.ubuntu.com'

E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
root@132157:~# apt-get update
Err:1 http://security.ubuntu.com/ubuntu xenial-security InRelease
  Temporary failure resolving 'security.ubuntu.com'
Err:2 http://archive.ubuntu.com/ubuntu xenial InRelease
  Temporary failure resolving 'archive.ubuntu.com'
Err:3 http://archive.ubuntu.com/ubuntu xenial-updates InRelease
  Temporary failure resolving 'archive.ubuntu.com'
Err:4 http://archive.ubuntu.com/ubuntu xenial-backports InRelease
  Temporary failure resolving 'archive.ubuntu.com'
Reading package lists... Done
W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/xenial/InRelease  Temporary failure resolving 'archive.ubuntu.com'
W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/xenial-updates/InRelease  Temporary failure resolving 'archive.ubuntu.com'
W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/xenial-backports/InRelease  Temporary failure resolving 'archive.ubuntu.com'
W: Failed to fetch http://security.ubuntu.com/ubuntu/dists/xenial-security/InRelease  Temporary failure resolving 'security.ubuntu.com'
W: Some index files failed to download. They have been ignored, or old ones used instead.

```

`原因是DNS未配置`

```
sudo vi /etc/resolv.conf

+ nameserver 202.96.134.133
+ nameserver 8.8.8.8
```

