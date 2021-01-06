var ball;

var database;
var lball;
var position

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //initilaize the database
    database=firebase.database();

    //.ref() that refers to the specified location in the database
    lball=database.ref('ball/positions');
    //.on is a continous listener
    lball.on("value",readPosition);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //set() writes the value in to the database in json format
    database.ref('ball/positions').set ({
        'x':position.x+x,
        'y':position.y+y
    })
}
function readPosition(data){
   position= data.val();    //var position={x:200,y:200}
   ball.x  = position.x;
   ball.y= position.y;
}
