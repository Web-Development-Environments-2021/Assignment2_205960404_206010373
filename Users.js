//Login Functions
function Login(){
    let uname= document.getElementById('username').value;
    let pass= document.getElementById('psw').value;
    if (loginValid(uname,pass)){
    changeDivs('SettingsDiv');
   }
    else {
       alert("no good!");
   }
}
   
function LoginValid(uname, pass)
{
    return SavedUsers.some((user) => user.username === uname && user.password === pass);
}

//Register Functions
function checkIfUserExists()
{
    return SavedUsers.some((user) => user.username === uname);
} 

function PasswordOK()
{
    pass
}

function FullNameOK()
{
    pass
} 

function EmailOK()
{
    pass
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
        if (confirm('Sorry... Username already taken')) {
            changeDivs("RegisterDiv")
        return;
    }
    if (PasswordOK && FullNameOK && EmailOK) {
        SavedUsers.push({
            username: userName,
            password: pass,
            fullName: fullname,
            email: email,
            birthDate: birthdate,
        });
        if (
            confirm('Ready to go! Wanna start a game now?')
        ) {
            changeDivs("GameDiv")
        } else {
            changeDivs("WelcomeDiv")
        }
    }
}



// settings Function

function randomSettings(){
    // todo
}

function applySettings(){
    // todo
}

const SavedUsers = 
[
    {
        username: "k",
        password: "k",
        fullName: "",
        email: "",
        birthDate: ""
    },

    {
        username: "liad",
        password: "liad1410",
        fullName: "liad Segev",
        email: "Liadey2@gmail.com",
        birthDate: ""
    }
];