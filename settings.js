function KeyBoards() {
    //todo
}


function NumOfBallsChosen(val) {
    document.getElementById('NumOfBallsChosen').innerHTML = val;
}

function validateGameTime(time) {
    return time < 60 ? false : true;
}

/**
 * This function gets the keys the user press for movment and show them to the user
 */
$(document).ready(function () {
	setKeyPressed("#keyup");
	setKeyPressed("#keydown");
	setKeyPressed("#keyleft");
	setKeyPressed("#keyright");
});

/**
 * This function sets a listener for each user input key to show the user the key he pressed
 * @param {*} keyIdToSet key input id to set the listener to
 */
function setKeyPressed(keyIdToSet) {
	$(keyIdToSet).keydown(function (event) {
		$(keyIdToSet).attr("placeholder", event.key);
		$(keyIdToSet).val(event.key);
	});
}



function applySettings(){
	let keyUp = document.getElementById("keyup").placeholder;
	let keyDown = document.getElementById("keydown").placeholder;
	let keyRight = document.getElementById("keyright").placeholder;
	let keyLeft= document.getElementById("keyleft").placeholder;
	let numOfBallsFromUser = document.getElementById('NumOfBallsChosenVal').value;
	let smallCookieColor = document.getElementById('Colorfor10').value;
	let mediumCookieColor = document.getElementById('Colorfor30').value;
	let largeCookieColor = document.getElementById('Colorfor60').value;
	let gameTimeFromUser = document.getElementById('GameTimeVal').value;
	let numOfMonstersFromUser = document.getElementById('numOfMonstersValue').value;
	alert("blahblah");
}

function randomSettings(){
	    keyUp= 38
		keyDown= 40
		keyRight= 37
		keyLeft= 39
		numOfBallsFromUser = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
		smallCookieColor = getRandomColor();
	    mediumCookieColor = getRandomColor();
	    largeCookieColor = getRandomColor();
		gameTimeFromUser = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
	    numOfMonstersFromUser = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		StartNewGame()
		changeDivs("GameDiv")
		return true;


function getRandomColor(){
	var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
}