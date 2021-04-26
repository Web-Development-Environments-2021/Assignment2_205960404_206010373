var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterInterval;
var emptyCell;
//
var friendPackman = new Object();
var Monster1 = new Object();
var Monster2 = new Object();
var Monster3 = new Object();
var Monster4 = new Object();
var totalMonsters;
var MonstersArray;
var MonsterTemp;

var stopGame = false;
var position_flag;
var friendPackmanFlag;
var side_packman_X = 0.15 * Math.PI;
var side_packman_Y = 1.85 * Math.PI;
var eye_packman_X = 5;
var eye_packman_Y = -15;
var disqualification;
var cookie5;
var cookie15;
var cookie25;
var game_time;
var elmo = new Image();

var Keys;
var BallsNum;
var BallsColor60Per;
var BallColor30Per;
var BallsColor10Per;
var gameTime;
var MonstersNums;

var numBalls60;
var numBalls30;
var numBalls10;
var food_remain;
var food_remain_in_game;

var bol_about = false;

var myMusic;
var musicPlay = false;

$(document).ready(function() {
	 
	//context = canvas.getContext("2d");
	//Start();
	changeDivs('WelcomeDiv');
	

	// Get the modal
var modal = document.getElementById("about");

// Get the button that opens the modal
var btn = document.getElementById("#about");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  bol_about = true;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	bol_about = false;
  modal.style.display = "none";
}

// close about- ESC
$(document).keydown(function(event) { 
	if (event.keyCode == 27) { 
		modal.style.display = "none";
	}
  });

// When the user clicks anywhere outside of the modal, close it
document.getElementById("body").onclick = function(event) {
	aboutModal = document.getElementById('about');
	aboutButton = document.getElementById('#about');
	if(event.target != aboutModal && event.target != aboutButton )
	{
		modal.style.display = "none";
	}
	
}
});

// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

var TIME_LIMIT;
var timePassed;
var timeLeft;
var timerInterval;
var remainingPathColor;



function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


function defaultMonsers(){
	MonsterTemp = new Array();
	MonsterTemp[0] = new Object();
	MonsterTemp[1] = new Object();
	MonsterTemp[2] = new Object();
	MonsterTemp[3] = new Object();

	MonsterTemp[0].i = 1;
	MonsterTemp[0].j = 1;
	MonsterTemp[0].image = new Image();
	MonsterTemp[0].image.src = "images/monster1.png";
	MonsterTemp[1].i = 1;
	MonsterTemp[1].j = 8;
	MonsterTemp[1].image = new Image();
	MonsterTemp[1].image.src = "images/monster2.png";
	MonsterTemp[2].i = 8;
	MonsterTemp[2].j = 1;
	MonsterTemp[2].image = new Image();
	MonsterTemp[2].image.src = "images/monster3.png";
	MonsterTemp[3].i = 8;
	MonsterTemp[3].j = 8;
	MonsterTemp[3].image = new Image();
	MonsterTemp[3].image.src = "images/monster4.png";
}

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

function StartMusic(){
	if(!musicPlay){
	myMusic = new sound('AMNAMNAM.mp3');
	myMusic.play();
	musicPlay = true;
	}
}

function PauseMusic(){
	if(musicPlay){
	myMusic.stop();
	musicPlay = false;
	}
}

