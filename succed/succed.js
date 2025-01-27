$("#display").hide();
$("#imgsucced").hide();
$("#btn1").hide();

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
    $("#imgsucced").fadeIn(500, function () {
      $("#display").fadeIn(500, function () {
        $("#btn1").fadeIn(500);
      });
    });
  }
);

//get element from local storage
const firstName = window.localStorage.getItem("firstName");
const score = window.localStorage.getItem("finalgrade");
const display = $("#display");
display.text(`Well Done ${firstName}, you scored ${score}% `);
$("#btn1").click(function () {
  window.location.replace("../homePage/homePage.html");
});
