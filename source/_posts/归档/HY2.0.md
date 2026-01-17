---
title: hy2.0
hidden: false
---


```json
{

"id": "file-fe-WvEu6lBm7ZXNURS1wwgZwZ5n",

"object": "file",

"bytes": 53409,

"created_at": 1739612338,

"filename": "1，招标文件审查-建造师执业范围2024-8-3.xlsx",

"purpose": "file-extract",

"status": "processed"

}
```

```json
{

"id": "file-fe-VUFvRDmAlHHsSmiea1PTSo7F",

"object": "file",

"bytes": 18695,

"created_at": 1739614282,

"filename": "1，招标文件审查-施工总承包序列资质标准最终2024-8-3.xlsx",

"purpose": "file-extract",

"status": "processed"

}
```


```json
{

"id": "file-fe-3iPw2e1wP03HQiEDWooGWNQW",

"object": "file",

"bytes": 4305676,

"created_at": 1739612549,

"filename": "徽州区富溪乡水毁桥梁及护岸修复工程.pdf",

"purpose": "file-extract",

"status": "processed"

}
```


#### word 分段落替换  https://deepoove.com/poi-tl/

## Flask Python 服务器部署


### 1. 准备服务器

首先，你需要一个可以运行 Python 的服务器。你可以使用以下服务：

- **云服务提供商**：如 AWS、阿里云、DigitalOcean 等。
- **VPS 提供商**：如 Linode、Vultr 等。

确保服务器上安装了 Python 和 pip。

### 2. 连接到服务器

使用 SSH 连接到你的服务器：

`ssh username@your_server_ip`

### 3. 安装依赖

在服务器上，确保你已经安装了 Python 和 pip。你可以使用以下命令检查：

`python3 --version pip3 --version`

如果没有安装，可以使用以下命令安装：

`sudo apt update sudo apt install python3 python3-pip`

### 4. 上传代码

将你的 Flask 应用代码上传到服务器。可以使用 SCP、FTP 或 Git 来上传文件。下面是使用 SCP 的示例：

`scp -r /path/to/your/project username@your_server_ip:/path/to/target/directory`

### 5. 创建虚拟环境

在你的项目目录中创建一个虚拟环境：

`cd /path/to/target/directory python3 -m venv venv source venv/bin/activate`

### 6. 安装项目依赖

在虚拟环境中安装你的项目依赖：

`pip install -r requirements.txt`

### 7. 运行 Flask 应用

在开发环境中，你可以使用以下命令运行 Flask 应用：

`python app.py`

但是在生产环境中，最好使用 WSGI 服务器（如 Gunicorn）来运行 Flask 应用：

`pip install gunicorn gunicorn -w 4 app:app --bind 0.0.0.0:5000`

这里 `-w 4` 表示使用 4 个工作进程，你可以根据需要调整。

### 8. 配置反向代理（可选）

为了在 80 或 443 端口上提供服务，建议使用 Nginx 作为反向代理：

#### 安装 Nginx

`sudo apt install nginx`

#### 配置 Nginx

创建一个新的 Nginx 配置文件，例如 `/etc/nginx/sites-available/my_flask_app`：

nginx

复制代码

`server {     listen 80;     server_name your_server_ip;  # 或者你的域名      location / {         proxy_pass http://127.0.0.1:5000;  # Flask 应用的地址         proxy_set_header Host $host;         proxy_set_header X-Real-IP $remote_addr;         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;         proxy_set_header X-Forwarded-Proto $scheme;     } }`

创建符号链接到 `sites-enabled`：

`sudo ln -s /etc/nginx/sites-available/my_flask_app /etc/nginx/sites-enabled`

测试 Nginx 配置并重启服务：

`sudo nginx -t sudo systemctl restart nginx`

### 9. 配置防火墙（可选）

确保服务器的防火墙允许 HTTP 和 HTTPS 流量：

`sudo ufw allow 'Nginx Full'`

### 10. 访问你的应用

现在，你应该能够通过浏览器访问你的 Flask 应用，使用服务器的 IP 地址或域名。

### 额外建议

- **使用 HTTPS**：在生产环境中，强烈建议使用 HTTPS。可以使用 Let’s Encrypt 来免费申请 SSL 证书。
- **监控和日志**：考虑使用工具来监控应用的性能和日志，以便及时发现问题。


