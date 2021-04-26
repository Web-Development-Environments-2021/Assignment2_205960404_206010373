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





