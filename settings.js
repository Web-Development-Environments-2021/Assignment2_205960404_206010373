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
	setKeyPressed("#keyUp");
	setKeyPressed("#keyDown");
	setKeyPressed("#keyLeft");
	setKeyPressed("#keyRight");
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
	let keyUp = getElementById("keyup").placeholder;
	let keyDown = getElementById("keydown").placeholder;
	let keyRight = getElementById("keyright").placeholder;
	let keyLeft= getElementById("keyleft").placeholder;
	let numOfBallsFromUser = document.getElementById('NumOfBallsChosenValue').value;
	let ball10ColorFromUser = document.getElementById('ColorFor10').value;
	let ball30ColorFromUser = document.getElementById('Colorfor30').value;
	let ball60ColorFromUser = document.getElementById('Colorfor60').value;
	let gameTimeFromUser = document.getElementById('GameTimeVal').value;
	let numOfMonstersFromUser = document.getElementById('numOfMonstersValue').value;
}

function randomSettings(){
	pass
}