## python

好的，这里是一个详细的Python方案，包括登录页面、选择文件夹、处理PDF文件并将数据存储到SQLite数据库，以及在线更新功能。

### 1. 环境配置和库安装

```bash
pip install PyInstaller PyUpdater PyPDF2 pdfminer.six pymupdf tkinter requests
```

### 2. 登录页面和主程序逻辑

#### 2.1. 创建登录界面

创建一个文件 `login.py` 用于实现登录界面：

```python
import tkinter as tk
from tkinter import messagebox
import requests

class LoginApp:
    def __init__(self, root):
        self.root = root
        self.root.title("登录")
        self.root.geometry("300x150")

        self.username_label = tk.Label(root, text="用户名")
        self.username_label.pack()
        self.username_entry = tk.Entry(root)
        self.username_entry.pack()

        self.password_label = tk.Label(root, text="密码")
        self.password_label.pack()
        self.password_entry = tk.Entry(root, show="*")
        self.password_entry.pack()

        self.login_button = tk.Button(root, text="登录", command=self.login)
        self.login_button.pack()

    def login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        # 假设存在一个登录接口
        login_url = "http://example.com/api/login"
        response = requests.post(login_url, json={"username": username, "password": password})

        if response.status_code == 200 and response.json().get("status") == "success":
            messagebox.showinfo("成功", "登录成功")
            self.root.destroy()
            import main
            main.run_app()
        else:
            messagebox.showerror("错误", "用户名或密码错误")

def run_login_app():
    root = tk.Tk()
    app = LoginApp(root)
    root.mainloop()
```

#### 2.2. 主程序逻辑

创建 `main.py` 实现主程序逻辑：

```python
import os
import fitz  # PyMuPDF
import sqlite3
import tkinter as tk
from tkinter import filedialog, messagebox

def select_folder():
    folder_path = filedialog.askdirectory(title="选择包含PDF文件的文件夹")
    return folder_path

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def store_data_to_db(data):
    conn = sqlite3.connect('extracted_data.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS pdf_data
                      (id INTEGER PRIMARY KEY, file_name TEXT, content TEXT)''')
    cursor.execute('INSERT INTO pdf_data (file_name, content) VALUES (?, ?)', data)
    conn.commit()
    conn.close()

def process_pdfs(folder_path):
    for file_name in os.listdir(folder_path):
        if file_name.endswith('.pdf'):
            pdf_path = os.path.join(folder_path, file_name)
            text = extract_text_from_pdf(pdf_path)
            store_data_to_db((file_name, text))
            messagebox.showinfo("处理完成", f"文件 {file_name} 处理完成")

def run_app():
    root = tk.Tk()
    root.withdraw()
    folder_path = select_folder()
    if folder_path:
        process_pdfs(folder_path)
    else:
        messagebox.showinfo("提示", "没有选择文件夹")

if __name__ == "__main__":
    run_login_app()
```

#### 2.3. 在线更新功能

创建 `client_config.py` 配置PyUpdater：

```python
import os
from pyupdater.client import Client

APP_NAME = "PDFExtractorApp"
APP_VERSION = "0.1.0"
UPDATE_URLS = ['http://your-update-server.com/']

class ClientConfig:
    PUBLIC_KEY = "your-public-key"
    APP_NAME = APP_NAME
    COMPANY_NAME = "YourCompany"
    UPDATE_URLS = UPDATE_URLS
    MAX_DOWNLOAD_RETRIES = 3
    USE_PATCHES = True

def check_for_updates():
    client = Client(ClientConfig(), refresh=True)
    app_update = client.update_check(ClientConfig.APP_NAME, ClientConfig.APP_VERSION)
    if app_update is not None:
        app_update.download()
        if app_update.is_downloaded():
            app_update.extract_restart()
```

在 `main.py` 的 `run_app` 函数中加入更新检查：

```python
def run_app():
    from client_config import check_for_updates
    check_for_updates()

    root = tk.Tk()
    root.withdraw()
    folder_path = select_folder()
    if folder_path:
        process_pdfs(folder_path)
    else:
        messagebox.showinfo("提示", "没有选择文件夹")
```

#### 2.4. 打包应用程序

