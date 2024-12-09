// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Level extends Phaser.Scene {

	private player!: Phaser.GameObjects.Rectangle;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private playerSpeed: number = 300;
	// menu setting
	private menuButton!: Phaser.GameObjects.Rectangle;
	private menuPanel!: Phaser.GameObjects.Container;
	private isMenuOpen: boolean = false;

	constructor() {
		super("Level");
	}

	editorCreate(): void {
		// gangster_1, 原本編輯器追加的動畫
		const gangster_1 = this.add.sprite(201, 359, "gangster_1");
		gangster_1.play("gangster_1_walk");

		// player 小方塊
		const player = this.add.rectangle(640, 360, 50, 50, 0x00ff00);

		this.player = player;

		this.events.emit("scene-awake");

		// 添加選單按鈕（左下角）
		this.menuButton = this.add.rectangle(100, 620, 80, 80, 0x4a4a4a);
		this.menuButton.setInteractive();
		
		// 添加按鈕文字
		this.add.text(100, 620, 'MENU', {
			color: '#ffffff',
			fontSize: '16px'
		}).setOrigin(0.5);

		// 創建選單面板（初始隱藏）
		this.menuPanel = this.add.container(120, 520);
		
		// 選單背景
		const menuBg = this.add.rectangle(0, 0, 200, 100, 0x333333, 0.9);
		
		// Game Scene 按鈕
		const gameSceneBtn = this.add.rectangle(0, 0, 180, 40, 0x4a4a4a);
		const gameSceneText = this.add.text(0, 0, 'Game Scene', {
			color: '#ffffff',
			fontSize: '16px'
		}).setOrigin(0.5);
		
		gameSceneBtn.setInteractive();
		gameSceneBtn.on('pointerdown', () => {
			this.scene.start('Game'); // 改為切換到 Game 場景
		});

		this.menuPanel.add([menuBg, gameSceneBtn, gameSceneText]);
		this.menuPanel.setVisible(false);

		// 添加選單按鈕點擊事件
		this.menuButton.on('pointerdown', () => {
			this.isMenuOpen = !this.isMenuOpen;
			this.menuPanel.setVisible(this.isMenuOpen);
		});
	}

	/* START-USER-CODE */

	create() {
		this.editorCreate();

		// 啟用物理系統
		this.physics.add.existing(this.player);

		// 設定玩家物理屬性
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);

		// 創建鍵盤控制
		if (this.input.keyboard) {
			this.cursors = this.input.keyboard.createCursorKeys();
		}
	}

	update() {
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

		// 重置速度
		playerBody.setVelocity(0);

		// 處理鍵盤輸入
		if (this.cursors.left.isDown) {
			playerBody.setVelocityX(-this.playerSpeed);
		} else if (this.cursors.right.isDown) {
			playerBody.setVelocityX(this.playerSpeed);
		}

		if (this.cursors.up.isDown) {
			playerBody.setVelocityY(-this.playerSpeed);
		} else if (this.cursors.down.isDown) {
			playerBody.setVelocityY(this.playerSpeed);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
