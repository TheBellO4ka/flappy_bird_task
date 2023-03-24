import FlappyBirdScene from '../scenes/FlappyBirdScene';
import PauseScene from '../scenes/PauseScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    scene: [PauseScene, FlappyBirdScene],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        debug: true,
      },
    },
  };

export default config