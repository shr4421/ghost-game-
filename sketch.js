var tower,towerImg,ghost,ghostImg,door,doorImg,climber,climberImg,block;

var doorGroup,climberGroup,blockGroup;
var PLAY=1;
var END=0;
var gameState="PLAY";

var sound;

function preload(){
  
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  
  sound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=      1 ;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  blockGroup=createGroup();
  
}

function draw(){
  
  background("black");
  
if(gameState==="PLAY"){
  
  
  if (tower.y>400){
    
   tower.y=tower.width/2; 
    
  }
  
  if (keyDown("space")){
    
    ghost.velocityY=-10;
    
  }  
  
  ghost.velocityY=ghost.velocityY +0.8;
  
  if (keyDown("left")){
    
    ghost.x=ghost.x-5;
    
  }
  
  if(keyDown("right")){
    
    ghost.x=ghost.x+5;
    
  }
  
  spawnDoor(); 
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
    
  }
  
  if(blockGroup.isTouching(ghost)||ghost.y>600){
    
    ghost.destroy();
    gameState="END";
    
  }
  
  drawSprites();
  
}
  
  if(gameState==="END"){
    
    fill("yellow");
    textSize(30);
    text("gameOver",100,300);
    
  }
}

function spawnDoor(){
  
  if (frameCount%200===0){
    
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=1;
    door.x=Math.round(random(120,400));
    doorGroup.add(door);
    door.lifetime=800;
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.x=door.x;
    climberGroup.add(climber);
    climber.lifetime=800;

    block=createSprite(200,15);
    block.velocityY=1;
    block.x=door.x;
    blockGroup.add(block);
    block.lifetime=800;
    block.width=climber.width;
    block.height=2;
    block.shapeColor="green";
  }
  
}


