import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {

  private startButton!: Phaser.GameObjects.Image;



  constructor() {
    super('PauseScene');
  }
  preload(){    
    this.load.image('background', 'https://i.imgur.com/QV1CgiL.png');
    this.load.image('startButton', 'https://i.imgur.com/pfTvRZ4.png'); 
  }

  create() {   
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);

    this.startButton = this.add.image(40, 40, 'startButton');
    this.startButton.setInteractive();
    this.startButton.on('pointerdown', () => {
        this.scene.pause('PauseScene');
        this.scene.launch('flappy-bird');
    });
  }
}