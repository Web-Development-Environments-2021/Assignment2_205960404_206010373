var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//
var friendPackman = new Object();
var Monster1 = new Object();
var Monster2 = new Object();
var Monster3 = new Object();
var Monster4 = new Object();
var totalMonsters;

var position_flag;
var friendPackmanFlag;
var side_packman_X = 0.15 * Math.PI;
var side_packman_Y = 1.85 * Math.PI;
var eye_packman_X = 5;
var eye_packman_Y = -15;
var disqualification;

var Keys;
var BallsNum;
var BallsColor60Per;
var BallColor30Per;
var BallsColor10Per;
var gameTime;
var MonstersNums;

var myMusic;

$(document).ready(function() {
		
	//context = canvas.getContext("2d");
	//Start();
	changeDivs('WelcomeDiv');
});


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//function Start(Keys, BallsNum, BallsColor60Per, BallColor30Per, BallsColor10Per, gameTime, MonstersNums) {
function Start() {
	myMusic = new sound('AMNAMNAM.mp3');
	myMusic.play();
	MonstersNums = 4;
	totalMonsters = 0;
	board = new Array();
	score = 0;
	pac_color = "blue";
	friendPackmanFlag = false;
	var cnt = 100;
	//var numBalls60 = 0.6 * BallsNum;
	var numBalls60 = 0.6 * 50;
	//var numBalls30 = 0.3 * BallsNum;
	var numBalls30 = 0.3 * 50;
	//var numBalls10 = 0.1 * BallsNum;
	var numBalls10 = 0.1 * 50;
	var food_remain = numBalls60 + numBalls30 + numBalls10;

	disqualification = 5;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if ((i == 3 && j == 3) || (i == 3 && j == 4) ||	(i == 3 && j == 5) ||
				(i == 6 && j == 1) || (i == 6 && j == 2) || (i==0) || (j==0) || (i==9) || (j==9) ){
				board[i][j] = 4; //wall
			} 
			else if ((i == 1 && j == 1) || (i == 1 && j == 8) ||	(i == 8 && j == 1) ||
				(i == 8 && j == 8)) {
					if (MonstersNums >0){	
						switch(MonstersNums){
							case 1:
								Monster1.i = i;
								Monster1.j = j
								break;
							case 2:
								Monster2.i = i;
								Monster2.j = j
								break;
							case 3:
								Monster3.i = i;
								Monster3.j = j
								break;
							case 4:
								Monster4.i = i;
								Monster4.j = j
								break;

						}
					MonstersNums--;
					totalMonsters++;
					board[i][j] = 5; //monster
				} 
			}

			else if( i==4 && j==4){
				board[i][j] = 10;
				friendPackman.i = 4;
				friendPackman.j = 4;
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					
					// 10 - friendPackman
					// 8 - 60
					// 7 - 30
					// 6 - 10
					// 5 - Monsters
					var randomFood = Math.floor(Math.random() * (8 - 6 + 1) + 6); 
					board[i][j] = randomFood;
					switch(randomFood){
						case 6:
							if (numBalls10 != 0){
								numBalls10--;
								food_remain--;
								board[i][j] = 6;
								break;
							}
							else{
								randomFood = Math.floor(Math.random() * (8 - 6 + 1) + 6);
							}
							
						case 7:
							if (numBalls30 != 0){
								numBalls30--;
								food_remain--;
								board[i][j] = 7;
								break;
							}
							else{
								randomFood = Math.floor(Math.random() * (8 - 6 + 1) + 6);
							}
						case 8:
							if (numBalls60 != 0){
								numBalls60--;
								food_remain--;
								board[i][j] = 8;
								break;
							}
							else{
								randomFood = Math.floor(Math.random() * (8 - 6 + 1) + 6);
							}
					}

					//food_remain--;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				//
				if(position_flag==1){ // key up
					side_packman_X =1.65 * Math.PI;
					side_packman_Y =1.35 * Math.PI;
					eye_packman_X = -15;
					eye_packman_Y = -10;
				}

				if(position_flag==2){ // key down
					side_packman_X = 0.65 * Math.PI;
					side_packman_Y = 0.35 * Math.PI;
					eye_packman_X = -15;
					eye_packman_Y = 10;
				}

				if(position_flag==3){ //key left
					side_packman_X = 1.15 * Math.PI;
					side_packman_Y = 0.85 * Math.PI;
					eye_packman_X = -5;
					eye_packman_Y = -15;
				}

				if(position_flag==4){ //key right
					side_packman_X = 0.15 * Math.PI;
					side_packman_Y = 1.85 * Math.PI;
					eye_packman_X = 5;
					eye_packman_Y = -15;	

				}
				//
				context.beginPath();
				context.arc(center.x, center.y, 30, side_packman_X, side_packman_Y); // half circle - Right
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + eye_packman_X, center.y + eye_packman_Y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			//} else if (board[i][j] == 1) {
			//	context.beginPath();
			//	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			//	context.fillStyle = "black"; //color
			//	context.fill();
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
				context.fill();
			} else if (board[i][j] == 8) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "pink"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "black"; //color
				context.fill();
			
			} else if (board[i][j] >=10) {

				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "white"; //color
				context.fill();
			}
		}
	}
}

