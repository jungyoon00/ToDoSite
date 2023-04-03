const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");

const weather = document.querySelector("#weather");
const quoteform = document.querySelector("#quote");
const todoform = document.querySelector("#todo-form");

const logout = document.querySelector("#logoutBtn");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
    logout.classList.remove("hidden");
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    weather.classList.remove(HIDDEN_CLASSNAME);
    quoteform.classList.remove(HIDDEN_CLASSNAME);
    todoform.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    weather.classList.remove(HIDDEN_CLASSNAME);
    quote.classList.remove(HIDDEN_CLASSNAME);
    todoform.classList.remove(HIDDEN_CLASSNAME);
    logout.classList.add("hidden");
    loginForm.addEventListener("submit", onLoginSubmit);

} else {
    logout.classList.remove("hidden");
    paintGreetings(savedUsername);

}