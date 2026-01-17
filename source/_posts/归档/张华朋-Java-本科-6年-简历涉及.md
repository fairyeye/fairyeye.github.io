---
hidden: true
---

### 1. **JVM原理、性能调优**

**知识点**：

- JVM的内存模型（堆、栈、方法区、垃圾收集器等）
- 垃圾回收算法（标记-清除、复制算法、分代收集等）
- 类加载机制（双亲委派模型、类加载器等）
- 性能调优：堆内存配置、GC调优、内存泄漏、死锁分析
- 多线程与并发：线程池的使用、线程安全、锁机制（ReentrantLock、synchronized等）

**可能的面试题**：

- JVM如何管理内存？堆和栈的区别是什么？
- 垃圾回收的几种算法及其优缺点？
- 你是如何对JVM进行性能调优的？遇到过哪些性能瓶颈？
- Java内存模型和并发编程的基础知识是什么？

---

### 2. **Spring Cloud 微服务架构**

**知识点**：

- Spring Boot的基本使用
- Spring Cloud的核心组件：Eureka（服务注册与发现）、Zuul/Gateway（API网关）、Ribbon（客户端负载均衡）、Feign（声明式服务调用）、Hystrix（容错处理）
- Nacos（配置中心、服务发现与管理）
- Sentinel（流量控制与降级保护）
- Seata（分布式事务）
- 微服务架构的设计理念与最佳实践

**可能的面试题**：

- Spring Cloud与Spring Boot的关系？
- Eureka的工作原理是什么？如何配置服务注册与发现？
- 你是如何实现微服务之间的通信和负载均衡的？
- 在Spring Cloud中，如何处理服务的容错和降级？
- Seata的分布式事务如何保证数据一致性？
- 如何使用Sentinel来进行流量控制？

---

### 3. **数据库技术**

**知识点**：

- MySQL的基本操作（增删改查）、索引优化、联合查询、事务管理
- SQL优化（执行计划分析、索引优化、复杂查询优化）
- 读写分离、分库分表
- Redis的缓存机制、常见数据结构（String, List, Set, Hash等）、缓存雪崩、缓存击穿、缓存穿透
- 数据一致性问题（ACID、BASE理论）

**可能的面试题**：

- 如何优化SQL查询性能？可以举一个具体的例子吗？
- 你在项目中如何设计缓存架构，避免缓存穿透和缓存击穿？
- Redis的持久化机制是什么？
- 在微服务架构中，如何实现数据库的读写分离？
- 你是如何进行数据库性能调优的？

---

### 4. **分布式系统和微服务**

**知识点**：

- 微服务架构设计原则与模式
- 领域驱动设计（DDD）
- 服务拆分、服务治理与容错设计
- 分布式事务与一致性问题
- 消息队列（RocketMQ、Kafka等）和事件驱动架构
- 分布式缓存与数据一致性

**可能的面试题**：

- 什么是微服务架构？它与单体架构的区别是什么？
- 如何设计一个高可用的分布式系统？
- 如何保证分布式系统中的数据一致性？
- 你是如何在项目中实现服务间通信的？（例如，如何解决服务间的高并发问题）
- 你在项目中如何解决分布式事务问题？

---

### 5. **规则引擎**

**知识点**：

- 规则引擎的基本概念和应用场景
- 规则引擎的选择（Drools、Easy Rules等）
- 业务规则的配置化与动态配置

**可能的面试题**：

- 你在项目中是如何设计和实现规则引擎的？
- 规则引擎的优势是什么，为什么需要引入规则引擎？
- 规则引擎如何与微服务架构结合使用？

---

### 6. **适配器模式和二次开发**

**知识点**：

- 适配器模式的设计与应用场景
- 如何处理大规模的二次开发项目？
- 动态脚本执行与远程服务调用

**可能的面试题**：

- 你能解释一下适配器模式的使用场景吗？
- 如何处理一个系统中大量的二次开发需求？
- 你如何管理和维护多租户系统中的个性化需求？

---

### 7. **开源项目和代码规范**

**知识点**：

- 开源项目的使用与贡献
- Git工作流、代码管理与版本控制
- 团队代码规范和代码质量保证（如SonarQube、Checkstyle等）

**可能的面试题**：

- 你在工作中是如何使用Git的？有什么常用的Git命令？
- 你如何确保团队代码质量？在团队中推广代码规范的经验是什么？
- 你曾经参与过哪些开源项目？你是如何贡献的？

---

### 8. **快速学习与自我提升**

**知识点**：

