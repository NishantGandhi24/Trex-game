var trex,trex_image;
var edge;
var ground,ground_image;
var invisibleGround
var cloud,cloud_image;
var obs,ob1,ob2,ob3,ob4,ob5,ob6;
var score=0;
var cloudgroup;
var obsgro;
var PLAY = 1 , END = 0;
var gamestate = PLAY;
var trexcollide;
var gameover,game_overimage;
var restart,restart_image;
var jump,die,check;


function preload(){
 trex_image = loadAnimation("trex1.png","trex3.png","trex4.png")  
 ground_image = loadImage("ground2.png");
 cloud_image = loadImage("cloud.png");
 ob1=loadImage("obstacle1.png");
 ob2=loadImage("obstacle2.png");
 ob3=loadImage("obstacle3.png");
 ob4=loadImage("obstacle4.png");
 ob5=loadImage("obstacle5.png");
 ob6=loadImage("obstacle6.png");
 trexcollide=loadImage("trex1.png")
 game_overimage=loadImage("game over.png")
 restart_image=loadImage("restart.png");
 jump=loadSound("jump.mp3");
 die=loadSound("die.mp3");
 check=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(700,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_image)
  trex.addImage("collide",trexcollide);
  trex.scale=0.5; 
  
  trex.debug=false;
  trex.setCollider("circle",0,0,30);

  edge=createEdgeSprites();
  ground=createSprite(200,180,400,20);
  ground.addImage("ground",ground_image)
  
  // gameover text
  gameover=createSprite(300,50);
  gameover.addImage("over",game_overimage);
  gameover.scale=0.6;
  // restart button
  restart=createSprite(300,100);
  restart.addImage("rest",restart_image);
  restart.scale=0.6;

  
  
  
  //Creating invisible ground
  invisibleGround=createSprite(200,190,400,10);
  invisibleGround.visible=false;

  
  var rand= Math.round(random(1,100))
  console.log(rand);

   obsgro = new Group()
  cloudgroup = new Group();

  // console.warn("warning");
  // console.error("error");
  // console.info("information"); 
  // console.timeEnd();
  // console.time();
  
}


function draw(){
  //set background color 
  background("white");

  if (gamestate===PLAY){
    //trex jump
    if (keyDown("space")&&(trex.y>140)){
      trex.velocityY= -10;
      jump.play ()
     }
    trex.velocityY = trex.velocityY+0.5;
//moving ground
if (ground.x<0){
  ground.x=ground.width/2
  }

// formula for adaptivity 2+3*score/100
    ground.velocityX=-(2+score/100);


  // increaseing the score
  score=score+Math.round(getFrameRate()/60)
  if(score>0 && score%100===0){
    check.play ();
  }
// to move the clouds and obstacles
  clouds();
  spawn_obstacles();

  restart.visible=false;
  gameover.visible=false;

  // to touch the obstacles
  if (trex.isTouching(obsgro)){
    gamestate=END;
    //trex.velocityY=-10;
    die.play ();
  } }

  else if(gamestate===END){
   trex.velocityY=0;
   ground.velocityX=0;
   trex.changeAnimation("collide",trexcollide);
  // making the clods and abstacles stop
   cloudgroup.setVelocityXEach(0)
   obsgro.setVelocityXEach(0)
  // lifetime for game objects to never disappear
  cloudgroup.setLifetimeEach(-2);
  obsgro.setLifetimeEach(-2);
  gameover.visible=true;
  restart.visible=true;
  }
  //console.log(trex.y);
  trex.collide(invisibleGround);
  text("SCORE: "+score,500,50);

if(mousePressedOver(restart)){
  gamestate=PLAY;
  obsgro.destroyEach();
  cloudgroup.destroyEach();
  trex.changeAnimation("running",trex_image);
  score=0;
}  
  
  drawSprites();
}
function clouds(){
  if(frameCount%60===0){
  cloud=createSprite(600,100,40,40);
  cloud.addImage("clo",cloud_image);
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
 // console.log(cloud.depth);
  cloud.velocityX=-2;
  cloud.y=Math.round(random(1,100));
  // the lifetime=xposition/velocity
  cloud.lifetime=300;
  cloudgroup.add(cloud);
  }}

  function spawn_obstacles(){
    if(frameCount%100===0){
      obs=createSprite(600,160,30,30);
      obs.velocityX=-4
      var tree= Math.round(random(1,6));
      switch(tree){
        case 1 : obs.addImage(ob1);
        break;
        case 2 : obs.addImage(ob2);
        break;
        case 3 : obs.addImage(ob3);
        break;
        case 4 : obs.addImage(ob4);
        break;
        case 5 : obs.addImage(ob5);
        break;
        case 6 : obs.addImage(ob6);obs.scale=0.3;
        break;
        default:
          break;
      }
      obs.lifetime=300;
      obs.scale=0.5;
      obsgro.add(obs);
    }
  }


  