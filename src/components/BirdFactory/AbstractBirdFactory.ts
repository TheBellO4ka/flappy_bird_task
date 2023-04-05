import { AbstractBird } from "../Bird";
import { BirdConfig } from "../../config";

interface AbstractBirdFactory {

    createBird(birdConfig: BirdConfig): AbstractBird;
}

export default AbstractBirdFactory;