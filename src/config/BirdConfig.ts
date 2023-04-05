type BirdConfig = {
    spawnX: number,
    spawnY: number,
    key: string,
    frame?: string | number,

    collideWorldBounds: boolean,

    jumpVelocity: number,
    jumpKey: string | number | Phaser.Input.Keyboard.Key,
}

const FlappyBirdConfig: BirdConfig = {
    spawnX: 50,
    spawnY: 300,
    key: "bird",
    collideWorldBounds: true,
    jumpVelocity: -300,
    jumpKey: Phaser.Input.Keyboard.KeyCodes.SPACE
}

export {
    BirdConfig,
    FlappyBirdConfig
};