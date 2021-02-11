var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
//var believer , b1

function preload(){
  trex_running = loadAnimation("2.png","3.png");
  trex_collided = loadAnimation("standig.png");
  
  //groundImage = loadImage("road.jpg");
  
  cloudImage = loadImage("hay cut.png");
  
  obstacle1 = loadImage("rock.jpg.png");
  //believer=loadSound("believer.mp3");
  
  //restartImg = loadImage("restart.png")
  //gameOverImg = loadImage("gameOver.png")
  
  //jumpSound = loadSound("jump.mp3")
 // dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1000, 300);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,250,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;
  
  ground = createSprite(200,260,400,20);
  //ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
 ground.visible=0;
  
 
  
  invisibleGround = createSprite(200,270,400,100);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,40,40);
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background("blue");
  //displaying score
  stroke("white");
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){  

    
    
    ground.velocityX = -(4 + 3* score/250)
    //scoring
    //score = score + Math.round(frameCount/60);
    

    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        gameState = END;

      
    }
  }
   else if (gameState === END) {
      
     
     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);

if(cloudsGroup.isTouching(trex)){
  score= score+1;
}

  drawSprites();
}

function reset(){
  

}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,230,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacle1);
    //generate random obstacles
  
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var cloud = createSprite(600,250,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
    if(cloudsGroup.isTouching(trex)){
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      cloudsGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
    }
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