创建一个 `spec` 文件来配置打包设置（`your_script.spec`）：

```spec
# your_script.spec
# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(['main.py'],
             pathex=[],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)

pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='PDFExtractorApp',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False)

coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='PDFExtractorApp')
```

然后使用 `pyinstaller` 打包：

```bash
pyinstaller your_script.spec
```

### 3. 配置和初始化PyUpdater

```bash
pyupdater init
pyupdater pkg --process
pyupdater pkg --sign
pyupdater pkg --upload
pyupdater keys --create
pyupdater settings
```

### 4. 部署和测试

将生成的可执行文件和更新配置上传到你的服务器。然后运行打包好的应用程序，确保登录功能、PDF处理功能和在线更新功能都正常工作。

这样，你就有了一个带有登录功能的Windows应用程序，可以选择文件夹中的PDF文件进行处理，并支持在线更新。



## 要读取多个Excel文件并两两判断它们之间是否存在高度重复的数据，可以按以下步骤进行

：

1. **读取所有Excel文件**。
2. **提取并整理数据**。
3. **比较每对Excel文件的数据**。
4. **计算重复率**。
5. **输出比较结果**。

可以使用 `pandas` 库来处理Excel文件，利用 `pandas` 的 DataFrame 结构进行数据比较和重复率计算。

### 1. 安装必要的库

首先，确保你已经安装了 `pandas` 和 `openpyxl` 库：

bash

复制代码

`pip install pandas openpyxl`

### 2. 读取所有Excel文件

使用 `pandas` 读取Excel文件，并提取数据。

python

复制代码

`import os import pandas as pd  def read_excel_files(folder_path):     excel_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.xlsx')]     dataframes = {f: pd.read_excel(f) for f in excel_files}     return dataframes  folder_path = 'your_folder_with_excel_files' dataframes = read_excel_files(folder_path)`

### 3. 比较每对Excel文件的数据

定义一个函数来比较两个DataFrame，计算重复率。

python

复制代码

`def calculate_similarity(df1, df2):     # 确保两者都有相同的列     common_columns = df1.columns.intersection(df2.columns)     if len(common_columns) == 0:         return 0.0          # 选择共同的列进行比较     df1_common = df1[common_columns]     df2_common = df2[common_columns]          # 合并两个数据集，保留重复项     combined = pd.concat([df1_common, df2_common])     duplicates = combined.duplicated(keep=False)          # 计算重复率     similarity = duplicates.sum() / len(combined)     return similarity  def compare_excel_files(dataframes):     results = []     files = list(dataframes.keys())     for i in range(len(files)):         for j in range(i + 1, len(files)):             df1 = dataframes[files[i]]             df2 = dataframes[files[j]]             similarity = calculate_similarity(df1, df2)             results.append((files[i], files[j], similarity))     return results  similarity_results = compare_excel_files(dataframes)`

### 4. 输出比较结果

将比较结果输出，显示每对Excel文件的相似度。

python

复制代码

`for file1, file2, similarity in similarity_results:     print(f"文件 {file1} 和文件 {file2} 的相似度为: {similarity:.2%}")`

### 完整代码

python

复制代码

`import os import pandas as pd  def read_excel_files(folder_path):     excel_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.xlsx')]     dataframes = {f: pd.read_excel(f) for f in excel_files}     return dataframes  def calculate_similarity(df1, df2):     common_columns = df1.columns.intersection(df2.columns)     if len(common_columns) == 0:         return 0.0          df1_common = df1[common_columns]     df2_common = df2[common_columns]          combined = pd.concat([df1_common, df2_common])     duplicates = combined.duplicated(keep=False)          similarity = duplicates.sum() / len(combined)     return similarity  def compare_excel_files(dataframes):     results = []     files = list(dataframes.keys())     for i in range(len(files)):         for j in range(i + 1, len(files)):             df1 = dataframes[files[i]]             df2 = dataframes[files[j]]             similarity = calculate_similarity(df1, df2)             results.append((files[i], files[j], similarity))     return results  folder_path = 'your_folder_with_excel_files' dataframes = read_excel_files(folder_path) similarity_results = compare_excel_files(dataframes)  for file1, file2, similarity in similarity_results:     print(f"文件 {file1} 和文件 {file2} 的相似度为: {similarity:.2%}")`