function LifeRemmeaning(){
	return disqualification;
}
//function Start(Keys, BallsNum, BallsColor60Per, BallColor30Per, BallsColor10Per, gameTime, MonstersNums) {
function Start() {
	let health = document.getElementById("health")
	health.value = 5; //Or whatever you want to do with it.
	stopGame = false;
	StartMusic();
	MonstersNums = 1;
	totalMonsters = 0;
	board = new Array();
	score = 0;
	pac_color = "blue";
	friendPackmanFlag = false;
	var cnt = 100;
	//var numBalls60 = 0.6 * BallsNum;
	numBalls60 = Math.round(0.6 * 50);
	//var numBalls30 = 0.3 * BallsNum;
	numBalls30 = Math.round(0.3 * 50);
	//var numBalls10 = 0.1 * BallsNum;
	numBalls10 = Math.round(0.1 * 50);
	food_remain = numBalls60 + numBalls30 + numBalls10;
	food_remain_in_game = food_remain + 1; //change
	game_time = 10;


	cookie5 = new Image();
	cookie5.src = "images/cookie5.png";
	cookie15 = new Image();
	cookie15.src = "images/cookie15.png";
	cookie25 = new Image();
	cookie25.src = "images/cookie25.png";
	elmo.src = "images/elmo.png";
	defaultMonsers();
	MonstersArray = new Array();
	for(var indexMonser = 0; indexMonser<MonstersNums;indexMonser++){
			MonstersArray[indexMonser] = new Object();
			MonstersArray[indexMonser].i = MonsterTemp[indexMonser].i;
			MonstersArray[indexMonser].j = MonsterTemp[indexMonser].j;
			MonstersArray[indexMonser].image = MonsterTemp[indexMonser].image;
			totalMonsters++;
	}


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
			// else if ((i == 1 && j == 1) || (i == 1 && j == 8) ||	(i == 8 && j == 1) ||
			// 	(i == 8 && j == 8)) {
				
			// }

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
					placeFood(i,j);
				} 
				
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
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

		emptyCell = findRandomEmptyCell(board);
		placeFood(emptyCell[0],emptyCell[1]);
		//board[emptyCell[0]][emptyCell[1]] = 1;
		//food_remain--;
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
	// LivesVisible();

	

	interval = setInterval(UpdatePosition, 250);
	monsterInterval = setInterval(UpdateMonsterPosition, 1000);
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
	//lblScore.value = score;
	$("#lblScore").html(score.toString());
	let timeView = game_time - time_elapsed;
	$("#lblTime").html(timeView.toString());
	//lblTime.value = time_elapsed;

	// LivesVisible();
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
				context.drawImage(cookie5, center.x-30, center.y-30, 60, 60);
				// context.beginPath();
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// context.fillStyle = "red"; //color
				// context.fill();
			} else if (board[i][j] == 7) {
				context.drawImage(cookie15, center.x-30, center.y-30, 60, 60);
				// context.beginPath();
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// context.fillStyle = "yellow"; //color
				// context.fill();
			} else if (board[i][j] == 8) {
				context.drawImage(cookie25, center.x-30, center.y-30, 60, 60);

				// context.beginPath();
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// context.fillStyle = "pink"; //color
				// context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "white"; //color
				context.fill();
				
			}  else if (board[i][j] >=10) {
				context.drawImage(elmo, center.x-30, center.y-30, 60, 60);

				// context.beginPath();
				// context.rect(center.x - 30, center.y - 30, 60, 60);
				// context.fillStyle = "white"; //color
				// context.fill();
			}
			if (MonsterOnPlace(i,j)) {
				for(var inx=0; inx<MonstersArray.length;inx++){
					if (MonstersArray[inx].i == i && MonstersArray[inx].j == j){
						context.drawImage(MonstersArray[inx].image, center.x-30, center.y-30, 60, 60);
					}
				}
				// context.beginPath();
				// context.rect(center.x - 30, center.y - 30, 60, 60);
				// context.fillStyle = "black"; //color
				// context.fill();
			
			}
		}
	}
}

