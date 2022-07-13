"use strict"

const elForm = document.querySelector(".form");
const elInputUser = document.querySelector(".userName");
const elInputPassword = document.querySelector(".userPassword");
const elLoginPasswordCheck = document.querySelector(".loginPasswordAlert");


elForm.addEventListener("submit", function (evt){
    evt.preventDefault();


    const userNameInputValue = elInputUser.value;
    const passwordInputValue = elInputPassword.value;

    elLoginPasswordCheck.innerHTML = null;

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userNameInputValue, //"eve.holt@reqres.in",
            password:passwordInputValue, //"cityslicka",
        }),
    }).then((res) =>res.json()).then((data) => {
        if (data?.token && passwordInputValue == 19940101){
            window.localStorage.setItem('token', data.token);

            window.location.replace("login.html")
        } else {

            const loginPasswordError = document.createElement("p")
            ///setAttribue
            loginPasswordError.setAttribute("class", "loginCheckError")
            ///textContent
            loginPasswordError.textContent = "Login yoki Parol xato";
            ///appendChild
            elLoginPasswordCheck.appendChild(loginPasswordError);
        }

    });
} );
