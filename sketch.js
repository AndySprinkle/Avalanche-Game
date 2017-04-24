



var player
var playerTwo
var Wall1
var Wall2
var Wall3
var Wall4
var Wall
var fallingBlocks
var PlayerOneLives = 5; //number of lives the players start with//
var PlayerTwoLives = 5;
var GameOver = false
var Winner = "none"
var Freeze = 0 //All movement speeds/varialbes are multiplied by Freeze.  It starts off at 0, freezing all movement.  Once showinstructions becomes false then the game will start and freeze will become 1//
var resetFallingBlocks
var showInstructions = true;  //will display how the game is played, and will dissapper when the space bar is pressed//
var level = 1
var time
var blocksDodged = 0
var mostBlocksDodged = 0

function setup() {


time = millis();

  createCanvas(800 , 600)

  player = createSprite(300, 500, 40, 40) //This is player one//
  playerTwo = createSprite(500, 500, 40, 40) //This is player two//
  Wall1 = createSprite(400, -50, 800, 100) //North//
  Wall2= createSprite(850, 300, 100, 600) //East//
  Wall3= createSprite(400, 650, 800, 100) //South//
  Wall4= createSprite(-50, 300, 100, 600) //West//
  fallingOne= createSprite(100, 0, 30, 30) //These are the five blocks that fall that they players try to avoid//
  fallingTwo= createSprite(250, 0, 30, 30)
  fallingThree= createSprite(400, 0, 30, 30)
  fallingFour= createSprite(550, 0, 30, 30)
  fallingFive= createSprite(700, 0, 30, 30)
  Wall1.immovable = true; //These immovable arguments prevent the players from moving through them//
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
fallingBlocks = Group(); //I've grouped all the falling blocks into one, making it eaiser to code amd have them do the same things//
fallingBlocks.add(fallingOne);
fallingBlocks.add(fallingTwo);
fallingBlocks.add(fallingThree);
fallingBlocks.add(fallingFour);
fallingBlocks.add(fallingFive);


for (var i = 0; i < fallingBlocks.length ; i++){
    fallingBlocks.get(i).shapeColor = color(100,0,100); } //Sets the color of the falling blocks to purple//

player.shapeColor = color(0,50,255) //Sets the player one color to blue//
playerTwo.shapeColor = color(0,255,50) //Sets the player two color to green//
}



function draw() {
background(230,230,230); //Sets the backroung to a light grey color//

player.bounce(playerTwo); //Prevents the two players from moving through eachother//
player.bounce(player); //Does nothing//
player.bounce(Wall); //Makes player one bounce off the walls when a collosion occurs//
playerTwo.bounce(Wall);//Makes player two bounce off the wall when a collosion occurs//
player.bounce(fallingBlocks, resetPlayer); //Makes player one reset itself when a falling block collides with it//
playerTwo.bounce(fallingBlocks, resetPlayerTwo); //Makes player two reset itself when a falling block collides with it//

fallingBlocks.bounce(Wall, resetFallingBlocks);

drawSprites();
//UPDATE variables here




for (var i = 0; i < fallingBlocks.length ; i++){
   fallingBlocks.get(i).addSpeed(Freeze*0.2*level, Freeze*90+random(22*Freeze)); //Sets the velocity of the falling blocks to 0.2, sets the angle at which they fall to 90 degrees (straight down), and the (22)random means they will fall randomly within 22 degrees of straight down//
 }

textSize(15)
text("Blocks Dodged: "+blocksDodged,100,100)
textSize(15)
text("Most Blocks Dodged: "+mostBlocksDodged,100,150)

textSize(15) //Increaces the text size of the message below//
text("Number of Player One Lives: \n     "+PlayerOneLives,100,400); //Shows the number of lives player one has left//
textSize(15)//Increaces the text size of the message below//
text("Number of Player Two Lives:\n     "+PlayerTwoLives,500,400); //Shows the number of lives player one has left//

if((int)(millis() / 1000) % 5 ==0){ //gradually increaces the speed of the falling blocks every 5 seconds//

level = level+0.001

}


if (blocksDodged > mostBlocksDodged && GameOver == true) {

mostBlocksDodged = blocksDodged
blocksDodged = 0

}




if (showInstructions == true){
  textSize(20) // Below are the instrucitons//
  text("Player one uses the A & D keys, player two uses the arrow keys. \n Avoid the falling blocks, or knock your opponent into them.", 125, 250);
  textSize(20) // Below shows how to turn off the instructions and start the game//
  text("Press the spacebar to begin",275,300);
Freeze = 0 //If showInstructions = true, then freeze = 0, stopping all movement//
}

if(showInstructions == true && keyDown(32)){ //If show instructions is on, and the spacebar is pressed, then show instructions will become false and the game will unfreeze//
  Freeze = 1
  showInstructions = false
blocksDodged = 0
level = 1
}


//These are the arrow key and asdw key controls for the players//

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

 if(keyDown(32) && GameOver == true) { //this is where the game resets itself//

blocksDodged = 0
   for (var i = 0; i < fallingBlocks.length ; i++){
     resetPlayer(player,fallingBlocks.get(i)); }  //not sure what this does but I think its importnat//

//the four variables below probalby don't need to be reitterated, but they arent hurting anything//
Freeze = 1
GameOver = false
PlayerOneLives = 6 //Playe one lives kept setting it self to 4 at the start, so I reset it to 6//
PlayerTwoLives = 6

//these two things are also repetitive, but not harmful//
resetPlayer(player, fallingOne)
resetPlayerTwo(playerTwo, fallingOne )

  }

  if(GameOver){ //shows what happens when gameover becomes true//
textSize(30)
text(Winner + " wins! Press Spacebar to reset.", 100, 300)
Freeze = 0;

for (var i = 0; i < fallingBlocks.length ; i++){
    fallingBlocks.get(i).setVelocity(Freeze*0.2*level, Freeze*90+random(22*Freeze)); }


}







}



  function resetPlayer(spriteA, spriteB) { //what happens when player one gets itself reset via colliding with falling block//
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

      blocksDodged = blocksDodged + 1

  }
