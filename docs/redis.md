# Redis 手记

---

## <a id="overview"></a>概述

Redis是一个高性能的 `key-value` 数据库
* 支持数据持久化，将内存数据存储到磁盘，重启后再加载到内存
* 除了键值对以外还支持`list`, `set`, `zset`, `hash`等数据存储结构
* 支持`master-slave`数据备份

### 优势

* 读入11w/s，写入8w/s，效率高
* 数据类型丰富，数据操作功能丰富
* 操作原子性，多个操作支持事务（通过`MULTI`或者`EXEC`包裹而成的操作集）

### 不同点

* Redis提供了内置的数据结构，减少设计成本及迁移成本
* 运行在内存中同时可以持久化到磁盘中。

---

## <a id="install"></a>安装

使用`brew`安装省时省心，其他系统安装我不管

```
➜  ~ brew install redis
```
启动Redis服务并设置为开机启动
```
➜  ~ brew services start redis
```
验证是否启动成功
```
➜  ~ redis-cli
127.0.0.1:6379> ping
PONG
```

---

## <a id="config"></a>配置

需要调整配置的时候，得提前知道配置项中的意思。有两种方式

```
# edit redis.conf
➜  ~ vi /<path_to_redis_install_dir>/redis.conf
# use cli config command
➜  ~ redis-cli
127.0.0.1:6379> config get *
127.0.0.1:6379> config set <config_name> <config_new_value>
```

不知道大家能够得到啥样的，我这里就有这么多：
```
127.0.0.1:6379> config get *
  1) "dbfilename"
  2) "dump.rdb"
  3) "requirepass"
  4) ""
  5) "masterauth"
  6) ""
  7) "cluster-announce-ip"
  8) ""
  9) "unixsocket"
 10) ""
 11) "logfile"
 12) ""
 13) "pidfile"
 14) "/var/run/redis_6379.pid"
 15) "slave-announce-ip"
 16) ""
 17) "maxmemory"
 18) "0"
 19) "proto-max-bulk-len"
 20) "536870912"
 21) "client-query-buffer-limit"
 22) "1073741824"
 23) "maxmemory-samples"
 24) "5"
 25) "lfu-log-factor"
 26) "10"
 27) "lfu-decay-time"
 28) "1"
 29) "timeout"
 30) "0"
 31) "active-defrag-threshold-lower"
 32) "10"
 33) "active-defrag-threshold-upper"
 34) "100"
 35) "active-defrag-ignore-bytes"
 36) "104857600"
 37) "active-defrag-cycle-min"
 38) "25"
 39) "active-defrag-cycle-max"
 40) "75"
 41) "auto-aof-rewrite-percentage"
 42) "100"
 43) "auto-aof-rewrite-min-size"
 44) "67108864"
 45) "hash-max-ziplist-entries"
 46) "512"
 47) "hash-max-ziplist-value"
 48) "64"
 49) "list-max-ziplist-size"
 50) "-2"
 51) "list-compress-depth"
 52) "0"
 53) "set-max-intset-entries"
 54) "512"
 55) "zset-max-ziplist-entries"
 56) "128"
 57) "zset-max-ziplist-value"
 58) "64"
 59) "hll-sparse-max-bytes"
 60) "3000"
 61) "lua-time-limit"
 62) "5000"
 63) "slowlog-log-slower-than"
 64) "10000"
 65) "latency-monitor-threshold"
 66) "0"
 67) "slowlog-max-len"
 68) "128"
 69) "port"
 70) "6379"
 71) "cluster-announce-port"
 72) "0"
 73) "cluster-announce-bus-port"
 74) "0"
 75) "tcp-backlog"
 76) "511"
 77) "databases"
 78) "16"
 79) "repl-ping-slave-period"
 80) "10"
 81) "repl-timeout"
 82) "60"
 83) "repl-backlog-size"
 84) "1048576"
 85) "repl-backlog-ttl"
 86) "3600"
 87) "maxclients"
 88) "10000"
 89) "watchdog-period"
 90) "0"
 91) "slave-priority"
 92) "100"
 93) "slave-announce-port"
 94) "0"
 95) "min-slaves-to-write"
 96) "0"
 97) "min-slaves-max-lag"
 98) "10"
 99) "hz"
100) "10"
101) "cluster-node-timeout"
102) "15000"
103) "cluster-migration-barrier"
104) "1"
105) "cluster-slave-validity-factor"
106) "10"
107) "repl-diskless-sync-delay"
108) "5"
109) "tcp-keepalive"
110) "300"
111) "cluster-require-full-coverage"
112) "yes"
113) "cluster-slave-no-failover"
114) "no"
115) "no-appendfsync-on-rewrite"
116) "no"
117) "slave-serve-stale-data"
118) "yes"
119) "slave-read-only"
120) "yes"
121) "stop-writes-on-bgsave-error"
122) "yes"
123) "daemonize"
124) "no"
125) "rdbcompression"
126) "yes"
127) "rdbchecksum"
128) "yes"
129) "activerehashing"
130) "yes"
131) "activedefrag"
132) "no"
133) "protected-mode"
134) "yes"
135) "repl-disable-tcp-nodelay"
136) "no"
137) "repl-diskless-sync"
138) "no"
139) "aof-rewrite-incremental-fsync"
140) "yes"
141) "aof-load-truncated"
142) "yes"
143) "aof-use-rdb-preamble"
144) "no"
145) "lazyfree-lazy-eviction"
146) "no"
147) "lazyfree-lazy-expire"
148) "no"
149) "lazyfree-lazy-server-del"
150) "no"
151) "slave-lazy-flush"
152) "no"
153) "maxmemory-policy"
154) "noeviction"
155) "loglevel"
156) "notice"
157) "supervised"
158) "no"
159) "appendfsync"
160) "everysec"
161) "syslog-facility"
162) "local0"
163) "appendonly"
164) "no"
165) "dir"
166) "/usr/local/var/db/redis"
167) "save"
168) "900 1 300 10 60 10000"
169) "client-output-buffer-limit"
170) "normal 0 0 0 slave 268435456 67108864 60 pubsub 33554432 8388608 60"
171) "unixsocketperm"
172) "0"
173) "slaveof"
174) ""
175) "notify-keyspace-events"
176) ""
177) "bind"
178) "127.0.0.1 ::1"
```
很容易找到规律，上边列表中奇数是`key`，偶数是`value`， 高兴的话写个conf2Json转一下，图形化界面升级也可以。实际工作中需要修改的不多。

