//toggle selectors
const loginToggle = document.querySelector(".left");
const registerToggle = document.querySelector(".right");

//container selectors
const registerContainer = document.querySelector(".register");
const loginContainer = document.querySelector(".login");

//click buttons
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

//pages
const mainPage = document.querySelector(".mainPage");
const authPage = document.querySelector(".container");

//store user data in local storage
function storeUserData(fullname, email, password) {
  localStorage.setItem(email, JSON.stringify({ fullname, email, password }));
}

//check user data in local storage
function checkUserData(email, password) {
  const userData = JSON.parse(localStorage.getItem(email));
  if (userData && userData.email === email && userData.password === password) {
    return userData;
  }
  return null;
}

//if user exists or logged in
const userData = JSON.parse(localStorage.getItem("user"));
if (userData) {
  authPage.classList.remove("active");
  mainPage.classList.add("active");
}

//logout handler
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.reload();
});

// Registration form submit event listener
registerBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (fullname && email && password) {
    if (checkUserData(email, password)) {
      console.log("object");
      alert("User already exists");
      return;
    }
    storeUserData(fullname, email, password);
    fullname = "";
    email = "";
    password = "";
    registerToggle.classList.remove("active");
    registerContainer.classList.remove("slide-left");
    loginToggle.classList.add("active");
    loginContainer.classList.add("slide-right");
    alert("user registration successfully");
  }
});

// Login form submit event listener
loginBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email-login").value;
  let password = document.getElementById("password-login").value;
  const loginData = checkUserData(email, password);
  if (loginData) {
    localStorage.setItem("user", JSON.stringify(loginData));
    authPage.classList.remove("active");
    mainPage.classList.add("active");
    email = "";
    password = "";
    alert("Login successful");
  } else {
    alert("Invalid email or password");
  }
});

loginToggle.addEventListener("click", () => {
  registerToggle.classList.remove("active");
  registerContainer.classList.remove("slide-left");
  loginToggle.classList.add("active");
  loginContainer.classList.add("slide-right");
});
registerToggle.addEventListener("click", () => {
  loginToggle.classList.remove("active");
  loginContainer.classList.remove("slide-right");
  registerToggle.classList.add("active");
  registerContainer.classList.add("slide-left");
});
