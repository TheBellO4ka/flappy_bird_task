type PipeGroupConfig = {
    key: string,
    velocity: number,
    gap: number,
    range: number,
    immovable: boolean,
    allowGravity: boolean,
    destroyDelay: number,
    topPipeX: number,
    bottomPipeX: number,
}

const ConcretePipeGroupConfig: PipeGroupConfig = {
    key: "pipe",
    velocity: -200,
    gap: 250,
    range: 300,
    immovable: true,
    allowGravity: false,
    destroyDelay: 15000,
    topPipeX: window.screen.width,
    bottomPipeX: window.screen.width
}

export {
    PipeGroupConfig,
    ConcretePipeGroupConfig
};