//DB
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


//Valid Functions

//login
$.validator.addMethod("fullnamecheck", function(value) {
    return /^[a-zA-Z ]+$/.test(value);
});

$.validator.addMethod("pwcheck", function(value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        && /[a-z]/.test(value) // has a lowercase letter
        && /\d/.test(value) // has a digit
 });


$.validator.addMethod("passwordMatch", function() {
    let uname1 = $('#uname').val();
    let pass1 = $('#pass').val();

    return LoginValid(uname1,pass1);
});

// Jquery Validation
$(document).ready(function() {

    //register
    $("#RegisterDivForm").validate({
        rules: {
            userName: {
                required: true
            },
            psw: {
                required: true,
                minlength: 6,
                pwcheck: true,
            },
            fullname: {
                required: true,
                fullnamecheck: true,
            },
            email: {
                required: true,
                email: true,
            }
        },


        messages: {
            userName: "Enter your username.",
            psw: {
                required: "Enter your password.",
                minlength: "Password must consist at least 6 characters.",
                pwcheck: "Password must include at least one character and least one digit."
            },
            fullname: {
                required: "Enter your full name.",
                fullnamecheck: "Name can only consist alphabetic chars."
            },
            email: {
                required: "Enter your Email.",
                email: "Enter valid Email. ( example@gmail.com )",
            },
        },
        
        // errorPlacement: function(error, element) {
        //     $(".myerror").html(error)
        //   },
        
        // submitHandler: function() {

        //     let username = $('#userName').val();
        //     let password = $('#psw').val();
        //     let fullname = $('#fullname').val();
        //     let email = $('#email').val();
        //     let birthDate = $('#birthDate').val();

        //     let UserNameExist = checkIfUserExists(username);
        //     if (UserNameExist){
        //         alert('Sorry... Username already taken');
        //     }
        //     else{
        //     SavedUsers.push({
        //         username: username,
        //         password: password,
        //         fullName: fullname,
        //         email: email,
        //         birthDate: birthDate,
        //     });

        //     switchDivs("LoginDiv");
        //     $('#RegisterDivForm')[0].reset();
        // }

        //    // SavedUsers.push([userName, psw]); // liad - how to push to SAVEDUSERS

            


        // }


    });

    $("#LoginDivForm").validate({
        rules: {
            uname: {
                required: true
            },
            pass: {
                required: true,
              //  passwordMatch: true, //liad
            },
        },

        messages: {
            uname: "Enter your username.",
            pass: {
                required: "Enter your password.",
            },
        },

        submitHandler: function() {
            userNameInGame = $('#uname').val();
            changeDivs('SettingsDiv');
            $('#loginForm')[0].reset();

        }
    });
});


//Login Functions
function Login(){
    let uname1= document.getElementById('uname').value;
    let pass1= document.getElementById('pass').value;
    if (LoginValid(uname1,pass1))
    {
        changeDivs('SettingsDiv');
        $('#LoginDivForm')[0].reset();
    }
    else {
       alert("Incorrect username or password!");
   }
}
   
function LoginValid(uname, pass)
{
    return SavedUsers.some((user) => user.username === uname && user.password === pass);
}



//Register Functions
function checkIfUserExists(uname)
{
    return SavedUsers.some((user) => user.username === uname);
} 


function registerInfo(){
    let userName = document.getElementById('usernameRegiser').value;
    //check if exists
    let UserNameExist = checkIfUserExists(userName);
    let pass = document.getElementById('passwordRegiser').value;
    let fullname = document.getElementById('nameRegiser').value;
    let email = document.getElementById('emailRegiser').value;
    let birthdate = document.getElementById('birthdayRegiser').value;
 
    if (UserNameExist) {
            alert("Sorry, this username is already taken");
            changeDivs("AboutDiv");
            
    return true;
    }
        SavedUsers.push({
            username: userName,
            password: pass,
            fullName: fullname,
            email: email,
            birthDate: birthdate,
        });
        if (confirm('Ready to go! Wanna start a game now?'))
        {
            changeDivs("SettingsDiv");
        }
        else 
        {
            changeDivs("WelcomeDiv");
        }
    
}