### 注意事项

- **列对齐**：确保所有比较的数据具有相同的列。
- **数据清理**：在实际使用中，可能需要对数据进行清理和预处理，以确保比较的准确性。
- **优化**：对于大型数据集，计算重复率可能会很耗时。可以考虑优化算法或使用更高效的数据结构。

通过这些步骤，你可以实现读取多个Excel文件并两两判断是否有高度重复的数据，并计算和输出相似度。








## 审查



### 复杂规则

#### 1. 方案

每次执行规则，查数据或者把全部数据缓存每次进行匹配，不太友好。

项目启动时，查询范围和资质表，然后处理成对象存到缓存：

```json
{
    "一级建造师-工业、民用与公共建筑工程": {
        "builderName": "一级建造师",
        "projectName": "工业、民用与公共建筑工程",
        "workType": "一般房屋建筑工程",
        "uom": "金额",// 后面看是不是换成编码
        "firstLevelMin": "3000",
        "firstLevelMax": "",
        "secondLevelMax": "3000",
        "secondLevelMin": "300",
        "thirdLevelMax": "300",
        "thirdLevelMin": "0"
    }
}
```

后面执行规则的时候，只需要按照特性字段从缓存中取，就可以了。

这样只需要处理一遍范围、资质的数据。

#### 2. 具体实现

使用本地缓存Caffeine、根据数据库创建实体类、Mapper、

创建一个 Caffeine 缓存配置类，并在 Spring Boot 启动时加载规则。

```java
@Configuration
@EnableCaching
public class CaffeineCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new CaffeineCacheManager();
    }
}

```

在 Spring Boot 启动时加载规则并缓存:

```java 
@Component
public class RuleLoader {

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private CacheManager cacheManager;

    @PostConstruct
    public void loadRulesToCache() {
        // 从数据库加载资质数据
        List<ArchitectScope> qualifications = commonMapper.findAll();
        Map<String, ArchitectScope> qualificationCache = new HashMap<>();
        // 根据特性值分组
        // 提取特性值、合同金额
        // 处理成map，map的key就是建造师名称+类型||资质那里比较特殊，需要存双份，一份key值是资质名称，一份是建造师专业

        // 将加载的规则数据放入 Caffeine 缓存
        cacheManager.getCache("qualificationCache").put("qualification", qualificationCache);

        System.out.println("Rules loaded into Caffeine cache.");
    }
}

```

使用缓存：

```java
public ArchitectScope getQualificationFromCache(String qualificationName) { Map<String, ArchitectScope> qualificationCache = (Map<String, ArchitectScope>) cacheManager.getCache("qualificationCache").get("qualification").get(); return qualificationCache.get(qualificationName); }
```






## 功能设计文档

### 页面及流程

#### 第一页：采购方式及适用范围展示

1. **功能描述**：
    
    - 提供一个下拉框（请选择采购方式），用户选择后展示相关文本。
    - 用户选择下拉框后，触发接口查询数据，返回的数据以只读形式展示。
    - 页面底部提供“下一页”按钮，参考工程造价页面，点击后进入第二页。
    
2. **变量定义**：
    
    - 下拉框选项：`dropdown_options`
    - 查询接口返回数据：`query_data`

#### 第二页：文件上传与数据提取

1. **功能描述**：
    
    - 页面顶部提供一个上传按钮，支持上传文件夹或多选文件。
    - 触发后端接口，上传文件并提取招标公告和项目信息，提取后的信息存入数据库表。
    - 页面展示提取的项目信息，用户可修改，修改后的数据以文本格式存储。
    - 页面底部提供“执行”按钮，点击后进入第三页。
2. **变量定义**：
    
    - 上传文件的URL：`uploaded_file_urls`
    - 提取的项目信息：`project_info`
    - 提取的招标公告内容：`tender_notice`
    - 修改后的项目信息：`modified_project_info`

#### 第三页：异步执行

1. **功能描述**：
    - 展示固定文本："异步执行中，请稍后在历史记录中查看。"

### 数据表结构

#### 项目信息表（`project_info`）

