/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/AutoUploadImageUrl.ts
__export(exports, {
  default: () => AutoUploadPicImageUrl
});
var import_obsidian = __toModule(require("obsidian"));

// src/PasteEventCopy.ts
var PasteEventCopy = class extends ClipboardEvent {
  constructor(originalEvent) {
    const { files } = originalEvent.clipboardData;
    const dt = new DataTransfer();
    for (let i = 0; i < files.length; i += 1) {
      dt.items.add(files.item(i));
    }
    super("paste", { clipboardData: dt });
  }
};

// src/ImgurlConstants.ts
var IMGUR_API_BASE = "https://www.imgurl.org/api/v2/upload";

// src/AutoUploadImageUrl.ts
var DEFAULT_SETTINGS = {
  api: "https://www.imgurl.org/api/v2/upload",
  uid: "963c2113af0fabbd425fc2d97d86d43e",
  token: "a51dfd3ba88108d6a180211604e272f2"
};
var AutoUploadPicImageUrl = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.customPasteEventCallback = (e, _, markdownView) => __async(this, null, function* () {
      if (e instanceof PasteEventCopy)
        return;
      const { files } = e.clipboardData;
      if (files.length === 0 || !files[0].type.startsWith("image")) {
        return;
      }
      e.preventDefault();
      for (let i = 0; i < files.length; i += 1) {
        new import_obsidian.Notice("This is customPasteEventCallback, you copy an picture");
        this.uploadFileAndEmbedImgurImage(files[i]).catch(() => {
          markdownView.currentMode.clipboardManager.handlePaste(new PasteEventCopy(e));
        });
      }
    });
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.setupImgurHandlers();
    });
  }
  setupImgurHandlers() {
    this.registerEvent(this.app.workspace.on("editor-paste", this.customPasteEventCallback));
  }
  upload(image) {
    return __async(this, null, function* () {
      const requestData = new FormData();
      requestData.append("file", image);
      requestData.append("uid", this.settings.uid);
      requestData.append("token", this.settings.token);
      const resp = yield fetch(IMGUR_API_BASE, {
        method: "POST",
        headers: new Headers({
          cookie: "PHPSESSID=bfpmq5uol5levu71h1dhsv00uh; KEEP_LOGIN=4ykw%3Aaed7c0bdce526b68c087cc418b2b2a876fea4f27b9c86977a4eee7c7363485e15902d346d50179e2d6920d47e456b77faf6e2cf63b2d701886bf580ea88939de13662b1d76c125ff4dd0be98375b69ea8bce0e%3A1655107420"
        }),
        body: requestData
      });
      if (!resp.ok) {
        new import_obsidian.Notice("Upload faild, network error;");
      }
      return yield resp.json();
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  uploadFileAndEmbedImgurImage(file) {
    return __async(this, null, function* () {
      const pasteId = (Math.random() + 1).toString(36).substr(2, 5);
      this.insertTemporaryText(pasteId);
      let imgurlData;
      try {
        imgurlData = yield this.upload(file);
      } catch (e) {
        this.handleFailedUpload(pasteId, `Upload failed, remote server returned an error: ${e.message}`);
      }
      new import_obsidian.Notice("upload success:imgurl is :" + imgurlData.data.url);
      this.embedMarkDownImage(pasteId, imgurlData.data.url);
    });
  }
  handleFailedUpload(pasteId, message) {
    const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
    AutoUploadPicImageUrl.replaceFirstOccurrence(this.getEditor(), progressText, `<!--${message}-->`);
  }
  embedMarkDownImage(pasteId, imageUrl) {
    const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
    const markDownImage = `![](${imageUrl})`;
    AutoUploadPicImageUrl.replaceFirstOccurrence(this.getEditor(), progressText, markDownImage);
  }
  static progressTextFor(id) {
    return `![Uploading file...${id}]()`;
  }
  static replaceFirstOccurrence(editor, target, replacement) {
    const lines = editor.getValue().split("\n");
    for (let i = 0; i < lines.length; i += 1) {
      const ch = lines[i].indexOf(target);
      if (ch !== -1) {
        const from = { line: i, ch };
        const to = { line: i, ch: ch + target.length };
        editor.replaceRange(replacement, from, to);
        break;
      }
    }
  }
  getEditor() {
    const mdView = this.app.workspace.activeLeaf.view;
    return mdView.editor;
  }
  insertTemporaryText(pasteId) {
    const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
    this.getEditor().replaceSelection(`${progressText}
`);
  }
};
