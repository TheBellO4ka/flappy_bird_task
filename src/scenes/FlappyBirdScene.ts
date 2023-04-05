import Phaser from 'phaser';
import positions from './PositionOptions';
import { assetsPath, Texts, BirdConfig, FlappyBirdConfig, ConcretePipeGroupConfig, PipeGroupConfig } from '../config';
import GameScene from './GameScene';
import { AbstractBird } from '../components/Bird';
import { AbstractPipeGroup } from '../components/PipeGroup';
import { AbstractBirdFactory, FlappyBirdFactory } from '../components/BirdFactory';
import { AbstractPipeGroupFactory, PipeGroupFactory } from '../components/PipeGroupFactory';

export default class FlappyBirdScene extends Phaser.Scene implements GameScene {
  private bird!: AbstractBird;
  private pipeGroup!: AbstractPipeGroup;
  private scoreCounter!: number;
  private scoreCounterText!: Phaser.GameObjects.Text;

  private birdConfig: BirdConfig;
  private pipeGroupConfig: PipeGroupConfig;
  private birdFactory: AbstractBirdFactory;
  private pipeGroupFactory: AbstractPipeGroupFactory;

  constructor() {
    super('flappy-bird');

    this.birdConfig = FlappyBirdConfig;
    this.pipeGroupConfig = ConcretePipeGroupConfig;

    this.birdFactory = new FlappyBirdFactory(this);
    this.pipeGroupFactory = new PipeGroupFactory(this);
  }

  public isGameOver(): boolean {
    return false;
  }

  public preload(): void {
    this.load.image('background', assetsPath.backgroundPng);
    this.load.image('pipe', assetsPath.pipePng);
    this.load.image('bird', assetsPath.birdPng);
    this.load.image('startButton', assetsPath.startButtonPng);
  }

  public create(): void {
    this.physics.world.setBounds(positions.zeroX, positions.zeroY, window.innerWidth, window.innerHeight);

    const background = this.add.image(positions.zeroX, positions.zeroY, 'background');
    background.setOrigin(positions.zeroX, positions.zeroY);

    this.bird = this.birdFactory.createBird(this.birdConfig);
    this.pipeGroup = this.pipeGroupFactory.createPipeGroup(this.pipeGroupConfig);

    this.scoreCounter = 0;
    this.scoreCounterText = this.add.text(
      window.innerWidth / 2,
      positions.zeroY,
      this.scoreCounter.toString(),
      { color: Texts.color, fontSize: Texts.fontSize })
      .setDepth(1);

    this.physics.add.collider(this.bird.getSprite(), this.pipeGroup.getPipes(), this.gameOver, undefined, this);

    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: this.pipeGroup.createPipePair,
      callbackScope: this,
    });

  }

  update() {
    if (this.bird.getSprite().y <= this.bird.getSprite().height / 2 || this.bird.getSprite().y >= window.screen.height - this.bird.getSprite().height * 2) {
      this.gameOver();
    }
    if (this.pipeGroup.hasPipes() && this.bird.getSprite().x > this.pipeGroup.getOldestPipeX()) {
      this.pipeGroup.deleteOldestPipe();

      this.updateScoreCounter();
      console.log(this.scoreCounter);
    }
  }

  public updateScoreCounter() {
    this.scoreCounter++;
    this.scoreCounterText.setText(this.scoreCounter.toString());
  }

  public gameOver() {
    // this.isGameOver = true;
    this.scene.start();
    // Add game over logic here
    // this.scene.start();
  }
}