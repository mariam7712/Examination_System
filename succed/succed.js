const firstName = window.localStorage.getItem("firstName");
const score = window.localStorage.getItem("finalgrade");
const display = $("#display");
display.text(`Well Done ${firstName}, you scored ${score}% `);
$("#btn1").click(function () {
  window.location.replace("../homePage/homePage.html");
});
