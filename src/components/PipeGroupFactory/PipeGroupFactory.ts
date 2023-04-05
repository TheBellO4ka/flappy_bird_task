import { AbstractPipeGroup } from "../PipeGroup";
import AbstractPipeGroupFactory from "./AbstractPipeGroupFactory";
import { GameScene } from "../../scenes";
import { PipeGroup } from "../PipeGroup";
import { PipeGroupConfig } from "../../config";

class PipeGroupFactory implements AbstractPipeGroupFactory {

    private gameScene: GameScene;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
    }

    createPipeGroup(pipeGroupConfig: PipeGroupConfig): AbstractPipeGroup {
        return new PipeGroup(this.gameScene, pipeGroupConfig);
    }

}

export default PipeGroupFactory;