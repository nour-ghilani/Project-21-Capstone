var plane, plane_running;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacleImage;
var gameOver, overImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
function preload(){
plane_running = loadImage("plane1.png");

//groundImage = loadImage("game1.jpg");
cloudImage = loadImage("cloud2.png");
obstacleImage = loadImage("met1.png");
overImage = loadImage("over1.png");
}

function setup() {
 createCanvas(1000,500);

// invisibleGround = createSprite(200,400,400,10);
 //invisibleGround.visible = false;

 plane = createSprite(170,200,400,200);
 plane.addImage("running",plane_running);
plane.scale = 1;

gameOver = createSprite(400,200);
gameOver.addImage("final",overImage);
gameOver.scale = 0.4;
cloudsGroup = createGroup();
obstaclesGroup = createGroup();
}

function draw() {
    background("lightblue");
    textSize(26);
    text("Score: "+ score, 800,50);

    if(gameState === PLAY)
    {
    score = score + Math.round(getFrameRate()/60);

 gameOver.visible = false;

   if(keyDown("space")&& plane.y>=100)
    {
        plane.velocityY = -10;
    }
    plane.velocityY = plane.velocityY + 0.8;

    console.log(plane.y);
    
   // plane.debug = true;
    plane.setCollider("rectangle",-10,-20,350,120);

    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(plane)||plane.y>500)
    {
        gameState = END;
    }
   // plane.collide(invisibleGround);
    }
    else if(gameState === END)
    {
        gameOver.visible = true;
       obstaclesGroup.destroyEach();
       obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    plane.destroy();
     plane.velocityY = 0;
    cloudsGroup.destroyEach();
    
   
    background("lightblue");
    
     cloudsGroup.depth = gameOver.depth;
     gameOver.depth  = gameOver.depth+1;
   
   }
  
drawSprites();
}


function spawnObstacles()
{
    if(frameCount%150 == 0)
    {
        obstacle = createSprite(1000,400,100,100);
        obstacle.y = Math.round(random(80,400));
        obstacle.addImage(obstacleImage);
        
        obstacle.velocityX = -4;
        obstacle.lifetime = 400;
//obstacle.debug = true;

obstacle.setCollider("rectangle",-15,-10,350,90);
        obstacle.scale = 0.4;

        obstaclesGroup.add(obstacle);
    }
}

function spawnClouds()
{
    if(frameCount%60==0)
    {
        cloud = createSprite(1000,400,100,100);
        cloud.y = Math.round(random(80,400));
        cloud.addImage(cloudImage);
        cloud.scale = Math.random(0.4,0.5);
        cloud.velocityX = -3;
        cloud.lifetime = 400;

        plane.depth = cloud.depth;
        plane.depth = plane.depth+1;
     

        cloudsGroup.add(cloud);

      
    }
}