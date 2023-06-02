class scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }
    preload() {


    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.tips = this.add.text(this.cx,this.cy,"Use WASD to move.").setOrigin(0.5).setFontSize(20);
        this.text = this.add.text(this.cx,this.h * 0.7,`This is the game scene, 
if the player is rushed to the leftmost side of the screen will enter the failure scene, 
if the player reaches the rightmost side of the screen will enter the victory scene`).setOrigin(0.5).setFontSize(20);

        this.slug = this.physics.add.sprite(400, this.h, "slug")
            .setBodySize(10, 10)
            .setScale(4, 2)
            .setBounce(0)
            .setCollideWorldBounds(true, true, false, true);

        this.enemy = this.physics.add.sprite(this.w + 10, this.h, "enemy")
            .setBodySize(10, 10)
            .setScale(4, 2)
            .setBounce(0)
            .setCollideWorldBounds(true, true, false, true);

        this.physics.add.collider(this.slug, this.enemy, this.collison, null, this);

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'w' && this.slug.y >= this.h - 10) {
                this.slug.setVelocityY(-200);
            }

            if (event.key === 'd') {
                this.slug.setVelocityX(200);
            }

            if (event.key === 'a') {
                this.slug.setVelocityX(-200);
            }


        });

        this.input.keyboard.on('keyup', (event) => {

            if (event.key === 'd') {
                this.slug.setVelocityX(0);
            }

            if (event.key === 'a') {
                this.slug.setVelocityX(0);
            }
        });


    }

    collison() {
        this.tweens.add({
            targets: this.slug,
            duration: 300,
            x: "-=50",
            y: "-=100",
            ease: "Back.Out",
            repeat: false,
        });
        this.slug.setVelocityX(0);
    }

    update() {
        if (this.enemy.x <= 20) {
            this.enemy.x = this.w - 10;

        }
        this.enemy.setVelocityX(-200);

        if (this.slug.x >= this.w - 20) {
            
            this.cameras.main.fade(2000, 255, 255, 255);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.start(scene3);
            });
        }
        else if (this.slug.x <= 20) {
            this.cameras.main.fade(2000, 255, 255, 255);
            this.physics.pause();

            this.time.delayedCall(2000, () => {
                this.scene.start(scene4);
            });
        }

    }
}


class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }
    preload() {


    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.title = this.add.text(this.cx, this.cy, `This is the starting scene,
Click to enter the game scene`).setOrigin(0.5).setFontSize(20);

        this.input.on('pointerup', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start(scene2);
            });

        });


    }

}
class scene3 extends Phaser.Scene {

    constructor() {
        super("scene3");
        //
    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.title = this.add.text(this.cx, this.cy, `This is the starting scene,
Click to return the game scene`).setOrigin(0.5).setFontSize(20);

        this.input.on('pointerup', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start(scene2);
            });

        });


    }

}



class scene4 extends Phaser.Scene {
    constructor() {
        super("scene4");
    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.title = this.add.text(this.cx, this.cy, `This is the settlement scene after the victory
Click to return to the start scene`).setOrigin(0.5).setFontSize(20);

        

        this.input.on('pointerup', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start(scene1);
            });

        });
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 400,
            }
        }
    },
    scene: [
        scene1,
        scene2,
        scene3,
        scene4
    ]
}

let game = new Phaser.Game(config)
