---
title: hy2.0
hidden: true
---

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

