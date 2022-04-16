var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, playerImg;
var backgroundImg, backgroundp, invisibleGround;

var blobsGroup, blobs, blobsImg;
var meteorsGroup, meteor, meteorImg;

var score = 0;
var gameOver, gameOverImg;

function preload(){
backgroundImg=loadImage("ifantasy-seamless-alien-landscape-separated-260nw-337946231.jpg")
playerImg=loadImage("tumblr_mf37kuGG1V1rrsa2po1_1280 (1) (1).gif")
blobsImg=loadImage("39c5a8ef2f587d4a7f742ba16371ad48 (1) (1).gif")
//gameOverImg=loadImage("ggfgfgfg39c5a8ef2f587d4a7f742ba16371ad48 (1).gif")
gameOverImg=loadImage("skullybackrestReatartgameover3tg4rt37uegyrdf8y6osgovh.png")

}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMODE=(CENTER)

backgroundp = createSprite(windowWidth/1.2,windowHeight/2, 10, 10);
backgroundp.addImage("background",backgroundImg);
backgroundp.scale=2.5
backgroundp.velocityX=0

player = createSprite(windowWidth/9,windowHeight/3,10,10);
player.addImage("moving", playerImg);
player.scale = 0.3;
player.velocityY=0
player.setCollider("rectangle",0,0,400,450);

gameOver = createSprite(windowWidth/2,windowHeight/2,10,10);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5

invisibleGround = createSprite(windowWidth/2,windowHeight/1.14,windowWidth,10);
invisibleGround.visible = false;

blobsGroup = createGroup();
}

function draw() {
    background("blue")
    console.log(score)
    
    fill("red");
    textSize(30);
    text("Score: "+ score, 500,50);
    

    if(gameState===PLAY){
      gameOver.visible = false;
    
      backgroundp.velocityX=-(8 + 3* score/100)
    
      score = score + Math.round(getFrameRate()/60);

    if (backgroundp.x < windowWidth/5.059){
        backgroundp.x = windowWidth/1.2;
      }

    if(keyDown("space")&& player.y >= 400) {
        player.velocityY = -16;
    }

      player.velocityY = player.velocityY + 0.8

      spawnObstacles();
    
      if(blobsGroup.isTouching(player)){
          gameState = END;
      }
    }
    if(gameState===END){
      gameOver.visible=true

      if(mousePressedOver(gameOver)){
        reset();
      }

      backgroundp.velocityX = 0;
      player.velocityY = 0
      
     
     
    blobsGroup.setLifetimeEach(-1);
     
    blobsGroup.setVelocityXEach(0); 
    }
    player.collide(invisibleGround);
    drawSprites();
}

function reset() {
  gameState=PLAY;
  gameOver.visible=false;
  blobsGroup.destroyEach();
  score=0;
}


function spawnObstacles(){
  if (frameCount % 60 === 0){
    blobs = createSprite(800,windowHeight/1.25,10,40);
    blobs.velocityX = backgroundp.velocityX;

    blobs.addImage(blobsImg);
               
     blobs.scale = 0.26;
     blobs.lifetime = 300;
     //blobs.setCollider("rectangle", 0, 0, 350,350)
     blobs.setCollider("circle", -30, 0, 165)
     
     blobsGroup.add(blobs);
  }
 }
