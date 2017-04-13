



var player
var playerTwo
var Wall1
var Wall2
var Wall3
var Wall4
var Wall
var fallingBlocks
var PlayerOneLives = 5;
var PlayerTwoLives = 5;
var GameOver = false
var Winner = "none"
var Freeze = 0
var resetFallingBlocks
var showInstructions = true;

function setup() {




  createCanvas(800 , 600)

  player = createSprite(300, 500, 40, 40)
  playerTwo = createSprite(500, 500, 40, 40)
  Wall1 = createSprite(400, -50, 800, 100) //North//
  Wall2= createSprite(850, 300, 100, 600) //East//
  Wall3= createSprite(400, 650, 800, 100) //South//
  Wall4= createSprite(-50, 300, 100, 600) //West//
  fallingOne= createSprite(100, 0, 30, 30)
  fallingTwo= createSprite(250, 0, 30, 30)
  fallingThree= createSprite(400, 0, 30, 30)
  fallingFour= createSprite(550, 0, 30, 30)
  fallingFive= createSprite(700, 0, 30, 30)
  Wall1.immovable = true;
  Wall2.immovable = true;
  Wall3.immovable = true;
  Wall4.immovable = true;
player.friction = 0.98;
playerTwo.friction = 0.98;
Wall = Group();
Wall.add(Wall1); //North//
Wall.add(Wall2); //East//
Wall.add(Wall3); //South//
Wall.add(Wall4); //West//
fallingBlocks = Group();
fallingBlocks.add(fallingOne);
fallingBlocks.add(fallingTwo);
fallingBlocks.add(fallingThree);
fallingBlocks.add(fallingFour);
fallingBlocks.add(fallingFive);


for (var i = 0; i < fallingBlocks.length ; i++){
    fallingBlocks.get(i).shapeColor = color(100,0,100); }

player.shapeColor = color(0,50,255)
playerTwo.shapeColor = color(0,255,50)
}



function draw() {
background(230,230,230);

player.bounce(playerTwo);
player.bounce(player);
player.bounce(Wall);
playerTwo.bounce(Wall);
player.bounce(fallingBlocks, resetPlayer);
playerTwo.bounce(fallingBlocks, resetPlayerTwo);

fallingBlocks.bounce(Wall, resetFallingBlocks);

drawSprites();
//UPDATE variables here




for (var i = 0; i < fallingBlocks.length ; i++){
   fallingBlocks.get(i).addSpeed(Freeze*0.2, Freeze*90+random(22*Freeze));
 }

textSize(15)
text("Number of Player One Lives: \n     "+PlayerOneLives,100,400);
textSize(15)
text("Number of Player Two Lives:\n     "+PlayerTwoLives,500,400);





if (showInstructions == true){
  textSize(20)
  text("Player one uses the A & D keys, player two uses the arrow keys. \n Avoid the falling blocks, or knock your opponent into them.", 125, 250);
  textSize(20)
  text("Press the spacebar to begin",275,300);
Freeze = 0
}

if(showInstructions == true && keyDown(32)){
  Freeze = 1
  showInstructions = false

}




if(keyDown(65)){ //Left//
player.addSpeed(Freeze*0.2, 180)
}

if(keyDown(68)){ //Right//
player.addSpeed(Freeze*0.2, 360)
}


if(keyDown(37)){ //Left//
playerTwo.addSpeed(Freeze*0.2, 180)
}

if(keyDown(39)){ //Right//
playerTwo.addSpeed(Freeze*0.2, 360)
}

 if(keyDown(32) && GameOver == true) {


   for (var i = 0; i < fallingBlocks.length ; i++){
     resetPlayer(player,fallingBlocks.get(i)); }


Freeze = 1
GameOver = false
PlayerOneLives = 6
PlayerTwoLives = 6

resetPlayer(player, fallingOne)
resetPlayerTwo(playerTwo, fallingOne )

  }

  if(GameOver){
textSize(30)
text(Winner + " wins! Press Spacebar to reset.", 100, 300)
Freeze = 0;

for (var i = 0; i < fallingBlocks.length ; i++){
    fallingBlocks.get(i).setVelocity(Freeze*0.2, Freeze*90+random(22*Freeze)); }


}







}



  function resetPlayer(spriteA, spriteB) {
    PlayerOneLives = PlayerOneLives -1
      spriteA.position.x=0;
      spriteA.position.y=500;
      spriteA.velocity.x=0;
      spriteA.velocity.y=0;
      spriteB.position.y=50;
      spriteB.velocity.y=0;
      if(PlayerOneLives < 1){

        GameOver = true
        Winner = "Player Two"
      }
  }

  function resetPlayerTwo(spriteA, spriteB) {
    PlayerTwoLives = PlayerTwoLives - 1
      spriteA.position.x=800;
      spriteA.position.y=500;
      spriteA.velocity.x=0;
      spriteA.velocity.y=0;
      spriteB.position.y=50;
      spriteB.velocity.y=0;

      if(PlayerTwoLives < 1){

        GameOver = true
        Winner = "Player One"
      }

  }

  function resetFallingBlocks(spriteA, spriteB) {
      spriteA.position.y=random(100);
      spriteA.velocity.y=0;
      spriteA.position.x=random(800)

  }
