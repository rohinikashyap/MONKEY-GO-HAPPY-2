var banana_Image,foodGroup;
var monkey,monkey_running;
var backgrounds,background_Image;
var obstacle,obstacle_Image,obstacleGroup;
var score;

var PLAY;
var END;
var gameState;


function preload(){
  banana_Image = loadImage("banana.png");
  monkey_running= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);
  
  
  background_Image = loadImage("jungle3.png");
  obstacle_Image = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
 
  
  monkey=createSprite(50,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  backgrounds=createSprite(200,380,1000,20);
  
  backgrounds.x = backgrounds.width /2;
  backgrounds.velocityX = -4;
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  fill("black");
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background("white");
  
 
  if(gameState === PLAY){
     
  if (backgrounds.x < 0){
    backgrounds.x = backgrounds.width/2;
  }
  
  
  if(keyDown("space") && monkey.y>=322){
   monkey.velocityY=-18 ;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
    
    
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale=0.1;
    score=0;
    gameState=END;
    
    }
    
    
    if(foodGroup.isTouching(monkey)){
      
    foodGroup.destroyEach();
    score=score+2;
      
    switch(score) {
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.14;
              break;
      case 30: monkey.scale=0.16;
              break;
      case 40: monkey.scale=0.18;
              break;
      
      default: break;
    

  }
    }
    
    spawnbanana();
  spawnobstacle();
    

  }
  else if(gameState === END){
        
    
    //set velcity of each game object to 0
    backgrounds.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);  
    
    }
  
  
  monkey.collide(backgrounds);
  
  text("Score : "+score,100,50);
  
    
  
  drawSprites();
  
}



function spawnbanana() {
  
  if (frameCount % 130 === 0) {
    var banana = createSprite(400,400,40,10);
    banana.y = Math.round(random(150,200));
    banana.addImage(banana_Image);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    foodGroup.add(banana);
    
    }
  }
  


function spawnobstacle() {
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(350,360,40,10);
    
    obstacle.addImage(obstacle_Image);
    obstacle.scale = 0.1;
    
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
  }
  
}