---

## <a id="data-type"></a>数据类型

Redis支持五种数据类型，`string`、`hash`、`list`、`set`、`zset(sorted set)`
### 字符串
Redis的字符串类型可以包含任何数据，是二进制安全的。可以把string理解为`any`，单个键值对存储上限为512M。使用 `set` `get`对字符串进行读写

```
➜  ~ redis-cli
127.0.0.1:6379> set fuchao "my first redis key"
OK
127.0.0.1:6379> get fuchao
"my first redis key"
```

### 哈希
哈希是限定了键的类型为`string`的无序集合(可以存储40y对数据)，适用于存储对象数据(JSON)。使用`hmset`进行定义，通过`hget`进行读取
```
127.0.0.1:6379> hmset myhash fuchao "28" meng "28"
OK
127.0.0.1:6379> hget myhash fuchao
"28"
```
### 列表

Redis实现的是双向列表（可以存储40y条数据）可以通过 `l|r push`来插入数据，`lrange`查看现有的数据

```
127.0.0.1:6379> lpush mylist fuchao meng
(integer) 2
127.0.0.1:6379> rpush mylist xiaoxiao
(integer) 3
127.0.0.1:6379> lrange mylist 0 10
1) "meng"
2) "fuchao"
3) "xiaoxiao"
```

### 集合
集合是基于哈希实现的无序集合。通过`sadd`写入元素，成功返回**1** 已存在返回**0**(由于集合元素是唯一的，所以第二次插入的数据会被忽略)，如果集合不存在返回错误

```
127.0.0.1:6379> sadd myset fuchao
(integer) 1
127.0.0.1:6379> sadd myset fuchao
(integer) 0
127.0.0.1:6379> sadd myset meng
(integer) 1
127.0.0.1:6379> smembers myset
1) "meng"
2) "fuchao"
```
### 有序集合

有序集合是在集合的操作中给元素增加权重(double)，元素唯一但权重(score)可以重复。

```
127.0.0.1:6379> zadd myzset 0 fuchao
(integer) 1
127.0.0.1:6379> zadd myzset 0 fuchao
(integer) 0
127.0.0.1:6379> zadd myzset 0 meng
(integer) 1
127.0.0.1:6379> zrangebyscore myzset 0 1000
1) "meng"
2) "fuchao"
```

---

## <a id="command"></a>命令

