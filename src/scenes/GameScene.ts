interface GameScene extends Phaser.Scene {

    gameOver(): void;
    updateScoreCounter(): void;
    isGameOver(): boolean;
}

export default GameScene;