- 快速上手新技术的策略
- 技术选型与调研

**可能的面试题**：

- 你是如何迅速掌握新技术并将其应用到项目中的？
- 能否分享一次你快速学习并成功应用新技术的经历？
- 你如何评估并选择新技术来满足项目需求？


## SpringMVC

![](https://s3.bmp.ovh/imgs/2025/02/14/2a61bb56783a5f15.png)


## SQL优化

![](https://s3.bmp.ovh/imgs/2025/02/14/818ea6443f0cd745.png)


以下是几个具体的 **SQL优化场景及解决方案**，结合真实案例和优化思路，适合在面试中详细阐述：

---

### **场景 1：索引失效导致全表扫描**
**问题描述**：  
某订单表 `order`（数据量1000万行）根据 `user_id` 和 `create_time` 查询最近订单，SQL执行耗时 **3秒**，但 `user_id` 已建立单列索引。  
```sql
SELECT * FROM order 
WHERE DATE(create_time) = '2023-10-01' AND user_id = 1001;
```

**分析与优化**：  
1. **执行计划分析**：  
   - 使用 `EXPLAIN` 发现 `type=ALL`（全表扫描），`key=null`（未使用索引）。  
   - **原因**：`DATE(create_time)` 对字段使用函数，导致索引失效。  

2. **优化方案**：  
   - **改写SQL**：避免对索引字段使用函数。  
   - **新增联合索引**：`ALTER TABLE order ADD INDEX idx_user_create (user_id, create_time);`  
   ```sql
   SELECT * FROM order 
   WHERE create_time >= '2023-10-01 00:00:00' 
     AND create_time < '2023-10-02 00:00:00' 
     AND user_id = 1001;
   ```

3. **效果**：  
   - 使用联合索引后，执行时间从 **3秒 → 50ms**，`EXPLAIN` 显示 `type=range`，`key=idx_user_create`。

---

### **场景 2：深度分页性能问题**
**问题描述**：  
分页查询用户日志表 `user_log`（2000万行），翻页到第1000页时，SQL卡顿（耗时 **10秒**）：  
```sql
SELECT * FROM user_log 
ORDER BY id LIMIT 10 OFFSET 100000; -- 第10000行开始取10条
```

**分析与优化**：  
1. **问题根源**：  
   - `OFFSET 100000` 需要先扫描前10万行，再取10行，效率低下。  

2. **优化方案**：  
   - **使用游标分页（基于ID）**：记录上一页最大ID，避免 `OFFSET`。  
   ```sql
   SELECT * FROM user_log 
   WHERE id > {last_max_id}  -- 例如上一页最大ID是100000
   ORDER BY id LIMIT 10;
   ```
   - **业务妥协**：若必须允许跳页，使用子查询优化：  
   ```sql
   SELECT * FROM user_log 
   WHERE id >= (SELECT id FROM user_log ORDER BY id LIMIT 100000, 1)
   ORDER BY id LIMIT 10;
   ```

3. **效果**：  
   - 游标分页耗时 **10ms**，子查询优化耗时 **1秒**（仍比原方案快10倍）。

---

### **场景 3：大表JOIN性能瓶颈**
**问题描述**：  
商品表 `product`（100万行）与订单明细表 `order_item`（1亿行）关联查询，SQL耗时 **5秒**：  
```sql
SELECT p.name, SUM(oi.quantity) AS total 
FROM product p 
JOIN order_item oi ON p.id = oi.product_id 
WHERE p.category = 'electronics' 
GROUP BY p.id;
```

**分析与优化**：  
1. **执行计划分析**：  
   - `order_item` 全表扫描，`product` 使用 `category` 索引。  
   - **瓶颈**：`order_item` 表无 `product_id` 索引，且GROUP BY需要临时表。  

2. **优化方案**：  
   - **添加索引**：  
     ```sql
     ALTER TABLE order_item ADD INDEX idx_product (product_id);
     ALTER TABLE product ADD INDEX idx_category_id (category, id);
     ```
   - **冗余字段**：若允许，在 `order_item` 中冗余 `category` 字段，避免JOIN。  
   - **改用覆盖索引**：  
     ```sql
     SELECT p.id, p.name, SUM(oi.quantity) AS total 
     FROM product p 
     JOIN (SELECT product_id, quantity FROM order_item) oi 
       ON p.id = oi.product_id 
     WHERE p.category = 'electronics' 
     GROUP BY p.id;
     ```

3. **效果**：  
   - 添加索引后，查询耗时 **200ms**，`EXPLAIN` 显示 `Using index`。

---

### **场景 4：数据量过大导致慢查询**
**问题描述**：  
日志表 `access_log`（每日新增50万行）查询某API最近一月的访问记录，SQL耗时 **8秒**：  
```sql
SELECT * FROM access_log 
WHERE api_path = '/user/info' 
  AND create_time BETWEEN '2023-09-01' AND '2023-09-30';
```

**分析与优化**：  
1. **问题分析**：  
   - 单表数据量过大（1.5亿行），即使有 `api_path` 和 `create_time` 索引，仍需大量IO。  

2. **优化方案**：  
   - **分区表**：按时间范围分区，每月一个分区。  
     ```sql
     ALTER TABLE access_log 
     PARTITION BY RANGE (TO_DAYS(create_time)) (
         PARTITION p202309 VALUES LESS THAN (TO_DAYS('2023-10-01')),
         PARTITION p202310 VALUES LESS THAN (TO_DAYS('2023-11-01'))
     );
     ```
   - **冷热数据分离**：将历史数据迁移到归档表，只查询热数据。  
   - **联合索引优化**：  
     ```sql
     ALTER TABLE access_log ADD INDEX idx_api_time (api_path, create_time);
     ```

3. **效果**：  
   - 分区后查询仅扫描9月分区，耗时 **1秒**，结合索引后 **200ms**。

---

### **场景 5：死锁与事务优化**
**问题描述**：  
高并发场景下，订单状态更新频繁出现死锁：  
```sql
-- 事务1
UPDATE order SET status = 'paid' WHERE user_id = 1001 AND id = 2001;

-- 事务2
UPDATE order SET status = 'canceled' WHERE user_id = 1002 AND id = 2002;
```

**分析与优化**：  
1. **死锁日志分析**：  
   - 发现死锁与 `user_id` 索引的锁竞争有关（间隙锁冲突）。  

2. **优化方案**：  
   - **调整索引**：将 `user_id` 单列索引改为 `(user_id, id)` 联合索引，缩小锁范围。  
   - **事务拆分**：避免长事务，尽快提交。  
   - **重试机制**：代码层面对死锁异常捕获并重试。  

3. **效果**：  
   - 死锁频率降低90%，事务执行时间从 **50ms → 20ms**。

---

### **场景 6：子查询优化**
**问题描述**：  
查询用户最近一笔订单信息，原始SQL耗时 **2秒**：  
```sql
SELECT * FROM order 
WHERE user_id = 1001 
ORDER BY create_time DESC 
LIMIT 1;
```

**分析与优化**：  
1. **执行计划分析**：  
   - `user_id` 索引未覆盖排序字段，需额外排序（`Using filesort`）。  

2. **优化方案**：  
   - **覆盖索引**：建立 `(user_id, create_time)` 联合索引，避免回表。  
   - **改写为JOIN**（适用于复杂子查询）：  
     ```sql
     SELECT o.* FROM order o 
     JOIN (
         SELECT user_id, MAX(create_time) AS max_time 
         FROM order 
         WHERE user_id = 1001 
         GROUP BY user_id
     ) tmp 
     ON o.user_id = tmp.user_id AND o.create_time = tmp.max_time;
     ```

3. **效果**：  
   - 查询耗时 **50ms**，`EXPLAIN` 显示 `Using index`。

---

### **总结：SQL优化核心思路**
1. **分析执行计划**：通过 `EXPLAIN` 或数据库监控工具定位瓶颈。  
2. **索引优化**：避免索引失效、使用覆盖索引、联合索引。  
3. **重写SQL**：减少子查询、改用JOIN、避免函数操作字段。  
4. **分库分表/分区**：对大数据量表进行水平或垂直拆分。  
5. **业务妥协**：与产品沟通需求（如限制分页深度、异步统计）。  
6. **事务与锁优化**：减少锁竞争、控制事务粒度。  

在面试中回答时，可以按 **“问题现象 → 分析过程 → 解决措施 → 量化效果”** 的结构展开，突出你的分析能力和实战经验。


## 自我介绍

```
面试官您好，我叫张华朋，是一名有6年Java开发经验的工程师，专注于后端开发和性能优化。在软件开发领域积累了丰富的实战经验，尤其是在大型SaaS系统和微服务架构方面。

在技术深度上，我对JVM内存模型和MySQL底层原理有深入研究。例如，在一个高并发订单系统中，我通过调整Eden区大小和优化垃圾回收策略，将Young GC频率降低了30%，显著提升了系统的稳定性。同时，我还通过添加复合索引和分库分表，将慢查询的响应时间从60秒优化到了3秒以内，解决了高峰期数据库压力过大的问题。

在项目经验方面，我曾参与了多个中大型项目，例如甄云SRM平台和中国银联财务共享系统。在这些项目中，我设计了多级缓存架构，降低了Redis压力60%；优化了多个慢SQL，提升了业务模块的响应速度；引入了分布式事务管理Seata，保证了订单模块的事务一致性；

除了技术能力，我也注重团队协作和业务价值。在需求分析和技术方案设计中，我始终认为，技术是为了服务于业务，以解决实际问题为目标，确保交付的系统能够真正满足客户需求。例如，在SRM系统中，我与产品经理和测试团队紧密合作，成功上线了一个智能推荐功能，帮助客户节省了30%的供应商筛选时间。

我对新技术充满热情，喜欢研究开源项目并学习其设计思想。未来，我希望能够在贵公司继续深耕技术领域，同时为团队和业务创造更大的价值。
```



## 计划

根据你的简历和职业目标，以下是针对进入中大型互联网公司的 **系统性复习计划**，涵盖技术深度、高频面试考点和实战能力提升，分为 **技术基础、框架与中间件、系统设计、算法、项目复盘、软技能** 六大模块，建议周期为 **6-8周**。

---

### **一、技术基础（2周）**
#### 1. **Java核心**
- **重点内容**：  
  - **JVM**：内存模型（堆、栈、元空间）、GC算法（G1/CMS/ZGC）、类加载机制、OOM排查工具（jmap/jstat/Arthas）。  
  - **多线程**：线程池原理（参数、拒绝策略）、锁机制（synchronized/AQS/ReentrantLock）、并发容器（ConcurrentHashMap原理、CopyOnWriteArrayList）。  
  - **新特性**：Lambda表达式、Stream API、CompletableFuture、模块化（JPMS）。  
- **高频题**：  
  - 如何排查线上Full GC问题？  
  - ConcurrentHashMap如何保证线程安全？  
  - ThreadLocal的内存泄漏问题如何解决？  
- **资源推荐**：  
  - 《深入理解Java虚拟机》  
  - 极客时间专栏《Java并发编程实战》  

#### 2. **数据库与SQL优化**
- **重点内容**：  
  - **索引优化**：B+树原理、联合索引、覆盖索引、索引失效场景。  
  - **事务与锁**：隔离级别（MVCC）、行锁/间隙锁、死锁排查（`SHOW ENGINE INNODB STATUS`）。  
  - **分库分表**：ShardingSphere实现、全局ID生成（雪花算法）。  
- **实战结合**：  
  - 复盘简历中的“SAAS供应商系统SQL优化”案例，总结优化方法论。  
- **高频题**：  
  - 如何设计一个支持高并发的订单表？  
  - 分库分表后如何实现跨库查询？  

---

### **二、框架与中间件（1.5周）**
#### 1. **Spring全家桶**
- **重点内容**：  
  - **Spring Boot**：自动配置原理（`@Conditional`）、启动流程、监控（Actuator）。  
  - **Spring Cloud**：服务发现（Nacos）、熔断降级（Sentinel）、网关（Spring Cloud Gateway）、分布式事务（Seata）。  
  - **源码**：Spring循环依赖解决、动态代理（JDK Proxy vs CGLIB）。  
- **高频题**：  
  - Spring Boot如何整合MyBatis？  
  - Seata的AT模式如何实现？  
  - Seata的Saga模式如何实现？

#### 2. **中间件**
- **Redis**：数据结构（ZSet跳表）、持久化（RDB/AOF）、集群（Cluster）、缓存击穿/穿透/雪崩解决方案。  
- **消息队列**：Kafka高吞吐原理（ISR机制）、RocketMQ事务消息。  
- **高频题**：  
  - Redis如何实现分布式锁？  
  - Kafka如何保证消息顺序性？  

---

### **三、系统设计（1.5周）**
#### 1. **分布式系统设计**
- **高频场景**：  
  - 设计秒杀系统（限流、库存扣减、热点数据隔离）。  
  - 设计微博Feed流（推拉结合、冷热数据分离）。  
- **方法论**：  
  - CAP理论、BASE理论、一致性算法（Raft/Paxos）。  
  - 分库分表策略（垂直拆分 vs 水平拆分）。  

#### 2. **高并发与高可用**
- **技术方案**：  
  - 多级缓存（本地缓存 + Redis）、读写分离、异步化（MQ削峰）。  
  - 熔断降级（Hystrix/Sentinel）、限流算法（令牌桶/漏桶）。  
- **实战结合**：  
  - 复盘简历中的“多级缓存架构设计”，量化优化效果（如降低数据库压力20%）。  

---

### **四、算法与数据结构（1周）**
- **重点内容**：  
  - **数据结构**：二叉树（遍历、平衡二叉树）、链表、堆、图（BFS/DFS）。  
  - **算法**：排序（快排、归并）、动态规划（背包问题）、贪心算法。  
- **刷题策略**：  
  - 每日3-5题（LeetCode热题HOT 100 + 剑指Offer）。  
  - 重点突破高频题（如LRU缓存、链表反转、二叉树层序遍历）。  
- **工具推荐**：  
  - LeetCode、《代码随想录》。  

---

### **五、项目复盘（1周）**
#### 1. **深度复盘SAAS供应商系统**
- **技术亮点**：  
  - 多级缓存架构设计（本地缓存 + Redis），结合简历中的“降低Redis压力60%”，准备数据支撑。  
  - 分布式事务（Seata）的实现细节，如何解决跨服务事务一致性问题。  
  - 规则引擎与适配器设计，如何通过配置化降低维护复杂度。  
- **STAR法则**：  
  - **Situation**：系统日均处理10w+业务数据，性能瓶颈明显。  
  - **Task**：优化查询SQL至3秒内，设计多级缓存。  
  - **Action**：引入Guava Cache + Redis，优化联合索引。  
  - **Result**：页面响应时间降低70%，数据库压力减少20%。  

#### 2. **其他项目梳理**
- **申程出行数据导入优化**：从60秒优化到3秒的技术细节（如批量插入、索引优化）。  
- **西门子医疗WMS项目**：技术选型（如为何选择RocketMQ）、环境搭建难点。  

---

### **六、软技能与行为面试（0.5周）**
#### 1. **行为问题**
- **高频问题**：  
  - “你遇到的最大技术挑战是什么？”  
  - “如何推动团队代码规范落地？”  
- **回答模板**：  
  - **挑战**：描述SAAS系统的分布式事务问题 → 引入Seata → 结果（事务成功率提升至99.9%）。  
  - **团队协作**：在汉得/钢银公司推动代码Review流程 → 代码缺陷率下降30%。  

#### 2. **职业规划**
- **短期**：深耕分布式架构与高并发场景，成为领域专家。  
- **长期**：向技术管理或架构师转型，主导技术决策。  

---

### **七、每日时间安排建议**
| 时间段       | 内容                          | 目标                                |
|--------------|-------------------------------|-----------------------------------|
| 早晨1小时    | 算法刷题（2道中等难度）       | 保持手感和思维敏捷度              |
| 午休30分钟   | 技术文章/源码解析（如Spring） | 积累底层原理知识                  |
| 晚上2小时    | 技术模块学习（如JVM/Redis）   | 系统化覆盖高频考点                |
| 周末全天     | 模拟面试 + 项目复盘           | 适应高压环境，查漏补缺            |

---

### **八、注意事项**
1. **避免广而不深**：对简历中的技术亮点（如Seata、多级缓存）务必吃透原理，能画图说明。  
2. **量化成果**：所有优化案例需用数据支撑（如“接口响应时间降低70%”）。  
3. **模拟面试**：找同行或使用Pramp等平台模拟技术面，针对反馈调整复习重点。  

通过以上计划，你可以系统化覆盖中大型互联网公司的面试要求，同时突出你的项目经验和实战能力。 **核心原则**：用技术深度 + 数据化结果证明你的价值！


## 计划2
根据你的最新简历和目标，以下是针对 **中大型互联网公司面试** 的深度复习计划，聚焦技术深度、项目亮点和系统设计能力，周期建议 **6-8周**，分模块系统化覆盖高频考点。

---

### **一、技术深度强化（3周）**
#### **1. Java底层与性能优化（重点）**
- **核心内容**：  
  - **JVM**：  
    - 内存模型（堆外内存、元空间优化）、G1/CMS/ZGC垃圾回收器对比、Full GC/OOM排查（Arthas实战）。  
    - 结合项目中的“多级缓存架构”，分析堆内存与本地缓存（Guava Cache）的交互关系。  
  - **多线程与并发**：  
    - 线程池调优（动态参数调整）、锁优化（锁消除、锁粗化）、AQS源码（ReentrantLock、CountDownLatch）。  
    - 结合项目中的“高并发订单处理”，分析如何通过线程池配置提升吞吐量。  
- **高频题**：  
  - 如何通过JVM参数优化G1垃圾回收器的停顿时间？  
  - 如何设计一个无锁化高并发计数器（LongAdder原理）？  

#### **2. 数据库与分布式事务（重点）**
- **核心内容**：  
  - **MySQL深度**：  
    - InnoDB索引优化（覆盖索引、索引下推）、事务隔离级别与锁机制（间隙锁、Next-Key Lock）、Online DDL原理。  
    - 结合简历中的“SQL优化至3秒内”，复盘B+树索引设计与执行计划分析。  
  - **分布式事务**：  
    - Seata AT模式源码（全局锁、undo_log表）、TCC模式与Saga模式对比、高并发下事务冲突解决方案。  
- **高频题**：  
  - 分库分表后如何实现分布式事务？  
  - 如何解决Seata在极端场景下的性能瓶颈？  

#### **3. 中间件与高并发架构**
- **核心内容**：  
  - **Redis**：  
    - 集群模式（Cluster分片、Gossip协议）、内存淘汰策略（LFU vs LRU）、持久化与主从同步优化。  
    - 结合项目中的“降低Redis压力60%”，分析本地缓存（Guava Cache）与Redis的缓存一致性方案。  
  - **RocketMQ**：  
    - 事务消息实现、顺序消息（MessageQueue选择策略）、堆积问题排查（监控+限流）。  
    - 结合项目中的“消息丢失解决方案”，设计消息可靠性投递架构。  
- **高频题**：  
  - Redis Cluster扩容期间如何保证数据一致性？  
  - RocketMQ如何实现消息重试与死信队列？  

---

### **二、框架与源码（2周）**
#### **1. Spring Cloud Alibaba生态**
- **核心内容**：  
  - **Nacos**：服务注册与发现源码（AP模型）、配置中心动态刷新原理。  
  - **Sentinel**：滑动时间窗口算法、熔断规则与热点参数限流实现。  
  - **Seata**：全局事务ID生成、分支事务注册与提交流程。  
- **高频题**：  
  - Nacos如何解决脑裂问题？  
  - Sentinel如何实现集群限流？  

#### **2. Spring Boot与MyBatis源码**
- **核心内容**：  
  - **Spring Boot自动配置**：`@Conditional`条件装配、SPI机制（`spring.factories`）。  
  - **MyBatis**：  
    - 一级缓存（SqlSession级别）与二级缓存（Mapper级别）的失效场景。  
    - 插件机制（Interceptor链）与动态SQL生成原理。  
- **高频题**：  
  - 如何自定义Spring Boot Starter？  
  - MyBatis如何防止SQL注入？  

---

### **三、系统设计（1.5周）**
#### **1. 高并发系统设计**
- **设计题**：  
  - **秒杀系统**：热点数据隔离（本地缓存+Redis）、库存扣减（Redis Lua原子操作）、限流（令牌桶+Sentinel）。  
  - **Feed流系统**：推拉结合模型（写扩散优化存储，读扩散优化查询）。  
- **方法论**：  
  - 结合项目中的“日均10w+数据处理”，设计分库分表策略（用户ID哈希 vs 时间范围）。  

#### **2. 分布式架构**
- **核心问题**：  
  - 数据一致性：最终一致性（MQ事务消息） vs 强一致性（Paxos/Raft）。  
  - 服务治理：服务网格（Istio）与Sidecar模式、分布式链路追踪（SkyWalking）。  
- **高频题**：  
  - 如何设计一个支持千万级用户的IM系统？  
  - 微服务拆分的原则是什么？（领域驱动设计DDD）  

---

### **四、项目复盘与亮点包装（1周）**
#### **1. SAAS供应商系统（核心案例）**
- **技术亮点**：  
  - **多级缓存架构**：本地缓存（Guava Cache）与Redis的协同策略，缓存穿透（布隆过滤器）与雪崩（随机过期时间）解决方案。  
  - **分布式事务**：Seata AT模式下的事务回滚日志（undo_log）设计，如何解决跨服务事务悬挂问题。  
  - **规则引擎**：Groovy脚本动态加载与沙箱安全控制，配置化降低代码冗余。  
- **数据支撑**：  
  - 页面响应时间从1分钟优化至3秒，数据库压力降低20%（监控图表辅助说明）。  

#### **2. 其他项目**
- **申程出行数据导入优化**：  
  - 技术细节：批量插入（`batchUpdate`）、索引临时禁用、事务分批提交。  
  - 成果：20万数据导入从60秒优化至3秒（对比测试数据）。  
- **西门子WMS系统**：  
  - 技术选型：RocketMQ保证出库入库消息顺序性，库存扣减的幂等性设计。  

---

### **五、算法与编码能力（1周）**
- **刷题重点**：  
  - **高频题型**：链表（反转、环检测）、二叉树（遍历、最近公共祖先）、动态规划（背包、子序列）。  
  - **大厂真题**：LeetCode热题HOT 100、剑指Offer。  
- **编码规范**：  
  - 结合简历中“严格代码规范”，准备代码Review案例（如通过Checkstyle提升代码可读性）。  

---

### **六、软技能与行为面试（0.5周）**
#### **1. 行为问题**
- **高频问题**：  
  - “你如何推动团队技术升级？” → 回答模板：在SAAS项目中引入规则引擎，减少代码冗余，提升配置效率。  
  - “你最大的技术失误是什么？” → 回答模板：分布式事务初期未考虑悬挂问题，通过日志补偿机制修复。  

#### **2. 职业规划**
- **短期**：深耕高并发与分布式架构，成为团队核心架构师。  
- **长期**：主导亿级用户系统设计，推动技术产品化。  

---

### **七、每日学习计划**
| 时间段       | 内容                          | 目标                                |
|--------------|-------------------------------|-----------------------------------|
| 早晨1小时    | 算法刷题（2道困难+1道中等）   | 提升复杂问题解决能力              |
| 午休30分钟   | 技术源码解析（如Seata AT模式）| 深入理解分布式事务实现            |
| 晚上2小时    | 系统设计案例+项目复盘         | 强化架构思维与表达能力            |
| 周末全天     | 全真模拟面试（技术+行为面）   | 适应高压环境，查漏补缺            |

---

### **八、面试冲刺策略**
1. **简历技术点深挖**：确保每个技术亮点（如“降低Redis压力60%”）能展开3层技术细节。  
2. **模拟面试**：寻找大厂背景的同行模拟，重点关注系统设计环节的互动讨论。  
3. **差异化竞争力**：突出“复杂系统落地经验” + “底层源码研究能力”，区别于普通开发者。  

---

通过此计划，你不仅能覆盖大厂面试的常规考点，还能通过 **技术深度** 和 **项目亮点** 脱颖而出。**核心原则**：用源码级理解 + 数据化成果证明你的技术价值！


## 场景题


### 业务场景：SRM系统中供应商评分计算的异步任务丢失之谜

#### 场景背景
在供应商关系管理系统（SRM）的供应商管理模块中，有一个核心功能——供应商评分计算。这个功能需要根据多个绩效指标（如交货准时率、质量合格率、价格竞争力等），为数百家供应商（例如800条记录）计算评分。由于每次计算涉及大量数据，如果采用同步处理，用户可能需要等待数分钟才能看到结果，这显然会影响体验。

为了解决这个问题，开发同事设计了一个异步处理方案：通过Spring的`@Async`注解，将评分计算任务交给一个线程池来执行。线程池的配置如下：
- **核心线程数**：5
- **最大线程数**：10
- **阻塞队列容量**：100
- **拒绝策略**：`DiscardPolicy`（超出队列的任务直接被丢弃）

这样的设计初衷是让用户提交评分计算请求后，界面能立即返回响应，后台异步完成计算，看起来“很快”。

#### 问题浮现
系统上线后，用户却发现评分计算结果并不完整。例如，一次计算800家供应商的评分，最终只有100条记录的评分被成功更新，而其余700条评分要么保持不变，要么压根没有计算。更让人头疼的是，系统日志中没有任何错误或异常提示，任务似乎“凭空消失”了。这种“静默失败”的现象让问题排查变得异常困难。

开发团队花了大量时间尝试定位问题，起初怀疑是数据库查询超时、评分计算逻辑错误，甚至是并发导致的数据覆盖，但逐一排查后都未发现异常。最终，通过深入分析线程池的行为，才揭开了问题的真相。

#### 问题根源分析
问题的核心在于线程池的配置和拒绝策略设计不当，具体分析如下：

1. **线程池容量不足**  
   线程池最多能同时处理10个任务（最大线程数），当任务超过10个时，多余的任务会被放入阻塞队列（容量100）。对于800个任务，线程池最多能接纳110个任务（10个执行中 + 100个等待）。剩余的690个任务（800 - 110）超出了线程池的处理能力。

2. **拒绝策略的“静默杀手”**  
   配置的`DiscardPolicy`拒绝策略有个致命特点：当任务超出队列容量时，它不会抛出异常，也不会记录日志，而是直接丢弃多余的任务。这解释了为什么只有100条数据被处理（实际上是110条，但可能有其他细微因素影响），其余任务无声无息地消失。

3. **异步无监控**  
   由于任务是异步提交的，且没有任务执行状态的反馈机制，开发团队无法实时感知任务是否成功完成，进一步掩盖了问题。

#### 问题代码示例
以下是问题代码的简化版本，清晰展示了当时的实现：
```java
@Configuration
public class ThreadPoolConfig {
    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);        // 核心线程数
        executor.setMaxPoolSize(10);        // 最大线程数
        executor.setQueueCapacity(100);     // 队列容量
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardPolicy()); // 拒绝策略
        executor.initialize();
        return executor;
    }
}

@Service
public class SupplierScoringService {
    @Async("taskExecutor")
    public void calculateSupplierScore(Long supplierId) {
        // 模拟评分计算逻辑
        Supplier supplier = supplierRepository.findById(supplierId);
        double score = computeScore(supplier); // 计算评分
        supplier.setScore(score);
        supplierRepository.save(supplier);
    }
}

@RestController
public class ScoringController {
    @Autowired
    private SupplierScoringService scoringService;

    @PostMapping("/calculateScores")
    public String triggerScoring() {
        List<Long> supplierIds = getAllSupplierIds(); // 假设返回800个ID
        for (Long supplierId : supplierIds) {
            scoringService.calculateSupplierScore(supplierId); // 异步提交任务
        }
        return "评分计算已提交";
    }
}
```
在这段代码中，`triggerScoring`一次性提交了800个任务，但由于线程池的限制，只有前110个任务被接受，其余任务被`DiscardPolicy`静默抛弃。

#### 解决方案
为了彻底解决问题，团队采取了以下改进措施：

1. **更换拒绝策略**  
   将`DiscardPolicy`改为`CallerRunsPolicy`，让超出队列的任务在调用者线程中执行，确保任务不会被丢弃：
   ```java
   executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
   ```

2. **任务执行监控**  
   使用`CompletableFuture`包装异步任务，增加任务执行状态的跟踪和异常日志：
   ```java
   @Async("taskExecutor")
   public CompletableFuture<Void> calculateSupplierScore(Long supplierId) {
       try {
           Supplier supplier = supplierRepository.findById(supplierId);
           double score = computeScore(supplier);
           supplier.setScore(score);
           supplierRepository.save(supplier);
           return CompletableFuture.completedFuture(null);
       } catch (Exception e) {
           log.error("供应商ID {} 评分计算失败", supplierId, e);
           return CompletableFuture.failedFuture(e);
       }
   }
   ```

3. **任务分批提交**  
   将800个任务分批处理，每次提交100个，避免瞬间压垮线程池：
   ```java
   @PostMapping("/calculateScores")
   public String triggerScoring() {
       List<Long> supplierIds = getAllSupplierIds();
       int batchSize = 100;
       for (int i = 0; i < supplierIds.size(); i += batchSize) {
           List<Long> batch = supplierIds.subList(i, Math.min(i + batchSize, supplierIds.size()));
           for (Long supplierId : batch) {
               scoringService.calculateSupplierScore(supplierId);
           }
       }
       return "评分计算已提交";
   }
   ```

4. **线程池调优**  
   根据实际业务负载，适当增加核心线程数和队列容量，并结合服务器资源进行压力测试，找到最优配置。

#### 排查过程亮点
- **线程池状态监控**：通过Spring Boot Actuator暴露线程池指标，观察到任务提交后队列迅速填满，活跃线程数始终停留在10。
- **日志增强**：在任务提交和执行的关键点添加日志，发现大部分任务未被执行。
- **代码审计**：聚焦线程池配置，最终锁定`DiscardPolicy`为罪魁祸首。

#### 总结与反思
这个案例暴露了异步任务处理中的一个典型陷阱：线程池拒绝策略的配置不当可能导致任务无声丢失，而缺乏监控机制则让问题难以察觉。通过调整拒绝策略、优化任务提交方式并引入执行监控，我们不仅解决了评分计算不完整的问题，还提升了系统的可靠性和可维护性。这也提醒我们，在使用异步任务时，合理的线程池配置和任务状态管理至关重要。

--- 

希望这个补全的场景描述符合你的预期，既高级又清晰地展示了问题和解决方案！如果有其他需求，可以随时告诉我。