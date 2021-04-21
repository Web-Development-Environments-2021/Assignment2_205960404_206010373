// JavaScript source code
function Login(){
    //let uname= document.getElementById('username').value;
    //let pass= document.getElementById('psw').value;
    //if (loginValid(uname,pass)){
    changeDivs('SettingsDiv');
   // }
    //else {
   //     alert("no good!");
  //  }
}

    


function checkIfUserExists(userName){
     //todo
};
function checkIfPasswordValid(pass)
{
    //todo
}

function checkIfFullNameValid()
{
    //todo
} 

function checkIfMailValid()
{
    //todo
}


function registerInfo(){
    let userName = document.getElementById('usernameRegiser').value;
    //check if exists
    let UserNameExist = checkIfUserExists(userName);
    let pass = document.getElementById('passwordRegiser').value;
    let fullname = document.getElementById('nameRegiser').value;
    let email = document.getElementById('emailReg').value;
    let birthdate = document.getElementById('emailRegiser').value;
    //check Valid
    let validPassword = checkIfPasswordValid(pass);
    let validFullName = checkIfFullNameValid(fullname);
    let validMail = checkIfMailValid(email);

    if (UserNameExist) {
        if (confirm('UserName exists! Wanna login?')) {
            changeDivs("LoginDiv")
        } else {
            changeDivs("WelcomeDiv")
        }
        return;
    }
    if (validPassword && validFullName && validMail) {
        users.push({
            username: userName,
            password: psw,
            fullName: fullname,
            email: mail,
            birthDate: birthdate,
        });
        if (
            confirm('You are Registrated! Wanna start a game now?')
        ) {
            changeDivs("GameDiv")
        } else {
            changeDivs("WelcomeDiv")
        }
    }
}
function randomSettings(){
    // todo
}

function applySettings(){
    // todo
}

const users = [
    {
        username: "k",
        password: "k",
        fullName: "",
        email: "",
        birthDate: ""
    },

    {username: "liad",
    password: "liad1410",
    fullName: "liad Segev",
    email: "Liadey2@gmail.com",
    birthDate: ""
    }]