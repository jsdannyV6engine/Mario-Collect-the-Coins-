// primary variables
var mario, mario_running
var coin, coinImage, shell, shellImage;
var coinGroup, shellGroup;
var score, survivalTime;
var ground, groundImage;

//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//the preload
function preload() {
  //monkey
  mario_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "sprite_9.png")

  //banana
  coinImage = loadImage("mariocoin.png");

  //obstacle
  shellImage = loadImage("shell.png");

  //ground
  groundImage = loadImage("ground.png")

}


//the setup
function setup() {
  createCanvas(400, 400);

  //groups
  coinGroup = createGroup();
  shellGroup = createGroup();
  TimeGroup = createGroup();

  //monkey
  mario = createSprite(80, 315, 20, 20);
  mario.addAnimation("moving", mario_running);
  mario.scale = 0.1;

  //ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.addImage("ground.png")

  //score
  score = 0;
  survivalTime = 0;

}

//draw
function draw() {
  //background
  background("mariosky.png")

  //displays the survivalTime intValue
  stroke("black");
  fill("black");
  textSize(20);
  text("Score: " + score, 300, 30);

  //displays the survivalTime intValue
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: " + survivalTime, 10, 30);

  //monkey
  mario.collide(ground);

  //play
  if (gameState === PLAY) {
    mario.changeAnimation("running", monkey_running);

    survivalTime = Math.ceil(frameCount / frameRate());

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      mario.velocityY = -12;
    }

    if (CoinGroup.isTouching(monkey)) {
      CoinGroup.destroyEach();
      score = score + 3;
    }

    mario.velocityY = mario.velocityY + 0.8;
    shellGroup.setLifetimeEach(-1);

    food();
    obstacles();

    if (shellGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  if (gameState === END) {
    shellGroup.destroyEach();
    coinGroup.destroyEach();
    mario.destroy();
    ground.destroy();
    survivalTime.visible = false;

    stroke("red");
    fill("red");
    textSize(30);
    textSize("Game Over!", 110, 200);

    stroke("black");
    fill("black");
    text("All assets are all owned by Nintendo", 100, 240);
  }
  drawSprites();
}


function coin() {
  if (frameCount % 80 === 0) {
    coin = createSprite(400, 350, 40, 10);
    coin.addImage(coinImage);
    coin.y = Math.round(random(120, 200));
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 200;
    coinGroup.add(coin);
  }
}

function shell() {
  if (frameCount % 300 === 0) {
    shell = createSprite(250, 325, 10, 10);
    shell.addImage(shellImage);
    shell.velocityX = -3;
    shell.lifetime = 200;
    shell.scale = 0.1;
    shellGroup.add(shell);
  }
}