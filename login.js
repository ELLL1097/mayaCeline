function login(){

let pass = document.getElementById("password").value;

if(pass === "0601"){
window.location.href = "menu.html";
}else{
alert("Password salah");
}

}