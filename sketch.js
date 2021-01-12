//Create variables here
var dog,happydog,database,foodS,foodStock;
var dogImg1,dogImg2;
var button1 , button2;
var fedTime;
var readState,gameState;
var food;
var c;


function preload()
{
  //load images here
  dogImg1=loadImage("dogImg.png");
  dogImg2=loadImage("dogImg1.png")
  
}

function setup() {
  database=firebase.database();
  createCanvas(950, 500);
  dog = createSprite(850,250,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  food= new Food();
  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  

  var button1 = createButton('Feed the dog ');
  button1.position(750, 300);
  button1.mousePressed(feedDog);

  var button2=createButton('Add food');
  button2.position(850,300);
  button2.mousePressed(addFood);

  var c=createButton('Continue');
  c.position(1150,150);
 

  var input = createInput("Name your dog here");
  input.position(1050,100);
  
  c.mousePressed(function(){
    input.hide();
    c.hide();

    var name = input.value();
    
    
    var greeting = createElement('h3');
    greeting.html("Your dog " + name + " is here , feed him" )
    greeting.position(1000, 350)
  });
  
}


function draw() { 
  currentTime = hour();
  background("cyan") 
  // dog.display();
  food.display();
  drawSprites();
  textSize(20);
  fill(46,139,87);
  text("Food Remaining: "+foodS,170,100);
  
  if(fedTime>=12)
        {
        
        fill("green");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 170,70);
        }
        else if(fedTime==0)
        {
        
            fill("green");
            textSize(15); 
             text("Last Fed : 12 AM",170,70);
        }
        else
        {
        
            fill("green");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 170,70);
        }
 
   
       
      


}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);
  
   foodS--
   database.ref('/').update({
   Food:foodS
  })
  fedTime=hour();
  }

function addFood(){
  dog.addImage(dogImg1);
foodS++
database.ref('/').update({
  Food:foodS
})
}









// var dog,happyDog,sadDog,database,foodS,foodStock;
// var sadDogImg,happyDogImg;
// var feedButton,addFoodButton;
// var food;
// var fedTime;
// var readState,gameState;
// function preload()
// {
//   sadDogImg = loadImage("dogImg.png");
//   happyDogImg = loadImage("dogImg1.png");
// }

// function setup() {
//   database = firebase.database();
//   createCanvas(900,500);
//   dog = createSprite(850,250,15,15);
//   dog.addImage(sadDogImg);
//   dog.scale = 0.25;
//   foodStock = database.ref('Food');
//   foodStock.on("value",readStock);
//   food = new Food();
//   fedTime = database.ref('fedTime');
//   fedTime.on("value",function(data){
//     fedTime = data.val();
//   });
//   readState = database.ref('gameState');
//   readState.on("value",function(data){
//     gameState = data.val();
//   });
//   feedButton = createButton("Feed The Dog");
//   feedButton.position(685,100);
//   feedButton.mousePressed(feedDog);
//   addFoodButton = createButton("Add Food");
//   addFoodButton.position(795,100);
//   addFoodButton.mousePressed(addFood);

// }
// function draw() 
// {
//   currentTime = hour();
//   background(46,139,87);  
//   food.display();
//   drawSprites();
//   textSize(20);
//   fill("white");
//   text("Food Remaining: "+foodS,170,100);
//   if(fedTime>=12)
//         {
//         fill("white");
//         textSize(15); 
//         text("Last Fed : "+ fedTime%12 + " PM", 350,30);
//         }
//         else if(fedTime==0)
//         {
//             fill("white");
//             textSize(15); 
//              text("Last Fed : 12 AM",350,30);
//         }
//         else
//         {
//             fill("white");
//             textSize(15); 
//             text("Last Fed : "+ fedTime + " AM", 350,30);
//         }
// }
// function readStock(data)
// {
//   foodS = data.val();
//   food.updateFoodStock(foodS);
// }
// function feedDog()
// {
//     dog.addImage(happyDogImg);
//     foodS--;
//     database.ref('/').update({
//       Food : foodS
//     })
//     fedTime = hour(); 
// }
// function addFood()
// {
//   dog.addImage(sadDogImg);
//   foodS++;
//   database.ref('/').update({
//     Food:foodS
//   })
// }