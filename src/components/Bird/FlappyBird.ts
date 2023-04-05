import AbstractBird from "./AbstractBird";
import { BirdConfig } from "../../config";
import { GameScene } from "../../scenes";


class FlappyBird implements AbstractBird {

    private sprite: any;
    private config: BirdConfig;

    constructor(gameScene: GameScene, config: BirdConfig) {
        this.config = config;

        this.sprite = gameScene.physics.add.sprite(config.spawnX, config.spawnY, config.key);
        this.sprite.setCollideWorldBounds(config.collideWorldBounds);

        const jumpKey = gameScene.input.keyboard.addKey(config.jumpKey);
        jumpKey.on('down', () => this.jump(), gameScene);
    }

    getSprite(): any {
        return this.sprite;
    }

    jump(): void {
        if (!this.sprite) {
            return;
        }
        this.sprite.setVelocity(this.config.jumpVelocity);
    }
}

export default FlappyBird;