import Phaser from "phaser";

export default class Game extends Phaser.Scene {

	private player!: Phaser.GameObjects.Rectangle;
	private platforms!: Phaser.GameObjects.Rectangle[];
	private npc!: Phaser.GameObjects.Rectangle;
	private gangster!: Phaser.GameObjects.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private playerSpeed: number = 300;
	private jumpForce: number = -400;
	private dialogText!: Phaser.GameObjects.Text;
	private isDialogShowing: boolean = false;

	constructor() {
		super("Game");
	}

	editorCreate(): void {
		// 建立平台
		this.platforms = [];
		
		// 主平台
		const mainPlatform = this.add.rectangle(700, 600, 800, 32, 0x00ff00);
		this.physics.add.existing(mainPlatform, true);
		this.platforms.push(mainPlatform);

		// 其他平台
		const platform1 = this.add.rectangle(400, 450, 200, 32, 0x00ff00);
		this.physics.add.existing(platform1, true);
		this.platforms.push(platform1);

		const platform2 = this.add.rectangle(800, 300, 200, 32, 0x00ff00);
		this.physics.add.existing(platform2, true);
		this.platforms.push(platform2);

		// 新增平台
		const platform3 = this.add.rectangle(200, 200, 200, 32, 0x00ff00);
		this.physics.add.existing(platform3, true);
		this.platforms.push(platform3);

		// player (紅色方塊)
		const player = this.add.rectangle(500, 500, 50, 50, 0xff0000);
		this.player = player;

		// NPC (藍色方塊)
		this.npc = this.add.rectangle(700, 550, 40, 40, 0x0000ff);
		this.physics.add.existing(this.npc, true);

		// Gangster (使用資源)
		this.gangster = this.add.sprite(200, 150, "gangster_1");
		this.gangster.play("gangster_1_walk");
		this.physics.add.existing(this.gangster, true);

		// 對話文字 (初始隱藏)
		this.dialogText = this.add.text(640, 200, '', {
			color: '#ffffff',
			fontSize: '24px',
			backgroundColor: '#333333',
			padding: { x: 10, y: 5 }
		}).setOrigin(0.5).setVisible(false);

		this.events.emit("scene-awake");
	}

	create() {
		this.editorCreate();

		// 啟用物理系統
		this.physics.add.existing(this.player);

		// 設定玩家物理屬性
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);
		playerBody.setGravityY(600);

		// 創建鍵盤控制
		if (this.input.keyboard) {
			this.cursors = this.input.keyboard.createCursorKeys();
		}

		// 添加與平台的碰撞
		this.platforms.forEach(platform => {
			this.physics.add.collider(this.player, platform);
		});

		// 添加與NPC的重疊檢測
		this.physics.add.overlap(
			this.player,
			this.npc,
			() => this.handleNPCInteraction("哈囉！按空白鍵關閉對話。"),
			undefined,
			this
		);

		// 添加與Gangster的重疊檢測
		this.physics.add.overlap(
			this.player,
			this.gangster,
			() => this.handleNPCInteraction("我是Gangster！按空白鍵關閉對話。"),
			undefined,
			this
		);

		// 添加空白鍵互動
		this.input.keyboard?.addKey('SPACE').on('down', () => {
			if (this.isDialogShowing) {
				this.hideDialog();
			}
		});
	}

	update() {
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

		// 重置水平速度
		playerBody.setVelocityX(0);

		// 處理鍵盤輸入
		if (this.cursors.left.isDown) {
			playerBody.setVelocityX(-this.playerSpeed);
		} else if (this.cursors.right.isDown) {
			playerBody.setVelocityX(this.playerSpeed);
		}

		// 跳躍控制
		if (this.cursors.up.isDown && playerBody.touching.down) {
			playerBody.setVelocityY(this.jumpForce);
		}
	}

	private handleNPCInteraction(message: string) {
		if (!this.isDialogShowing) {
			this.showDialog(message);
		}
	}

	private showDialog(text: string) {
		this.dialogText.setText(text);
		this.dialogText.setVisible(true);
		this.isDialogShowing = true;
	}

	private hideDialog() {
		this.dialogText.setVisible(false);
		this.isDialogShowing = false;
	}
} 