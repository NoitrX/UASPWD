const email = "admin@gmail.com";
const password = "admin";

const loginBtn = document.querySelector(".loginbtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const getEmail = document.querySelector("#email").value;
  const getPassword = document.querySelector("#password").value;

  if (getEmail === "" || getPassword === "") {
    alert("All fields are required");
  }

  if (getEmail !== email || getPassword !== password) {
    alert("Wrong Email or Password");
  }
  if (getEmail === email && getPassword === password) {
    window.location.href = "dashboard.html";
  }
});
