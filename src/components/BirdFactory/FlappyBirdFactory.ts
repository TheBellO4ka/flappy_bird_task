import { AbstractBird } from "../Bird";
import AbstractBirdFactory from "./AbstractBirdFactory";
import { BirdConfig } from "../../config";
import { FlappyBird } from "../Bird";
import { GameScene } from "../../scenes";

class FlappyBirdFactory implements AbstractBirdFactory {

    private gameScene: GameScene;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
    }

    createBird(birdConfig: BirdConfig): AbstractBird {
        return new FlappyBird(this.gameScene, birdConfig);
    }

}

export default FlappyBirdFactory;