```sql
CREATE TABLE project_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    project_name VARCHAR(255) NOT NULL COMMENT '项目名称',
    agency VARCHAR(255) COMMENT '代理机构',
    bidder VARCHAR(255) COMMENT '招标人',
    section_code VARCHAR(50) COMMENT '标段编码',
    location VARCHAR(255) COMMENT '建设地点',
    estimated_cost DECIMAL(18, 2) COMMENT '合同估算价',
    duration VARCHAR(50) COMMENT '计划工期',
    project_category VARCHAR(100) COMMENT '项目类别',
    qualification_field VARCHAR(100) COMMENT '资质专业',
    qualification_level VARCHAR(100) COMMENT '资质级别',
    manager_field VARCHAR(100) COMMENT '项目经理专业',
    manager_level VARCHAR(100) COMMENT '项目经理级别',
    performance_req BOOLEAN COMMENT '业绩要求（有或无）',
    manager_perf_req BOOLEAN COMMENT '项目经理业绩要求（有或无）',
    financial_req BOOLEAN COMMENT '财务要求（有或无）',
    doc_acquire_time DATETIME COMMENT '招标文件获取时间',
    bid_opening_time DATETIME COMMENT '开标时间',
    evaluation_method VARCHAR(100) COMMENT '评标办法（综合评估法或最低价法）',
    modified_info TEXT COMMENT '页面修改后的项目信息',
    tender_doc_urls TEXT COMMENT '招标文件URL（可能是多个）'
) COMMENT='项目信息表';
```

### 上传功能详细流程

1. **用户操作**：
    
    - 用户选择文件或文件夹。
    - 前端调用接口上传文件，返回文件URL列表`uploaded_file_urls`。
2. **后端处理**：
    
    - 提取文件中的项目信息和招标公告内容。
    - 提取的项目信息字段包括：
        - `project_name`
        - `agency`
        - `bidder`
        - `section_code`
        - `location`
        - `estimated_cost`
        - `duration`
        - `project_category`
        - `qualification_field`
        - `qualification_level`
        - `manager_field`
        - `manager_level`
        - `performance_req`
        - `manager_perf_req`
        - `financial_req`
        - `doc_acquire_time`
        - `bid_opening_time`
        - `evaluation_method`
    - 如果提取到的项目名称存在于缓存中，则直接返回缓存数据；否则：
        - 从文件中提取招标公告及招标文件的段落内容。
        - 将提取结果存入缓存（超时时间30分钟）。
3. **前端展示**：
    
    - 接收返回的`project_info`并展示。
    - 用户可修改项目信息，修改结果存入`modified_project_info`。

### 执行功能详细流程

1. **数据准备**：
    
    - 接收前端传递的`modified_project_info`，存入数据库。
    - 从缓存中获取：
        - 建筑师职业范围和资质。
        - 审查规则数据（若缓存不存在则查询数据库并存入缓存）。
        - 招标公告和招标文件段落内容。
    - 如果缓存缺失必要数据，向用户提示重新上传。
2. **规则处理**：
    
    - 简单规则：统一循环处理，生成结果对象，包括：
        - 规则编码：`rule_code`
        - 取证单位名称：`evidence_unit`
        - 存在问题：`issues`
        - 评审建议：`review_suggestions`
        - 页码：`page_numbers`
        - 段落内容：`paragraphs`
    - 复杂规则：单独处理，生成结果对象。
3. **报告生成**：
    
    - 获取最新模板：调用`queryLatest`方法。
    - 根据规则处理结果，循环生成审计单，填充审计报告。
    - 将生成的审计单和报告打包，生成下载链接，并插入记录表。

### 接口参考

- 文件上传：`net.lab1024.smartadmin.module.business.bidDocAudit.service.AudiReportTplHistoryService#upload`
- 获取最新模板：`net.lab1024.smartadmin.module.business.bidDocAudit.service.AudiReportTplHistoryService#queryLatest`



## APACHE-OPENNLP


### 安装

#### Mac安装

```sh
brew install apache-opennlp
```

安装后，执行 `opennlp`看是否有返回help信息


### 标准 & 训练



标注数据是指将文本中的特定部分（实体）标记为自定义标签。标注格式通常是 **每行一个词**，并且每个词都有一个与之相关的标签。

##### 1.1 标注规则

