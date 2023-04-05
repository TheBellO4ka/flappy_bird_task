import AbstractPipeGroup from "./AbstractPipeGroup";
import { GameScene } from "../../scenes";
import { PipeGroupConfig } from "../../config";

class PipeGroup implements AbstractPipeGroup {

    private gameScene: GameScene;
    private config: PipeGroupConfig;
    private pipes: Phaser.Physics.Arcade.Group;
    private pipesArray: any[];

    constructor(gameScene: GameScene, config: PipeGroupConfig) {
        this.gameScene = gameScene;
        this.config = config;
        this.pipes = gameScene.physics.add.group();
        this.pipesArray = [];
    }

    hasPipes(): boolean {
        return this.pipesArray.length > 0;
    }

    deleteOldestPipe(): void {
        this.pipesArray.shift();
    }

    getPipes(): Phaser.Physics.Arcade.Group {
        return this.pipes;
    }

    getOldestPipeX(): number {
        return this.pipesArray.at(0).x;
    }

    createPipePair = () => {
        const {
            key,
            velocity,
            gap,
            range,
            immovable,
            allowGravity,
            destroyDelay,
            topPipeX,
            bottomPipeX,
        } = this.config;

        const position = Math.floor(Math.random() * range) + gap / 2;
        const topPosition = position - gap / 2;
        const bottomPosition = position + gap / 2;

        const topPipe = this.pipes.create(topPipeX, topPosition, key).setOrigin(0, 1);
        const bottomPipe = this.pipes.create(bottomPipeX, bottomPosition, key).setOrigin(0, 0);

        topPipe.setVelocityX(velocity);
        bottomPipe.setVelocityX(velocity);

        topPipe.body.setAllowGravity(allowGravity);
        bottomPipe.body.setAllowGravity(allowGravity);

        topPipe.body.immovable = immovable;
        bottomPipe.body.immovable = immovable;

        this.pipesArray.push(topPipe);

        this.gameScene.time.addEvent({
            delay: destroyDelay,
            callback: () => {
                topPipe.destroy();
                bottomPipe.destroy();
            },
            callbackScope: this.gameScene
        });
    }

}

export default PipeGroup;