function RandomPositionPackman(){

	var NotEmpty = false;
	while(!NotEmpty){
		var RandomI = Math.floor(Math.random() * (8 - 1 + 1) + 1);
		var RandomJ = Math.floor(Math.random() * (8 - 1 + 1) + 1);
		if (board[RandomI][RandomJ] == 0){
			shape.i = RandomI;
			shape.j = RandomJ;
			board[RandomI][RandomJ] = 2;
			position_flag = 4;
			NotEmpty = true;
		}
	}
	
}


function InitMonsters(){

	switch(totalMonsters){
		case 1:
			Monster1.i = 1;
			Monster1.j = 1;
			break;
		case 2:
			Monster1.i = 1;
			Monster1.j = 1;
			Monster2.i = 1;
			Monster2.j = 9;
			break;
		case 3: 
			Monster1.i = 1;
			Monster1.j = 1;
			Monster2.i = 1;
			Monster2.j = 9;
			Monster3.i = 9;
			Monster3.j = 1;
			break;
		case 4:
			Monster1.i = 1;
			Monster1.j = 1;
			Monster2.i = 1;
			Monster2.j = 8;
			Monster3.i = 8;
			Monster3.j = 1;
			Monster4.i = 8;
			Monster4.j = 8;
			break;
	}
}

function UpdatePosition() {
	var randomFriendPackman = Math.floor(Math.random() * (4 - 1 + 1) + 1);
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	//
	position_flag = x;
	//
	if (!friendPackmanFlag){updatePackmenFriendPosition(randomFriendPackman);}

	if (x == 1) { // Up Side
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		
	}
	if (x == 2) { //Down Side
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		
	}
	if (x == 3) { // Left Side
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		
	}
	if (x == 4) { // Right Side
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		
	}
	//if (board[shape.i][shape.j] == 1) {
	//	score++;
	//}

	if(board[shape.i][shape.j] >= 10)
	{
		board[shape.i][shape.j]-=10;
		score+=50;
		friendPackmanFlag = true;
	}
	else if (board[shape.i][shape.j] == 6) {
		score+=25;
	}
	else if (board[shape.i][shape.j] == 7) {
		score+=15;
	}
	else if (board[shape.i][shape.j] == 8) {
		score+=5;
	}
	else if (board[shape.i][shape.j] == 5) {
		score-=10;
		disqualification-=1;
		if(disqualification == 0){
			Draw();
			window.clearInterval(interval);
			window.alert("Game Over");
		}
		else{
			RandomPositionPackman();
			InitMonsters();
			var currentTime = new Date();
			time_elapsed = (currentTime - start_time) / 1000;
			Draw();
		}
	}
	else{
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 80 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 100) {
		Draw();
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}



}


function updatePackmenFriendPosition(randomFriendPackman) {

	if (randomFriendPackman == 1) { // Up Side
		if (friendPackman.j > 0 && board[friendPackman.i][friendPackman.j - 1] != 4) {
			board[friendPackman.i][friendPackman.j]-=10;
			friendPackman.j--;
			board[friendPackman.i][friendPackman.j]+=10;
		}
		
	}
	else if (randomFriendPackman == 2) { //Down Side
		if (friendPackman.j < 9 && board[friendPackman.i][friendPackman.j + 1] != 4) {
			board[friendPackman.i][friendPackman.j]-=10;
			friendPackman.j++;
			board[friendPackman.i][friendPackman.j]+=10;
		}
		
	}
	else if (randomFriendPackman == 3) { // Left Side
		if (friendPackman.i > 0 && board[friendPackman.i - 1][friendPackman.j] != 4) {
			board[friendPackman.i][friendPackman.j]-=10;
			friendPackman.i--;
			board[friendPackman.i][friendPackman.j ]+=10;

		}
		
	}
	else if (randomFriendPackman == 4) { // Right Side
		if (friendPackman.i < 9 && board[friendPackman.i + 1][friendPackman.j] != 4) {
			board[friendPackman.i][friendPackman.j]-=10;
			friendPackman.i++;
			board[friendPackman.i][friendPackman.j ]+=10;
			}
		}

}

function changeDivs(div) {
	hideDivs();
	$('.' + div).show();
	if(div == 'GameDiv'){
		context = canvas.getContext("2d");
		Start();
	}
};

function hideDivs() {
	$('.WelcomeDiv').hide();
	$('.RegisterDiv').hide();
	$('.LoginDiv').hide();
	$('.GameDiv').hide();
	$('.SettingsDiv').hide();
	$('.about').hide();
	// resetGame();
};