- **B-**：表示实体的开始（Begin）。
- **I-**：表示实体的内部部分（Inside）。
- **O**：表示该词不属于任何命名实体（Outside）。

**示例**： 假设你有以下招标文件内容：

`XX建筑工程，合同金额为200万元，要求具有二级建筑资质。`

标注后的内容可能如下：

```
XX建筑工程，合同金额为200万元，要求具有二级建筑资质。
```

在这个例子中：

```
XX B-PROJECT_NAME
建筑工程 I-PROJECT_NAME
， O
合同 O
金额 O
为 O
200万元 B-AMOUNT
， O
要求 O
具有 O
二级 B-QUALIFICATION
建筑资质 I-QUALIFICATION
。 O

```

##### 自动标注

人工标注效率太低，标注数据需要大量案例，人工标注并不现实，推荐使用工具。

###### Label Studio

**Label Studio** 是一个开源的标注工具，支持文本标注、图片标注、音频标注等多种类型。它具有灵活的配置选项，可以根据需求配置标注任务，并且支持与机器学习模型结合来加速标注过程。

- **特点**：
    
    - **开源免费**，适合小团队使用。
    - 支持 **命名实体识别（NER）** 标注。
    - 支持多种数据格式的导入和导出，包括 JSON 和 CSV。
    - 能够与 **模型** 结合，进行 **自动标注** 和 **人工修正**。
    - 对中文支持较好。
- **使用场景**：
    
    - 适合进行大规模的标注任务，尤其是需要标注结构化文本（如招标公告）的任务。
