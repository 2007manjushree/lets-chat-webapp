var username;

function login() {
    username = document.getElementById("username_input").value;
    localStorage.setItem("Username", username);
    window.location = "lets_chat.html";
}