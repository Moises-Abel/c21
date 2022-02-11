var path,chens,cash,jwellery,saw;
var pathImg,chenImg,cashImg,sawImg;
var treasureCollection = 0;
var cashG,jwelleryG,sawGroup;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  chensImg = loadAnimation("chenschamarra2.png","Cheems_chamara.png");
  cashImg = loadImage("cash.png");
  jwelleryImg = loadImage("jwell.png");
  sawImg = loadImage("Circular_saw_blade1.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


chens = createSprite(width/2,height-20,20,20);
chens.addAnimation("chens",chensImg);
chens.scale=0.4;
  
  
cashG=new Group();
jwelleryG=new Group();
sawGroup=new Group();

}

function draw() {

  
  if(gameState===PLAY){
  background(0);
  chens.x = World.mouseX;
  
  edges= createEdgeSprites();
  chens.collide(edges);
  
  if(path.y > 400 ){
    path.y = height/2;
  }
   
    createCash();
    createJwellery();
    createSaw();

    if (cashG.isTouching(chens)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
      
    }else if(jwelleryG.isTouching(chens)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(sawGroup.isTouching(chens)) {
        gameState=END;
        
        chens.addAnimation("chens",endImg);
        chens.x=width/2;
        chens.y=height/2;
        chens.scale=0.6;
        
        cashG.destroyEach();
        jwelleryG.destroyEach();
        sawGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        sawGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}





function createJwellery() {
  if (World.frameCount % 410 == 0) {

    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSaw(){
  if (World.frameCount % 530 == 0) {

    var saw = createSprite(Math.round(random(50, 350),40, 10, 10));
    saw.addImage("saw",sawImg);
  saw.scale=.05;
  saw.velocityY = 4;
  saw.lifetime = 200;
  sawGroup.add(saw);
  }
}