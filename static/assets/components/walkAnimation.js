
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class walkAnimation {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__walkAnimation"] = this;

		/* START-USER-CTR-CODE */
		// Write your  code here.
		this.gameObject.scene.event.once("update", () => {
			this.gameObject.play(this.animationKey);
		});
		/* END-USER-CTR-CODE */
	}

	/** @returns {walkAnimation} */
	static getComponent(gameObject) {
		return gameObject["__walkAnimation"];
	}

	/** @type {Phaser.GameObjects.Sprite} */
	gameObject;
	/** @type {string} */
	animationKey = "";

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
