function KeyBoards() {
    //todo
}


function NumOfBallsChosen(val) {
    document.getElementById('NumOfBallsChosen').innerHTML = val;
}

function validateGameTime(time) {
    return time < 60 ? false : true;
}

let numOfBallsFromUser = document.getElementById('NumOfBallsChosenValue').value;
//let ballColor60FromUser = document.getElementById('set-color-picker-60').value;
//let ballColor30FromUser = document.getElementById('set-color-picker-30').value;
//let ballColor10FromUser = document.getElementById('set-color-picker-10').value;
let gameTimeFromUser = document.getElementById('GameTimeVal').value;
let numOfMonstersFromUser = document.getElementById('numOfMonstersValue').value;