function MonsterOnPlace(numI, numJ){

	for(var inx=0; inx<MonstersArray.length;inx++){
		if (MonstersArray[inx].i == numI && MonstersArray[inx].j == numJ){
			return true;
		}
	}
	return false;
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

function placeFood(i,j){
	var randomFood = Math.floor(Math.random() * (8 - 6 + 1) + 6); 
	//board[i][j] = randomFood;
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
}

function InitMonsters(){

	switch(totalMonsters){
		case 1:
			MonstersArray[0].i = 1;
			MonstersArray[0].j = 1;
			break;
		case 2:
			MonstersArray[0].i = 1;
			MonstersArray[0].j = 1;
			MonstersArray[1].i = 1;
			MonstersArray[1].j = 8;
			break;
		case 3: 
			MonstersArray[0].i = 1;
			MonstersArray[0].j = 1;
			MonstersArray[1].i = 1;
			MonstersArray[1].j = 8;
			MonstersArray[2].i = 8;
			MonstersArray[2].j = 1;
			break;
		case 4:
			MonstersArray[0].i = 1;
			MonstersArray[0].j = 1;
			MonstersArray[1].i = 1;
			MonstersArray[1].j = 8;
			MonstersArray[2].i = 8;
			MonstersArray[2].j = 1;
			MonstersArray[3].i = 8;
			MonstersArray[3].j = 8;
			break;
	}
}


function UpdateMonsterPosition(){

	for(var inxMon=0; inxMon<MonstersArray.length;inxMon++){
		
		//same Col or Row
		 if(Math.abs(MonstersArray[inxMon].i - shape.i)==0 && shape.j <= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j - 1] != 4){
			MonstersArray[inxMon].j--;
		}
		
		else if (Math.abs(MonstersArray[inxMon].i - shape.i)==0 && shape.j >= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j + 1] != 4){
			MonstersArray[inxMon].j++;
		}

		
		else if(Math.abs(MonstersArray[inxMon].j - shape.j)==0 && shape.i <= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i - 1 ][MonstersArray[inxMon].j ] != 4){
			MonstersArray[inxMon].i--;
		}

		else if (Math.abs(MonstersArray[inxMon].j - shape.j)==0 && shape.i >= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i +1][MonstersArray[inxMon].j ] != 4){
			MonstersArray[inxMon].i++;
		}

		

		else{

			// if(Math.abs(MonstersArray[inxMon].i - shape.i) <= Math.abs(MonstersArray[inxMon].j - shape.j) && shape.i >= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i +1][MonstersArray[inxMon].j ] != 4){
			// 	MonstersArray[inxMon].i++;
			// 	return;
			// }
			
			// if(Math.abs(MonstersArray[inxMon].i - shape.i) >= Math.abs(MonstersArray[inxMon].j - shape.j) && shape.j >= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j +1 ] != 4){
			// 	MonstersArray[inxMon].j++;
			// 	return;
			// }

			// if(Math.abs(MonstersArray[inxMon].i - shape.i) <= Math.abs(MonstersArray[inxMon].j - shape.j) && shape.i <= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i -1][MonstersArray[inxMon].j ] != 4){
			// 	MonstersArray[inxMon].i--;
			// 	return;
			// }

			
			
			// if(Math.abs(MonstersArray[inxMon].i - shape.i) >= Math.abs(MonstersArray[inxMon].j - shape.j) && shape.j <= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j -1] != 4){
			// 	MonstersArray[inxMon].j--;
			// 	return;
			// }

			if( shape.i <= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i -1][MonstersArray[inxMon].j ] != 4){
				MonstersArray[inxMon].i--;
			}

			else if(shape.j >= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j +1 ] != 4){
				MonstersArray[inxMon].j++;
			}

			else if( shape.j <= MonstersArray[inxMon].j && board[MonstersArray[inxMon].i ][MonstersArray[inxMon].j -1] != 4){
				MonstersArray[inxMon].j--;
			}

			else if(shape.i >= MonstersArray[inxMon].i && board[MonstersArray[inxMon].i +1][MonstersArray[inxMon].j ] != 4){
				MonstersArray[inxMon].i++;
				return;
			}
			
			

		
			
			
		}


		// if (Math.abs(MonstersArray[inxMon].i - shape.i)==0){
		// 	if(shape.j > MonstersArray[inxMon].j){
		// 		MonstersArray[inxMon].j++;
		// 	}
		// 	else{
		// 		MonstersArray[inxMon].j--;

		// 	}
		// }
		// else if(Math.abs(MonstersArray[inxMon].j - shape.j)==0){

		// 	if(shape.i > MonstersArray[inxMon].i){
		// 		MonstersArray[inxMon].i++;
		// 	}
		// 	else{
		// 		MonstersArray[inxMon].i--;

		// 	}
		// }

		// else if(Math.abs(MonstersArray[inxMon].i - shape.i) < Math.abs(MonstersArray[inxMon].j - shape.j) && Math.abs(MonstersArray[inxMon].i - shape.i)>0)
		// {
		// 	if(MonstersArray[inxMon].i < shape.i && board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i++;
		// 	}
		// 	else if(MonstersArray[inxMon].i > shape.i && board[MonstersArray[inxMon].i - 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i--;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j + 1] != 4 && MonstersArray[inxMon].j < shape.j){
		// 		MonstersArray[inxMon].j++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j - 1] != 4 && MonstersArray[inxMon].j > shape.j) {
		// 		MonstersArray[inxMon].j--; 

		// 	}


		// 	else if(board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i - 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i--;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j + 1] != 4 ){
		// 		MonstersArray[inxMon].j++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j - 1] != 4 ) {
		// 		MonstersArray[inxMon].j--; 

		// 	}
		// }
		// else{
		// 	if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j + 1] != 4 && MonstersArray[inxMon].j < shape.j){
		// 		MonstersArray[inxMon].j++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j - 1] != 4 && MonstersArray[inxMon].j > shape.j){
		// 		MonstersArray[inxMon].j--;
		// 	}
		// 	else if(MonstersArray[inxMon].i < shape.i && board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j ] != 4 && MonstersArray[inxMon].i > shape.i){
		// 		MonstersArray[inxMon].i--; 
		// 	}


		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j + 1] != 4){
		// 		MonstersArray[inxMon].j++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i][MonstersArray[inxMon].j - 1] != 4 ){
		// 		MonstersArray[inxMon].j--;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j] != 4){
		// 		MonstersArray[inxMon].i++;
		// 	}
		// 	else if(board[MonstersArray[inxMon].i + 1][MonstersArray[inxMon].j ] != 4){
		// 		MonstersArray[inxMon].i--; 
		// 	}
		// }
	}

}
function UpdatePosition() {
	if (timeLeft === 0){
		Draw();
			// window.clearInterval(interval);
			stopIntervals();

		//	myMusic.pause();
			window.alert("Game Over");
	}
	var randomFriendPackman = Math.floor(Math.random() * (4 - 1 + 1) + 1);
	try{
	board[shape.i][shape.j] = 0;
	}
	catch{
		StartNewGame();
	}
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
		food_remain_in_game-=1;
		if (food_remain_in_game==0){
			Draw();
			// window.clearInterval(interval);
			// window.clearInterval(monsterInterval);
			stopIntervals();
			window.alert("Game completed");
		}
	}
	else if (board[shape.i][shape.j] == 7) {
		score+=15;
		food_remain_in_game-=1;
		if (food_remain_in_game==0){
			Draw();
			// window.clearInterval(interval);
			// window.clearInterval(monsterInterval);
			stopIntervals();

			window.alert("Game completed");
		}
	}
	else if (board[shape.i][shape.j] == 8) {
		score+=5;
		food_remain_in_game-=1;
		if (food_remain_in_game==0){
			Draw();
			// window.clearInterval(interval);
			// window.clearInterval(monsterInterval);
			stopIntervals();

			window.alert("Game completed");
		}
	}
	
	else if (MonsterOnPlace(shape.i,shape.j)) {
		score-=10;
		if(score<=0){
			score=0;
		}
		disqualification-=1;
		let health = document.getElementById("health")
		health.value -= 1; //Or whatever you want to do with it.
		if(disqualification == 0){
			Draw();
			// window.clearInterval(interval);
			stopIntervals();

		//	myMusic.pause();
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
	if (score >= 800 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 1000) {
		Draw();
		// window.clearInterval(interval);
		// window.clearInterval(monsterInterval);
		stopIntervals();

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
	if(div == 'GameDiv' || div == "RegisterDiv" || div == "SettingsDiv" || div == "AboutDiv")
	{
		document.body.style.backgroundImage = "url(images/back.jpg)";
	}
	if(div == "WelcomeDiv" || div == "LoginDiv")
	{
		document.body.style.backgroundImage = "url(images/CookieEater.jpg)";
	}
	if(div == 'GameDiv'){
		// context = canvas.getContext("2d");
		// Start();
		StartNewGame();
	}
};

function hideDivs() {
	$('.WelcomeDiv').hide();
	$('.RegisterDiv').hide();
	$('.LoginDiv').hide();
	$('.GameDiv').hide();
	$('.SettingsDiv').hide();
	$('.AboutDiv').hide();
	// resetGame();
};

function StartNewGame(){
	
	stopIntervals();
	context = canvas.getContext("2d");
	Start();
	TIME_LIMIT = game_time;
 	timePassed = 0;
 	timeLeft = TIME_LIMIT;
 	timerInterval = null;
 	remainingPathColor = COLOR_CODES.info.color;
	document.getElementById("app").innerHTML = `
	<div class="base-timer">
	  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<g class="base-timer__circle">
		  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
		  <path
			id="base-timer-path-remaining"
			stroke-dasharray="283"
			class="base-timer__path-remaining ${remainingPathColor}"
			d="
			  M 50, 50
			  m -45, 0
			  a 45,45 0 1,0 90,0
			  a 45,45 0 1,0 -90,0
			"
		  ></path>
		</g>
	  </svg>
	  <span id="base-timer-label" class="base-timer__label">${formatTime(
		timeLeft
	  )}</span>
	</div>
	`;

startTimer();
}

function PauseGame(){
	stopIntervals();
	stopGame = true;
}

function ResumeGame(){
	if (stopGame){
		stopGame = false;
		interval = setInterval(UpdatePosition, 250);
		monsterInterval = setInterval(UpdateMonsterPosition, 1000);
		startTimer();
	}
}
function stopIntervals(){
	clearInterval(interval);
	clearInterval(monsterInterval);
	onTimesUp();
}

function LivesVisible(){
	$("#lifesDiv").html("");
	for(let i=0;i<disqualification;i++){
		let img=new Image(20,30);
		img.src="life.png";
		img.className="lifeImg";
		document.getElementById("lifesDiv").appendChild(img);
	}
}





// //about
// function showAbout() {
// 	changeDivs("AboutDiv")
// 	let modal = document.getElementById('about');
// 	modal.style.display = 'block';
//   }

//   function closeAbout() {
// 	let modal = document.getElementById('about');
// 	modal.style.display = 'none';
// 	changeDivs("WelcomeDiv");
//   }

//   // close about -clickoutside
// let aboutModal = document.getElementById('about');
// $('#body').click(function() {
// 	if (!$(this.target).is(aboutModal)) {
// 	  $("#about").hide();
// 	}
//   });
  
// // close about- ESC
// $(document).keydown(function(event) { 
// 	if (event.keyCode == 27) { 
// 	  $('#about').hide();
// 	  changeDivs("WelcomeDiv");
// 	}
//   });
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Escape') {
//     modal.style.display = 'none';
//   }
// });

