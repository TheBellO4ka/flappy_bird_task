import { AbstractPipeGroup } from "../PipeGroup";
import { PipeGroupConfig } from "../../config";

interface AbstractPipeGroupFactory {
    createPipeGroup(pipeGroupConfig: PipeGroupConfig): AbstractPipeGroup;
}

export default AbstractPipeGroupFactory;