/////////////////// 10 second from now
var time_in_minutes = 0.5;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes * 60 * 1000);

function time_remaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function run_clock(id, endtime) {
  let clock = document.getElementById(id);
  function update_clock() {
    var t = time_remaining(endtime);
    clock.innerHTML = "minutes: " + t.minutes + "  seconds: " + t.seconds;
    if (t.total <= 0) {
      clearInterval(timeinterval);
      window.location.replace("../timeOff/time.html");
    }
  }
  update_clock();
  var timeinterval = setInterval(update_clock, 1000);
}

run_clock("clockdiv", deadline);

var qc = $("#qc");
let btn1 = $("#btn1");
let btn2 = $("#btn2");
const flagg = $("#flagg");
const buttonq = $(".buttonq");
const qnum = $("#qnum");
const flag = $("#flag");
const option1 = $("#option1");
const option2 = $("#option2");
const option3 = $("#option3");
const option4 = $("#option4");
$(".buttonq").prop("disabled", true).addClass("disabled");

let answer;
let Flg_answer = 0;
btn1.prop("disabled", true).addClass("disabled");
let ex = new Set();
fetch("../database/question.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    do {
      let index = Math.floor(Math.random() * data.length);
      ex.add(data[index]);
    } while (ex.size < 10);
    const exArray = Array.from(ex);
    qc.text(exArray[0].question_n);
    option1.text(exArray[0].A);
    option2.text(exArray[0].b);
    option3.text(exArray[0].c);
    option4.text(exArray[0].d);

    var arr2 = [option1, option2, option3, option4];
    let Exam_answer = new Array(10);
    for (let i = 0; i < 10; i++) {
      ///////////////////correct answers///////////////////////////
      Exam_answer[i] = exArray[i].right_answer;
    }

    let user_answer = new Array(exArray.length).fill(null);

    for (let i = 0; i < 4; i++) {
      arr2[i].on("click", () => {
        if (!Flg_answer) {
          arr2.forEach((option) => option.css("backgroundColor", "white"));

          arr2[i].css("backgroundColor", "rgb(187, 184, 184)");
          arr2[i].css("border", "1px solid black");

          window.localStorage.setItem(
            exArray[current].question_n,
            arr2[i].text()
          );
          answer = arr2[i].text();

          user_answer[current] = answer;
          Flg_answer = 1;
        } else {
          arr2[i].css("backgroundColor", "white");
          window.localStorage.setItem(exArray[current].question_n, "");
          user_answer[current] = null;
          Flg_answer = 0;
        }
      });
    }

    ///////////////////////////////////////////////////////////////////
    let current = 0;
    let ques_curr = 1;
    let arr = new Array(10).fill(0);
    run_clock("clockdiv", deadline);
    let flagClickCount = 0;

    flag.on("click", () => {
      console.log(qc.text());
      Array.from(buttonq).forEach((button) => {
        let buttonText = parseInt($(button).text());
        if (current + 1 === buttonText) {
          qnum.text(`Question ${buttonText} out of 10`);
          var newdiv = $("<div></div>");
          newdiv.html(
            '<div class="ques_name">' +
              exArray[buttonText - 1].question_n +
              "</div>"
          );
          qc.empty();
          qc.append(newdiv);

          var newdiv1 = $("<div></div>");
          newdiv1.html(
            '<div class="option1">' + exArray[buttonText - 1].A + "</div>"
          );
          option1.empty();
          option1.append(newdiv1);

          var newdiv2 = $("<div></div>");
          newdiv2.html(
            '<div class="option2">' + exArray[buttonText - 1].b + "</div>"
          );
          option2.empty();
          option2.append(newdiv2);

          var newdiv3 = $("<div></div>");
          newdiv3.html(
            '<div class="option3">' + exArray[buttonText - 1].c + "</div>"
          );
          option3.empty();
          option3.append(newdiv3);

          var newdiv4 = $("<div></div>");
          newdiv4.html(
            '<div class="option4">' + exArray[buttonText - 1].d + "</div>"
          );
          option4.empty();
          option4.append(newdiv4);
          flagClickCount++;
          if (flagClickCount % 2 === 1) {
            $(button).css("backgroundColor", "rgba(170, 84, 134, 1)");
            flag.css("backgroundColor", "rgba(170, 84, 134, 1)");

            $(button).prop("disabled", false);
            $(button).removeClass("disabled");
            console.log("---flagged (Gray)");
            console.log(flagClickCount);

            arr[current] = 1;
            console.log(arr);
          } else {
            $(button).css("backgroundColor", "rgb(187, 184, 184)");
            flag.css("backgroundColor", "rgb(187, 184, 184)");
            $(button).prop("disabled", true);
            $(button).addClass("disabled");
            arr[current] = 0;
            console.log("---Unflagged (Gray)");
            console.log(arr);
            console.log(flagClickCount);
          }
        }
      });
    });

    Array.from(buttonq).forEach((button) => {
      $(button).on("click", () => {
        let buttonText = parseInt($(button).text());
        current = buttonText - 1;
        flag.css("backgroundColor", "rgba(170, 84, 134, 1)");

        if (arr[current] == 1) {
          console.log(`Button ${buttonText} clicked`);
          qnum.text(`Question ${buttonText} out of 10`);

          var newdiv = $("<div></div>");

          newdiv.html(
            '<div class="ques_name">' + exArray[current].question_n + "</div>"
          );
          qc.empty();
          qc.append(newdiv);

          var options = [
            exArray[current].A,
            exArray[current].b,
            exArray[current].c,
            exArray[current].d,
          ];
          var optionElements = [option1, option2, option3, option4];

          options.forEach((optionText, index) => {
            var newOptionDiv = $("<div></div>");
            newOptionDiv.html(`<div class="option">${optionText}</div>`);
            optionElements[index].empty();
            optionElements[index].append(newOptionDiv);
          });

          optionElements.forEach((optionElement) => {
            optionElement.css("backgroundColor", "white");
          });

          if (user_answer[current]) {
            optionElements.forEach((optionElement, index) => {
              if (optionElement.text().trim() === user_answer[current].trim()) {
                optionElement.css("backgroundColor", "rgb(187, 184, 184)");
              } else {
                optionElement.css(("backgroundColor", "white"));
              }
            });
          }
          ques_curr = $(button).text();
          ques_curr = parseInt(ques_curr);
          console.log("user_answer:", user_answer);
        }
      });
    });

    // ////////////////////// circle flaged buttons //////////////////////

    const buttonsDiv = $("#buttons");
    const allButtons = buttonsDiv.find("button");
    btn2 = $("#btn2");

    btn2.on("click", () => {
      option1.css("backgroundColor", "white");
      option2.css("backgroundColor", "white");
      option3.css("backgroundColor", "white");
      option4.css("backgroundColor", "white");
      flag.css("backgroundColor", "rgb(187, 184, 184)");
      Flg_answer = 0;
      btn1.prop("disabled", false).removeClass("disabled");

      if (current + 1 < allButtons.length) {
        const currentButton = allButtons.eq(current + 1);
        if (
          currentButton.css("backgroundColor") === "rgb(170, 84, 134)" ||
          currentButton.css("backgroundColor") === "rgba(170, 84, 134, 1)"
        ) {
          flag.css("backgroundColor", "rgba(170, 84, 134, 1)");
        }
      }

      if (current <= 9) {
        qnum.empty();
        if (ques_curr < 9) {
          ques_curr = ques_curr + 1;
          qnum.text(` Question ${ques_curr} out of 10`);
        }

        console.log("Data fetched:", exArray[current]);
        if (current <= 8 && current != 9) {
          var newdiv = $("<div></div>");
          newdiv.html(
            '<div class="ques_name">' +
              exArray[current + 1].question_n +
              "</div>"
          );
          qc.empty();
          qc.append(newdiv);

          var newdiv1 = $("<div></div>");
          newdiv1.html(
            '<div class="option1">' + exArray[current + 1].A + "</div>"
          );
          option1.empty();
          option1.append(newdiv1);

          var newdiv2 = $("<div></div>");
          newdiv2.html(
            '<div class="option2">' + exArray[current + 1].b + "</div>"
          );
          option2.empty();
          option2.append(newdiv2);

          var newdiv3 = $("<div></div>");
          newdiv3.html(
            '<div class="option3">' + exArray[current + 1].c + "</div>"
          );
          option3.empty();
          option3.append(newdiv3);

          var newdiv4 = $("<div></div>");
          newdiv4.html(
            '<div class="option4">' + exArray[current + 1].d + "</div>"
          );
          option4.empty();
          option4.append(newdiv4);
          current++;
          for (let i = 0; i < user_answer.length; i++) {
            if (i == current && user_answer[current]) {
              for (let i = 0; i < 4; i++) {
                if (option1.text() == user_answer[current]) {
                  option1.css("backgroundColor", "rgb(187, 184, 184)");
                } else if (option2.text() == user_answer[current]) {
                  option2.css("backgroundColor", "rgb(187, 184, 184)");
                } else if (option3.text() == user_answer[current]) {
                  option3.css("backgroundColor", "rgb(187, 184, 184)");
                } else if (option4.text() == user_answer[current]) {
                  option4.css("backgroundColor", "rgb(187, 184, 184)");
                }
              }
            }
          }
        }
        if (current == 9) {
          qnum.text(` Question ${current + 1} out of 10`);

          var newdiv = $("<div></div>");
          newdiv.html(
            '<div class="ques_name">' + exArray[current].question_n + "</div>"
          );
          qc.empty();
          qc.append(newdiv);

          var newdiv1 = $("<div></div>");
          newdiv1.html('<div class="option1">' + exArray[current].A + "</div>");
          option1.empty();
          option1.append(newdiv1);

          var newdiv2 = $("<div></div>");
          newdiv2.html('<div class="option2">' + exArray[current].b + "</div>");
          option2.empty();
          option2.append(newdiv2);

          var newdiv3 = $("<div></div>");
          newdiv3.html('<div class="option3">' + exArray[current].c + "</div>");
          option3.empty();
          option3.append(newdiv3);

          var newdiv4 = $("<div></div>");
          newdiv4.html('<div class="option4">' + exArray[current].d + "</div>");
          option4.empty();
          option4.append(newdiv4);

          btn2.text("Finish Exam");

          btn2.on("click", () => {
            let grade = 0;
            if (current + 1 === exArray.length) {
              for (let i = 0; i < Exam_answer.length; i++) {
                if (
                  user_answer[i] !== null &&
                  Exam_answer[i] === user_answer[i]
                ) {
                  grade++;
                }
              }
              finalgrade = grade * 10;
              window.localStorage.setItem("finalgrade", finalgrade.toString());
              if (finalgrade >= 60) {
                window.location.replace("../succed/result.html");
              } else {
                window.location.replace("../fail/fail.html");
              }
            }
          });
        }
      }
      let flagClickCountnext = 0;
      flag.on("click", () => {
        console.log(qc.text());
        Array.from(buttonq).forEach((button) => {
          buttonText = parseInt($(button).text());

          if (current + 1 == buttonText) {
            console.log(`Buttonxxxx ${buttonText} clicked`);
            console.log(flagClickCountnext);
            flagClickCountnext++;

            if (flagClickCountnext % 2 === 1) {
              $(button).css("backgroundColor", "rgba(170, 84, 134, 1)");
              flag.css("backgroundColor", "rgba(170, 84, 134, 1)");

              $(button).prop("disabled", false);
              $(button).removeClass("disabled");

              arr[current] = 1;
              console.log(arr);
            } else {
              $(button).css("backgroundColor", "gray");
              flag.css("backgroundColor", "rgb(187, 184, 184)");
              $(button).prop("disabled", true);
              $(button).addClass("disabled");
              arr[current] = 0;
            }
          }
        });
      });
    });

    //////////////////////////////previous button//////////////////////////////////
    let isClicked = false;
    btn1.click(function () {
      if (ques_curr === 2 || ques_curr === 1) {
        if (!isClicked || current - 1 == 0) {
          isClicked = true;
          $(btn1).prop("disabled", true).addClass("disabled");
        }
      }

      option1.css("background-color", "white");
      option2.css("background-color", "white");
      option3.css("background-color", "white");
      option4.css("background-color", "white");
      Flg_answer = 0;

      flag.css("background-color", "rgb(187, 184, 184)");
      flagg.css("color", "rgb(255, 255, 255)");

      if (current < allButtons.length) {
        const currentButton = $(allButtons[current - 1]);
        if (
          currentButton.css("backgroundColor") === "rgba(170, 84, 134, 1)" ||
          currentButton.css("backgroundColor") === "rgb(170, 84, 134)"
        ) {
          flag.css("background-color", "rgba(170, 84, 134, 1)");
        }
      }

      btn2.text("NEXT");
      if (current > 0) {
        console.log(`Button ${current - 1}:`, allButtons[current - 1]);

        let qnum = $("#qnum");
        qnum.text("");

        if (ques_curr > 1 && current <= 10) {
          ques_curr = ques_curr - 1;
          qnum.text(`Question ${ques_curr} out of 10`);
          console.log("Data fetched:", exArray[current]);
          console.log(",,,," + (current - 1));
          console.log(exArray[current - 1].question_n);

          var newdiv = $("<div>")
            .addClass("ques_name")
            .html(exArray[current - 1].question_n);
          qc.text("");
          qc.append(newdiv);

          var newdiv1 = $("<div>")
            .addClass("option1")
            .html(exArray[current - 1].A);
          option1.text("");
          option1.append(newdiv1);

          var newdiv2 = $("<div>")
            .addClass("option2")
            .html(exArray[current - 1].b);
          option2.text("");
          option2.append(newdiv2);

          var newdiv3 = $("<div>")
            .addClass("option3")
            .html(exArray[current - 1].c);
          option3.text("");
          option3.append(newdiv3);

          var newdiv4 = $("<div>")
            .addClass("option4")
            .html(exArray[current - 1].d);
          option4.text("");
          option4.append(newdiv4);

          current = current - 1;

          $.each(user_answer, function (i) {
            if (i == current && user_answer[current]) {
              console.log("banseh");
              console.log(user_answer[current]);
              for (let i = 0; i < 4; i++) {
                if (option1.text() == user_answer[current]) {
                  option1.css("background-color", "rgb(187, 184, 184)");
                } else if (option2.text() == user_answer[current]) {
                  option2.css("background-color", "rgb(187, 184, 184)");
                } else if (option3.text() == user_answer[current]) {
                  option3.css("background-color", "rgb(187, 184, 184)");
                } else if (option4.text() == user_answer[current]) {
                  option4.css("background-color", "rgb(187, 184, 184)");
                }
              }
            }
          });

          let flagClickCountprevious = 0;
          flag.click(function () {
            console.log(qc.text());
            $.each(buttonq, function () {
              if (current + 1 == $(this).text()) {
                console.log(`Buttonxxxx ${$(this).text()} clicked`);
                console.log(flagClickCountprevious);
                flagClickCountprevious++;

                if (flagClickCountprevious % 2 === 1) {
                  $(this).css("background-color", "rgba(170, 84, 134, 1)");
                  flag.css("background-color", "rgba(170, 84, 134, 1)");

                  $(this).prop("disabled", false).removeClass("disabled");
                  console.log("---flagged (Gray)");
                  console.log(flagClickCountprevious);

                  arr[current] = 1;
                  console.log(arr);
                } else {
                  $(this).css("background-color", "gray");
                  flag.css("background-color", "rgb(187, 184, 184)");
                  $(this).prop("disabled", true).addClass("disabled");
                  arr[current] = 0;
                  console.log("---Unflagged (Gray)");
                  console.log(arr);
                  console.log(flagClickCountprevious);
                }
              }
            });
          });
        }
      }
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
////////////////////////////////////////////////////////
