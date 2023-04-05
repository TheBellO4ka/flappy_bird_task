interface AbstractPipeGroup {
    createPipePair: () => void;
    getOldestPipeX(): number;
    getPipes(): Phaser.Physics.Arcade.Group;
    deleteOldestPipe(): void;
    hasPipes(): boolean;
}

export default AbstractPipeGroup;