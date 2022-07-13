"use strict"

const elLogOutBtn = document.querySelector(".logoutBtn");
const token = window.localStorage.getItem("token");

if(!token) {
    window.location.replace("index.html")
};

elLogOutBtn.addEventListener ("click", function (){

   window.location.replace("index.html");
});