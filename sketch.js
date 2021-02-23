var main, mainImage
var monster, monsterImage,monster2
var coins, coinsImage
var points
var block
var backgroundImg,ground



function preload(){
mainImage= loadImage("images/Main.png")
coinsImage= loadImage("images/Coin.png")
monsterImage= loadImage("images/Monster.png")
monster2= loadImage("images/Monster2.png")
backgroundImg= loadImage("images/bg.jpg")
}

function setup() {
  
  createCanvas(displayWidth,displayHeight);
  ground= createSprite(displayWidth/2,displayHeight-40,displayWidth*5,20)
  //ground.addImage(back)
 ground.velocityX=-2
 main= createSprite(ground.x-240,ground.y-60,1,1)
 main.addImage("main1",mainImage)
 main.scale=0.1
 monsterGroup= new Group 
 coinGroup= new Group 
}

function draw() {
  background(backgroundImg);  
 if(ground.x<0){
 ground.x=ground.width/2
 text("Gold: "+ points, 500,50);
 
 if(gameState === PLAY){
   ground.velocityX = -4;
  
   
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
   
   if(keyDown("space")&& main.y >=100) {
       main.velocityY = -13;
   }
   
   main.velocityY = main.velocityY + 0.8
   spawnCoins();
   spawnMonsters();

   if(coinGroup.isTouching(main.x)){
    points =points +5
}
   if(monsterGroup.isTouching(main.x)){
       gameState = END;
   }
 }
  else if (gameState === END) {
     ground.velocityX = 0;
    monsterGroup.setLifetimeEach(-1)
    monsterGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0); 
    coinGroup.setLifetimeEach(-1)
    main.velocityY=0
    if(mouseIsPressed){
      gameState=PLAY
      main.x=main.x+100
    }
  }
 }
  drawSprites();
}

function spawnMonsters(){
  if (random(0,1) > 0.995){
    var monster = createSprite(camera.position.x + displayWidth, displayHeight - 50 - 15, 30, 30);
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: monster.addImage(monsterImage);
              break;
      case 2: monster.addImage(monster2);
              break;
              default:break;
            }
            monster .velocityX = -6;      
            monster.scale = 0.05;
            monster.lifetime = 1000;
            monsterGroup.add(monster);
  }
 }
 
 function spawnCoins() {
    if (random(0,1) > 0.995) {
      coins = createSprite(camera.position.x + displayWidth, displayHeight - 50 - 15, 30, 30);
      coins.y = Math.round(random(390,440));
      coins.addImage(coinsImage);
      coins.scale = 0.05;
      coins.velocityX = -3;
      coins.lifetime =1000;
      coinsGroup.add(coins);
     }
 }