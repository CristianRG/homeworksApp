const button_singup = document.getElementById('button-singup');

let usernameValid = true;
let passwordValid = false;
let users = []

function checkInputs(username, password){
    if (username && password) {
        button_singup.disabled = false;
    }
    else{
        button_singup.disabled = true;
    }
}

async function getUsers(){
    const response = await fetch("/api/v1/users/")
    const data = await response.json()
    users = data
}

window.addEventListener("DOMContentLoaded", ()=> {
    checkInputs(usernameValid, passwordValid);
    getUsers();
})

const username = document.querySelector("#username")
username.addEventListener("keyup", ()=> {
    let usernameText = document.getElementById("username").value;
    const username = document.getElementById("username")

    if (usernameText.length > 6 && users["users"].indexOf(usernameText) == -1) {
        username.style.borderColor = "green";
        username.style.borderStyle = "solid";
        usernameValid = true;
    }
    else{
        username.style.borderColor = "red";
        username.style.borderStyle = "solid";
        usernameValid = false;
    }
    checkInputs(usernameValid, passwordValid);

    // for (let index = 0; index < users["users"].length; index++) {

    //     if (usernameText.length > 6 && usernameText != users["users"][index].user) {
    //         username.style.borderColor = "green";
    //         username.style.borderStyle = "solid";
    //         usernameValid = true;
    //         break
    //     }
    //     else{
    //         username.style.borderColor = "red";
    //         username.style.borderStyle = "solid";
    //         usernameValid = false;
    //     }
    //     checkInputs(usernameValid, passwordValid);
        
    // }
    // users["users"].forEach(element => {
        
    // })
})


const password = document.querySelector('#exampleInputPassword1')
password.addEventListener('keyup', () => {
    let passwordText = document.getElementById("exampleInputPassword1").value;
    if(passwordText.length < 8){
        // document.getElementsByClassName('.form-control').style = 'border'
        // console.log("Si")
        const password = document.getElementById("exampleInputPassword1")
        password.style.borderColor = "red";
        password.style.borderStyle = "solid"
        passwordValid = false;
        // document.getElementsByName('password').style.border='solid';
    }
    else{
        const password = document.getElementById("exampleInputPassword1")
        password.style.borderColor = "green";
        password.style.borderStyle = "solid";
        passwordValid = true;
    }
    checkInputs(usernameValid, passwordValid);
})