之前用到的config就是命令之一了。约定俗成使用ping命令来验证连通性。

> 另外，作者喜欢6379这个端口，因为手机数字键盘中，这四个数字代表了作者喜欢的明星妹子(Merz)。如果我设计的话，应该就是42554了吧

```
#启用本地服务连接本地Redis服务
# brew services start redis -- first
➜  ~ redis-cli
127.0.0.1:6379> 
#连接远端服务
➜  ~ redis-cli -h 10.12.123.15 -p 6379 -a "mypass"
10.12.123.15:6379> ping
PONG
```
常用的命令便是操作数据，成功返回**1** 失败返回**0** 无效返回错误

### 管理键

常见操作有16个。模式为 `<command> <key>`

```
# 查找正则为 /fuchao/ 的keys
127.0.0.1:6379> keys fuchao
1) "fuchao"
# 输出key的值，并序列化
127.0.0.1:6379> dump fuchao
"\x00\x12my first redis key\b\x00^9\xa1{IXB\xd5"
# 删除key
127.0.0.1:6379> del fuchao
(integer) 1
# 验证key是否存在
127.0.0.1:6379> exists fuchao
(integer) 0
# 设置key的超时时间，在写入的时候可以直接设置
# 超时后就删除掉了
# 重复设置无效（返回0）
# 单位秒，如果使用毫秒则使用 pexpire pexpireat
# 如果不设置表示永久存在
# 通过 persist <key> 移除超时时间
# 通过ttl <key> 或者 pttl <key> 查询剩余的时间
127.0.0.1:6379> expire fuchao 30
(integer) 1
127.0.0.1:6379> expireat fuchao 1535879392955
(integer) 1
127.0.0.1:6379> persist fuchao
(integer) 1
# key不存在返回-2
127.0.0.1:6379> ttl fuchao
(integer) -2
# 永恒返回-1
127.0.0.1:6379> ttl meng
(integer) -1
# 将key 移动到数据库db
127.0.0.1:6379> move fuchao mydb
(integer) 1
# 从当前数据库中随机返回一个key
127.0.0.1:6379> randomkey
"myset"
# 给key重命名，如果后者存在则覆盖，不覆盖命令为renamenx
127.0.0.1:6379> rename fuchao meng
OK
# 返回key的类型（五种之一）
127.0.0.1:6379> type fuchao
string
```

### 管理字符串、哈希、列表、集合

用到的时候看文档吧。。。

---

## <a id="algorithm"></a> 算法

### HyperLogLog 快速估算数据集基数

HyperLogLog 是用来做基数统计的算法，HyperLogLog的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。

```
127.0.0.1:6379> PFADD fuchao "fuchao"
1) (integer) 1
127.0.0.1:6379> PFADD fuchao "meng"
1) (integer) 1
127.0.0.1:6379> PFCOUNT fuchao
(integer) 2
```
### 发布订阅模式

Redis通过发布订阅模式实现消息通信。客户端与频道之间是多对多的关系。

```
#订阅fuchao这个频道，3行算一条
127.0.0.1:6379> subscribe fuchao
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "fuchao"
3) (integer) 1
#新开一个terminal向频道发布消息
➜  ~ redis-cli
127.0.0.1:6379> publish fuchao "hello fuchao"
(integer) 1
#此时原订阅者就能看到新到达的一条消息（3行展示）
127.0.0.1:6379> subscribe fuchao
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "fuchao"
3) (integer) 1
1) "message"
2) "fuchao"
3) "hello fuchao"
# 退订频道，这里有个ctrl+c的时候直接退出了redis-cli的问题
127.0.0.1:6379> punsubscribe fuchao
```

---

## <a id="transactions"></a>事务

以 MULTI 开始一个事务， 然后将多个命令入队到事务中， 最后由 EXEC 命令触发事务， 一并执行事务中的所有命令。
* 批量操作在发送 EXEC 命令前被放入队列缓存。
* 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
* 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。

```
127.0.0.1:7000> multi
OK
127.0.0.1:7000> set fuchao "fuchao"
QUEUED
127.0.0.1:7000> set meng "meng"
QUEUED
127.0.0.1:7000> set xiaoxiao "xiaoxiao"
QUEUED
127.0.0.1:7000> exec
1) OK
2) OK
3) OK
```
如果`set meng "meng"`失败了，`set fuchao "fuchao"`不会回滚，`set xiaoxiao "xiaoxiao"` 依然会执行