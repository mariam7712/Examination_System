
      $("#display").hide();
      $("#imgfail").hide();
      $("#btn1").hide();
      $("#btn2").hide();

      $("#bg").animate(
        {
          width: "100%",
        },
        5000,
        "linear",
        function () {
          $("#bg").fadeOut(500, function () {
            $(this).remove(); 
          });
          $("#imgfail").fadeIn(500, function () {
            $("#display").fadeIn(500, function () {
              $("#btn1").fadeIn(500);
              $("#btn2").fadeIn(500);
            });
          });
        }
      );


// ///////get score //////////////////////////////////////
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
