import {
	App,
	Editor,
	MarkdownView,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import PasteEventCopy from "src/PasteEventCopy";
import { IMGUR_API_BASE } from "./ImgurlConstants";
import { ImgurPostData } from "./imgurResponseTypes";

interface ImgurlUploadSettings {
	api: string;
	uid: string;
	token: string;
}

declare module "obsidian" {
	interface MarkdownSubView {
		clipboardManager: ClipboardManager;
	}
}

interface ClipboardManager {
	handlePaste(e: ClipboardEvent): void;
	handleDrop(e: DragEvent): void;
}

const DEFAULT_SETTINGS: ImgurlUploadSettings = {
	api: "https://www.imgurl.org/api/v2/upload",
	uid: "963c2113af0fabbd425fc2d97d86d43e",
	token: "a51dfd3ba88108d6a180211604e272f2",
};

export default class AutoUploadPicImageUrl extends Plugin {
	settings: ImgurlUploadSettings;

	async onload() {
		await this.loadSettings();

		this.setupImgurHandlers();

		// This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon(
		// 	"dice",
		// 	"icon",
		// 	(evt: MouseEvent) => {
		// 		// Called when the user clicks the icon.
		// 		new Notice("this is a notice");
		// 	}
		// );
		// Perform additional things with the ribbon
		// ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: 'open-sample-modal-simple',
		// 	name: 'Open sample modal (simple)',
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	}
		// });
		// This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection('Sample Editor Command');
		// 	}
		// });
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// This adds a settings tab so the user can configure various aspects of the plugin
		// 设置面板
		// this.addSettingTab(new ImgurlSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}
	setupImgurHandlers() {
		this.registerEvent(
			this.app.workspace.on("editor-paste", this.customPasteEventCallback)
		);
	}

	private customPasteEventCallback = async (
		e: ClipboardEvent,
		_: Editor,
		markdownView: MarkdownView
	) => {
		if (e instanceof PasteEventCopy) return;

		const { files } = e.clipboardData;
		if (files.length === 0 || !files[0].type.startsWith("image")) {
			return;
		}

		e.preventDefault();

		for (let i = 0; i < files.length; i += 1) {
			new Notice("customPasteEventCallback...");
			this.uploadFileAndEmbedImgurImage(files[i]).catch(() => {
				markdownView.currentMode.clipboardManager.handlePaste(
					new PasteEventCopy(e)
				);
			});
		}
	};

	async upload(image: File): Promise<ImgurPostData> {
		// new Notice("uploading...");
		const requestData = new FormData();
		requestData.append("file", image);
		requestData.append("uid", this.settings.uid);
		requestData.append("token", this.settings.token);

		const resp = await fetch(IMGUR_API_BASE, {
			method: "POST",
			headers: new Headers({
				cookie: "PHPSESSID=bfpmq5uol5levu71h1dhsv00uh; KEEP_LOGIN=4ykw%3Aaed7c0bdce526b68c087cc418b2b2a876fea4f27b9c86977a4eee7c7363485e15902d346d50179e2d6920d47e456b77faf6e2cf63b2d701886bf580ea88939de13662b1d76c125ff4dd0be98375b69ea8bce0e%3A1655107420",
			}),
			body: requestData,
		});

		if (!resp.ok) {
			new Notice("Upload faild, network error;");
		}
		return ((await resp.json()) as ImgurPostData);
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private async uploadFileAndEmbedImgurImage(file: File) {
		const pasteId = (Math.random() + 1).toString(36).substr(2, 5);
		this.insertTemporaryText(pasteId);

		let imgurlData: ImgurPostData;
		try {
			imgurlData = await this.upload(file);
		} catch (e) {
			this.handleFailedUpload(
				pasteId,
				`Upload failed, remote server returned an error: ${e.message}`
			);
		}
		new Notice("upload success:imgurl is :" + imgurlData.data.url);
		this.embedMarkDownImage(pasteId, imgurlData.data.url);
	}

	private handleFailedUpload(pasteId: string, message: string) {
		const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
		AutoUploadPicImageUrl.replaceFirstOccurrence(
			this.getEditor(),
			progressText,
			`<!--${message}-->`
		);
	}

	public embedMarkDownImage(pasteId: string, imageUrl: string) {
		const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
		const markDownImage = `![](${imageUrl})`;
		// new Notice("markDownImage is " + markDownImage);
		AutoUploadPicImageUrl.replaceFirstOccurrence(
			this.getEditor(),
			progressText,
			markDownImage
		);
	}

	private static progressTextFor(id: string) {
		return `![Uploading file...${id}]()`;
	}

	private static replaceFirstOccurrence(
		editor: Editor,
		target: string,
		replacement: string
	) {
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

	private getEditor(): Editor {
		const mdView = this.app.workspace.activeLeaf.view as MarkdownView;
		return mdView.editor;
	}

	private insertTemporaryText(pasteId: string) {
		const progressText = AutoUploadPicImageUrl.progressTextFor(pasteId);
		this.getEditor().replaceSelection(`${progressText}\n`);
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const { contentEl } = this;
// 		contentEl.setText("Woah!");
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }

// class ImgurlSettingTab extends PluginSettingTab {
// 	plugin: AutoUploadPicImageUrl;

// 	constructor(app: App, plugin: AutoUploadPicImageUrl) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const { containerEl } = this;

// 		containerEl.empty();

// 		containerEl.createEl("h2", {
// 			text: "Settings imgurl token infomation.",
// 		});

// 		new Setting(containerEl)
// 			.setName("API")
// 			.setDesc("api")
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter api url")
// 					.setValue(this.plugin.settings.api)
// 					.onChange(async (value) => {
// 						console.log("Secret: " + value);
// 						this.plugin.settings.api = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);

// 		new Setting(containerEl)
// 			.setName("UID")
// 			.setDesc(
// 				"this is your uid, generate it by https://www.imgurl.org/vip/manage/mytoken"
// 			)
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter your uid")
// 					.setValue(this.plugin.settings.uid)
// 					.onChange(async (value) => {
// 						console.log("Secret: " + value);
// 						this.plugin.settings.uid = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);

// 		new Setting(containerEl)
// 			.setName("TOKEN")
// 			.setDesc(
// 				"this is your token, generate it by https://www.imgurl.org/vip/manage/mytoken"
// 			)
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter your token")
// 					.setValue(this.plugin.settings.token)
// 					.onChange(async (value) => {
// 						console.log("TOKEN: " + value);
// 						this.plugin.settings.token = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);
// 	}
// }