- **官网**：[Label Studio](https://labelstud.io/)
    
- **优点**：
    
    - 完全免费且开源。
    - 支持多种标注任务。
    - 可配置和灵活的工作流。
- **缺点**：
    
    - 比 Prodi.gy 的界面稍显简单。
    - 可能需要一些技术配置和部署。




### 使用


```sh
MacBookPro :: work_space/HY_work_space/nlp % opennlp TokenNameFinderTrainer -lang zh -model zh-model-bid-project-info.bin -data ner.txt -encoding UTF-8
```


- `ner.txt` 是你刚才标注好的数据文件。
- `zh-model-bid-project-info.bin` 是你训练好的模型文件的输出路径。
- `zh` 是语言设置，虽然 OpenNLP 主要提供英语模型，但它也支持其他语言（包括中文）。

```java
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.tokenize.SimpleTokenizer;
import opennlp.tools.util.Span;
import opennlp.tools.util.model.FileInputStream;

import java.io.IOException;

public class OpenNLPExample {
    public static void main(String[] args) throws IOException {
        // 加载训练好的NER模型
        FileInputStream modelIn = new FileInputStream("en-ner-custom.bin"); // 使用你训练的模型
        NameFinderME nameFinder = new NameFinderME(new TokenNameFinderModel(modelIn));

        // 输入招标文件的内容
        String text = "XX建筑工程，合同金额200万元，要求具有二级建筑资质。";
        String[] tokens = SimpleTokenizer.INSTANCE.tokenize(text);

        // 查找文本中的实体
        Span[] nameSpans = nameFinder.find(tokens);
        for (Span span : nameSpans) {
            System.out.println("实体: " + tokens[span.getStart()] + " 到 " + tokens[span.getEnd() - 1]);
        }
    }
}

```


## LTP

### 1. **检查 LTP 模型文件是否正确**

LTP 在加载模型时可能会遇到问题，特别是如果模型文件路径不正确或者模型文件损坏。LTP 默认会加载一些预训练的中文模型，如果没有正确加载，程序会卡住。

首先，确保你的 LTP 模型文件已正确安装和加载。通常，LTP 会自动下载并缓存这些模型，但如果出错，可能会导致程序挂起。

尝试手动下载 LTP 模型文件：

1. **下载 LTP 模型**：
    
    - 你可以访问 [LTP 官方 GitHub](https://github.com/HIT-SCIR/ltp) 或其他提供的下载链接，获取 LTP 模型。
    - 下载模型后，将它们解压到本地文件夹。
2. **设置模型路径**：
    
    - 你可以手动设置模型路径，确保 LTP 使用的是正确的模型文件。

python

复制代码

`from ltp import LTP  # 设置模型路径 ltp = LTP()  # 可以尝试通过以下方式手动加载模型 ltp.load('path_to_your_model')  # 替换为实际模型路径`

### 2. **检查 LTP 的安装方式**

LTP 有多个安装方式（如 `pyltp` 或 `ltp`），这可能会影响模型加载。你可以尝试使用 `pyltp`，这是 LTP 的原生 Python 接口，通常支持更好的稳定性。

尝试以下步骤：

bash

复制代码

`pip install pyltp`

然后使用 `pyltp` 进行模型加载和处理。

python

复制代码

`from pyltp import Segmentor, NamedEntityRecognizer  # 初始化分词器和命名实体识别器 segmentor = Segmentor() recognizer = NamedEntityRecognizer()  # 加载模型路径 segmentor.load('path_to_your_model/cws.model')  # 分词模型 recognizer.load('path_to_your_model/ner.model')  # 命名实体识别模型  # 测试文本 text = "阜阳市城南新区华信路道路及附属工程施工招标公告（电子招标）"  # 分词 words = segmentor.segment(text) print("Words:", '\t'.join(words))  # 命名实体识别 named_entities = recognizer.recognize(words, [0]*len(words))  # 这里的[0]*len(words)只是一个例子，实际可以传递真实的句法分析结果 print("Named Entities:", '\t'.join(named_entities))`

### 3. **调试模型加载过程**

为了更深入地理解问题，可以在加载模型时添加更多的调试信息，看看是否能够找出问题所在。

python

复制代码

`from ltp import LTP  print("Initializing LTP...")  try:     ltp = LTP()     print("LTP initialized.") except Exception as e:     print(f"Error initializing LTP: {e}")`

### 4. **检查是否有资源耗尽**

在一些低配置的机器或内存较小的环境中，LTP 初始化时可能会耗尽资源，导致卡住。可以查看你的系统资源（如 CPU 和内存）使用情况，检查是否有异常。

### 5. **模型文件路径权限问题**

确保 LTP 模型文件有正确的读取权限。有时，路径问题或者权限问题会导致 LTP 卡住。

### 6. **检查 Python 环境和依赖**

LTP 依赖于一些底层的 C++ 库，确保你的 Python 环境没有出现冲突。

你可以使用以下命令检查 Python 环境是否有问题：

bash

复制代码

`pip list`

查看是否有任何与 `ltp` 相关的冲突或版本问题。

### 7. **更新或降级版本**

如果你使用的是较新的版本，尝试降级到一个稳定的版本，或尝试使用其他版本的 LTP 进行兼容性测试。

### 8. **使用其他轻量化中文NLP库**

如果 LTP 继续出现问题，考虑使用其他轻量的 NLP 库，如：

- **jieba**：一个轻量级的中文分词库，适合分词和简单的文本处理。
- **SpaCy + 预训练模型**：SpaCy 也支持中文，并且可以通过加载模型进行命名实体识别。

### 总结：

1. 确保 LTP 模型文件已正确下载并加载。
2. 检查 LTP 安装是否正确，尝试使用 `pyltp`。
3. 加入更多调试信息，查看错误。
4. 确保系统资源足够，检查是否有资源耗尽的情况。
5. 尝试其他轻量化 NLP 库，如 `jieba`，如果 LTP 无法解决问题。




##  TONGYI-LONG


##### 新角度 返回全部规则的json key为规则编码，value为是/否

```sh
curl --location 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions' \
--header 'Authorization: Bearer sk-4b479404a0f3478db9f64005cf08367f' \
--header 'Content-Type: application/json' \
--header 'Cookie: acw_tc=2526ba21-09fc-95d2-805b-b4218729fdf1cf2b8df336c14ec4375c39b114b97498' \
--data '{
    "model": "qwen-long",
    "response_format": {
        "type": "json_object"
    },
    "messages": [
        {
            "role": "system",
            "content": "你是一个有熟练经验的审计工程师"
        },
        {
            "role": "system",
            "content": "fileid://file-fe-VAAynUVqimzTAIH1yQbXXAq5"
        },
        {
            "role": "user",
            "content": "这个招标文件正文中,投标有效期是否为0或空，请返回json形式"
        }
    ]
}'
```


```
设计：

上传文件时，将文件直接上传至阿里qwen-long，返回文件id
通过接口获取项目信息（）
```