import Phaser from 'phaser';
import createPipe from '../model/pipes.model';
import birdConfig from '../model/bird.model';
import positions from './PositionOptions';
import assetsPath from './assetsPath';
import Texts from '../ts_config/textConfig';

export default class FlappyBirdScene extends Phaser.Scene {
  private bird!: Phaser.Physics.Arcade.Sprite;
  private pipes!: Phaser.Physics.Arcade.Group;
  private scoreCounter!: number;
  private scoreCounterText!: Phaser.GameObjects.Text;
  private jumpKey!: Phaser.Input.Keyboard.Key;
  private pipesArrey!: any [];
  private isGameOver = false;

  

  constructor() {
    super('flappy-bird');
  }

  public preload():void {    
    this.load.image('background', assetsPath.backgroundPng);
    this.load.image('pipe', assetsPath.pipePng);
    this.load.image('bird', assetsPath.birdPng);
    this.load.image('startButton', assetsPath.startButtonPng);
  }

  public create():void {   
    this.physics.world.setBounds(positions.zeroX, positions.zeroY, window.innerWidth, window.innerHeight);

    const background = this.add.image(positions.zeroX, positions.zeroY, 'background');
    background.setOrigin(positions.zeroX, positions.zeroY);

    this.bird = this.physics.add.sprite(birdConfig.spawnX, birdConfig.spawnY, 'bird');
    this.bird.setCollideWorldBounds(true);

    this.pipes = this.physics.add.group();

    this.scoreCounter = 0;
    this.pipesArrey = [];
    this.scoreCounterText = this.add.text(
        window.innerWidth / 2, 
        positions.zeroY, 
        this.scoreCounter.toString(), 
        { color: Texts.color, fontSize: Texts.fontSize})
      .setDepth(1);

    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.jumpKey.on('down', this.jump, this);

    this.physics.add.collider(this.bird, this.pipes, this.gameOver, undefined, this);
    
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: this.spawnPipes,
      callbackScope: this,
    });
    
  }

  update() {
    if (this.bird.y <= this.bird.height / 2 || this.bird.y >= window.screen.height - this.bird.height * 2) {
      this.gameOver();
    }
      if (this.pipesArrey.length && this.bird.x > this.pipesArrey[this.pipesArrey.length - 1].x) {
        this.pipesArrey.pop();
        
        this.updateScoreCounter();
        console.log(this.scoreCounter);
      }
  }

  updateScoreCounter() {
    this.scoreCounter++;
    this.scoreCounterText.setText(this.scoreCounter.toString());
  }

  private jump() {
    if (this.isGameOver) {
      return;
    }

    this.bird.setVelocityY(birdConfig.jumpVelocity);
  }

  private spawnPipes() {

    const pipe = createPipe();
    const topPipe = this.pipes.create(window.screen.width, pipe.topPosition, 'pipe').setOrigin(0, 1);
    const bottomPipe = this.pipes.create(window.screen.width, pipe.bottomPosition, 'pipe').setOrigin(0, 0);

    topPipe.setVelocityX(pipe.velocity);
    bottomPipe.setVelocityX(pipe.velocity);

    topPipe.body.setAllowGravity(false);
    bottomPipe.body.setAllowGravity(false);

    topPipe.body.immovable = true;
    bottomPipe.body.immovable = true;

    console.log(this.pipes);
    this.pipesArrey.unshift(topPipe);

    this.time.addEvent({
      delay: 15000,
      callback: () => {
        topPipe.destroy();
        bottomPipe.destroy();
      },
      callbackScope: this,
    });
  }

  private gameOver() {
    // this.isGameOver = true;
    this.scene.start();
    // Add game over logic here
    // this.scene.start();
  }
}