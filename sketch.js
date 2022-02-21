var PLAY = 1;
var END = 0;
var gameState = 1;

var Sonic,Sonic_running,Sonic_collided;

var Sonic_ground;

var obstacle1,obstacle2,obstacle3,obstacle4,obstaclesGroup;

var Sonic_gameOver,Sonic_restart;

var score = 0

function preload()
{
  
  
  Sonic_running = loadAnimation("sonic1.png","sonic2.png","sonic3.png","sonic4.png");
  Sonic_collided = loadImage("sonic_collided.png");
  
  Sonic_ground = loadImage("sonicground.png");
  
  obstacle1 = loadImage("sonicrobot1.png")
  obstacle2 = loadImage("sonicrobot2.png")
  obstacle3 = loadImage("sonicrobot3.png")
  obstacle4 = loadAnimation("sonicrobot4.1.png","sonicrobot4.2.png")
  
  Sonic_gameOver = loadImage("sonicgameOver.png")
  Sonic_restart = loadImage("sonicrestart.png")
  
}

function setup() 
{
  createCanvas(600,400);
  
  Sonic = createSprite(40,290,10,10);
  Sonic.addAnimation("running",Sonic_running);
  Sonic.addImage("collided",Sonic_collided);
  Sonic.scale = 0.15;
  Sonic.frameDelay = 1;
  Sonic.setCollider("rectangle",0,0,400,400)
  
  ground = createSprite(200,420,300,10);
  ground.addImage("ground",Sonic_ground);
  ground.scale = 1.9;
  //ground.debug = true
  
  ground.depth = Sonic.depth;
  Sonic.depth = Sonic.depth + 1;
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage("gameover",Sonic_gameOver);
  gameOver.visible = false;
  
  restart = createSprite(300,175,10,10);
  restart.addImage("restart",Sonic_restart);
  restart.scale = 0.7;
  restart.visible = false;
  
  invisibleGround = createSprite(300,295,600,10)
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
}

function draw() 
{
  background(0);
  text("Score: "+ score, 500,50);
  

  
  if (gameState === PLAY)
    {
      score = score + Math.round(getFrameRate()/60);
        
      ground.velocityX = -(1 + 2*score/100);
      if (ground.x < 0)
        {
          ground.x = ground.width/3;
        }
      
      if(keyDown("space") && Sonic.y >= 170) 
      {
      Sonic.velocityY = -12;
      }
      Sonic.velocityY = Sonic.velocityY + 0.8      
      
      Sonic.collide(invisibleGround);
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(Sonic))
        {
          gameState = END
        }
    }
  
 else  if (gameState === END)
    {
    
    gameOver.visible = true;
    restart.visible = true;
    
      Sonic.scale = 1

    ground.velocityX = 0;
    Sonic.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
  
    Sonic.changeAnimation("collided",Sonic_collided);  

    obstaclesGroup.setLifetimeEach(-1);
    
      if(mousePressedOver(restart))
        {
          reset();
        }
    }

  
  drawSprites();
}


function spawnObstacles()
{
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,200,10,10);
    obstacle.velocityX = -5;
    obstacle.debug = true;
    var rand = Math.round(random(4,4));
   if (rand === 1)
    {
      obstacle.addImage("bug",obstacle1);
      obstacle.scale = 1
      obstacle.setCollider("circle",0,10,32)
      obstacle.y = 280
    }
    else if (rand === 2)
  {
    obstacle.addImage("bee",obstacle2);
    obstacle.scale = 1
    obstacle.setCollider("rectangle",0,0,120,40)
    obstacle.y = 200
  }
    else if (rand === 3)
  {  
        obstacle.addImage("crab",obstacle3);
        obstacle.scale = 1
        obstacle.setCollider("rectangle",10,-45,60,50)
      obstacle.y = 285
  } 
    else if (rand === 4)
  {  
      obstacle.addAnimation("pufferfish",obstacle4);
     // obstacle.scale = 0.8;      
      obstacle.setCollider("circle",0,5,40)
      obstacle.y = 270
  }         
    obstacle.lifetime = 350;
    obstacle.collide(invisibleGround);
    obstaclesGroup.add(obstacle);
  } 
  
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  Sonic.changeAnimation("running",Sonic_running);
  Sonic.y = 290
  Sonic.scale = 0.15;
  
  score = 0
}