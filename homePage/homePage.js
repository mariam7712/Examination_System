$("#btn1").click(function () {
  window.location.replace("../startExam/start_exam.html");
});
$("#btn2").click(function () {
  window.location.replace("../Registration/signup.html");
  localStorage.removeItem("firstName");
});
