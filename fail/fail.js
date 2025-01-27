const firstName = window.localStorage.getItem("firstName");
const score = window.localStorage.getItem("finalgrade");
const display = $("#display");
display.text(
  `its Okay ${firstName}, you scored ${score}% Try again for a better result!`
);
$("#btn1").click(function () {
  window.location.replace("../homePage/homePage.html");
});
$("#btn2").click(function () {
  window.location.replace("../startExam/start_exam.html");
});
