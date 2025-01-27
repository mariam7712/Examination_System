
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
          $("#bg").fadeOut(1000, function () {
            $(this).remove(); // Remove the #bg element after fadeOut
          });
          $("#imgfail").fadeIn(1000, function () {
            $("#text").fadeIn(1000, function () {
              $("#btn1").fadeIn(1000);
              $("#btn2").fadeIn(1000);
            });
          });
        }
      );
      console.log("hello");


// /////////////////////////////////////////////
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
