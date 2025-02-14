/////////////////////////////////30 second from now//////////////////////////////////////////////////////////////
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
const loading = $("#loading");
loading.css("display", "block");
const content = $("#conent");
content.css("display", "none");
$(".buttonq").prop("disabled", true).addClass("disabled");
let answer;
btn1.prop("disabled", true).addClass("disabled");
let ex = new Set();
fetch("../database/question.json")
  .then((response) => {
    if (!response.ok) {
      // throw new Error(`HTTP error! Status: ${response.status}`);
      window.location.replace("../error/404.html");
    }
    return response.json();
  })
  .then((data) => {
    loading.css("display", "none");
    content.css("display", "block");
    do {
      let index = Math.floor(Math.random() * data.length);
      ex.add(data[index]);
    } while (ex.size < 10);
    const exArray = Array.from(ex);
    console.log(exArray);
    qc.text(exArray[0].question_n);
    option1.text(exArray[0].A);
    option2.text(exArray[0].b);
    option3.text(exArray[0].c);
    option4.text(exArray[0].d);

    var arr2 = [option1, option2, option3, option4];
    ///////////////////correct answers///////////////////////////
    ///////////////////correct answers///////////////////////////////////////////////////////////
    let Exam_answer = new Array(10);
    for (let i = 0; i < 10; i++) {
      Exam_answer[i] = exArray[i].right_answer;
    }
    /////////////////////////////array of user answer :) &&  Local Storage :) ////////////////////////////////////////////////
    let user_answer = new Array(exArray.length).fill(null);
    let current = 0;
    let amr = 0;
    let choose_answer = new Array(exArray.length).fill(0);

    for (let i = 0; i < 4; i++) {
      arr2[i].on("click", () => {
        console.log("clicked");
        if (!arr2[i].hasClass("clicked")) {
          arr2[i].addClass("clicked");
          arr2.forEach((option) => option.css("backgroundColor", "white"));
          arr2[i].css("backgroundColor", "rgb(187, 184, 184)");
          console.log("if");

          window.localStorage.setItem(
            exArray[current].question_n,
            arr2[i].text()
          );
          answer = arr2[i].text();

          user_answer[current] = answer;
          choose_answer[i] = 1;
        } else {
          arr2[i].removeClass("clicked");

          arr2[i].css("backgroundColor", "white");
          window.localStorage.setItem(exArray[current].question_n, "");
          user_answer[current] = null;
          choose_answer[i] = 0;
          console.log("else");
        }
      });
    }

    let ques_curr = 1;
    let arr = new Array(10).fill(0);
    run_clock("clockdiv", deadline);
    let flagClickCount = 0;
    ///////////////////////////append questions , answers in divs :)///////////////////////////////////
    function change_ques(index) {
      if (index < 0 || index >= exArray.length) return;

      arr2 = [option1, option2, option3, option4];
      qnum.text(`Question ${index + 1} out of 10`);

      const questionText = exArray[index].question_n;
      qc.empty().append(`<div class="ques_name">${questionText}</div>`);

      const optionsText = [
        exArray[index].A,
        exArray[index].b,
        exArray[index].c,
        exArray[index].d,
      ];

      arr2.forEach((Element, i) => {
        Element.empty().append(`<div class="option">${optionsText[i]}</div>`);
      });
    }
    ////////////////////////////FLAGGING icon///////////////////////////////
    flag.on("click", () => {
      console.log(qc.text());
      Array.from(buttonq).forEach((button) => {
        let buttonText = parseInt($(button).text());
        console.log("currentttt", current);
        // if (current < 0) current = 0;
        // if (current >= exArray.length) current = exArray.length - 1;
        if (current + 1 === buttonText) {
          console.log("currentttt2", current);

          // change_ques(current);
          flagClickCount++;
          ////// in case click=> flag,,,,, double click=> remove flag  :(
          if (flagClickCount % 2 === 1) {
            $(button).css("backgroundColor", "rgba(170, 84, 134, 1)");
            flag.css("backgroundColor", "rgba(170, 84, 134, 1)");
            $(button).prop("disabled", false);
            $(button).removeClass("disabled");
            console.log("---flagged (Gray)");
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
          }
        }
      });
    });
    ///////////////on click on flagged circle  1- test if flaged take e to question
    Array.from(buttonq).forEach((button) => {
      $(button).on("click", () => {
        let buttonText = parseInt($(button).text());
        current = buttonText - 1;
        flag.css("backgroundColor", "rgba(170, 84, 134, 1)");
        if (arr[current] == 1) {
          console.log(`Button ${current + 1} clicked`);
          change_ques(current);
          optionElements = [option1, option2, option3, option4];
          optionElements.forEach((optionElement) => {
            optionElement.css("backgroundColor", "white");
          });
          if (user_answer[current]) {
            optionElements.forEach((optionElement, index) => {
              //////for each option show which answer stored in user anser and keep it colored else reurn to white//////////
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
      arr2.forEach((element) => {
        element.removeClass("clicked");
        console.log(element);
      });
      arr2.forEach((element) => {
        element.css("backgroundColor", "white");
      });
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
      /////////////////////////////////NEXT BUTTON///////////////////////////////////

      if (current <= 9) {
        console.log("please print currentttt when next");
        console.log(current);
        qnum.empty();
        if (current < 9) {
          current = current + 1;
          //////go on next question if current allowd :)
          ques_curr = ques_curr + 1;
          qnum.text(` Question ${ques_curr} out of 10`);
          console.log("Data fetched:", exArray[current]);
          console.log("please print currentttt when next22");
          change_ques(current);
          console.log(current);

          for (let i = 0; i < user_answer.length; i++) {
            if (i == current && user_answer[current]) {
              ///to keep answwers//////////
              for (let i = 0; i < 4; i++) {
                if (option1.text() == user_answer[current]) {
                  option1.css("backgroundColor", "rgb(187, 184, 184)");
                  option1.addClass("clicked");
                } else if (option2.text() == user_answer[current]) {
                  option2.css("backgroundColor", "rgb(187, 184, 184)");
                  option2.addClass("clicked");
                } else if (option3.text() == user_answer[current]) {
                  option3.css("backgroundColor", "rgb(187, 184, 184)");
                  option3.addClass("clicked");
                } else if (option4.text() == user_answer[current]) {
                  option4.css("backgroundColor", "rgb(187, 184, 184)");
                  option4.addClass("clicked");
                }
              }
            }
          }

          //  $.each(user_answer, function (i) {
          //    if (i === current && user_answer[current]) {
          //      console.log(user_answer[current]);
          //      console.log("%%%%%%%%%%%%%%%%%");
          //      if (option1.text() === user_answer[current]) {
          //        option1.css("background-color", "rgb(187, 184, 184)");
          //        option1.addClass("clicked");
          //        console.log(option1);
          //      } else if (option2.text() === user_answer[current]) {
          //        option2.css("background-color", "rgb(187, 184, 184)");
          //        option2.addClass("clicked");
          //      } else if (option3.text() === user_answer[current]) {
          //        option3.css("background-color", "rgb(187, 184, 184)");
          //        option3.addClass("clicked");
          //      } else if (option4.text() === user_answer[current]) {
          //        option4.css("background-color", "rgb(187, 184, 184)");
          //        option4.addClass("clicked");
          //      }
          //    }
          //  });
        }
        ////////////////////////////////////////////////////////////
        if (btn2.text() == "Finish Exam") {
          // btn2.on("click", () => {
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
            console.log(finalgrade);
            console.log("xxxxxxxxxx");
            console.log(current);
            window.localStorage.setItem("finalgrade", finalgrade.toString());
            console.log("*********after click" + current);
            if (finalgrade >= 60) {
              window.location.replace("../succed/result.html");
            } else {
              window.location.replace("../fail/fail.html");
            }
          }
          // });
        }
        if (current === 9) {
          qnum.empty();
          console.log(current);
          change_ques(current);
          btn2.text("Finish Exam");
        }
      }
      ///////////////uselessssssss////////////////////////////////////////////\
      /************************************************************* */
      let flagClickCountnext = 0;
      flag.on("click", () => {
        console.log(qc.text());
        Array.from(buttonq).forEach((button) => {
          buttonText = parseInt($(button).text());

          if (current + 1 == buttonText) {
            console.log(buttonText);
            console.log(`Buttonxxxx ${buttonText} clicked`);
            console.log(flagClickCountnext);
            flagClickCountnext++;
            console.log(flagClickCountnext);
            if (flagClickCountnext % 2 === 1) {
              $(button).css("backgroundColor", "rgba(170, 84, 134, 1)");
              flag.css("backgroundColor", "rgba(170, 84, 134, 1)");
              $(button).prop("disabled", false);
              $(button).removeClass("disabled");
              arr[current] = 1;
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
      /************************************************************************ */
    });

    //////////////////////////////previous button//////////////////////////////////
    let isClicked = false;
    btn1.click(function () {
      console.log("ques" + ques_curr);
      console.log("please print currentttt when pre");
      console.log(current);
      if (ques_curr === 2 || ques_curr === 1) {
        if (!isClicked || current == 0) {
          isClicked = true;
          $(btn1).prop("disabled", true).addClass("disabled");
        }
      }
      arr2.forEach((element) => {
        element.css("background-color", "white");
      });
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
        if (ques_curr > 1 && current <= 9) {
          ques_curr -= 1;
          qnum.text(`Question ${ques_curr} out of 10`);

          current -= 1;
          change_ques(current);
          arr2.forEach((element) => {
            element.removeClass("clicked");
            console.log(element);
          });
          $.each(user_answer, function (i) {
            if (i === current && user_answer[current]) {
              console.log(user_answer[current]);
              console.log("%%%%%%%%%%%%%%%%%");
              if (option1.text() === user_answer[current]) {
                option1.css("background-color", "rgb(187, 184, 184)");
                option1.addClass("clicked");
                console.log(option1);
              } else if (option2.text() === user_answer[current]) {
                option2.css("background-color", "rgb(187, 184, 184)");
                option2.addClass("clicked");
              } else if (option3.text() === user_answer[current]) {
                option3.css("background-color", "rgb(187, 184, 184)");
                option3.addClass("clicked");
              } else if (option4.text() === user_answer[current]) {
                option4.css("background-color", "rgb(187, 184, 184)");
                option4.addClass("clicked");
              }
            }
          });
          /*********************************uselesssssssssss */
          let flagClickCountprevious = 0;
          flag.click(function () {
            console.log(qc.text());
            $.each(buttonq, function () {
              if (current + 1 == $(this).text()) {
                console.log(`Button ${$(this).text()} clicked`);
                console.log(flagClickCountprevious);
                flagClickCountprevious++;

                if (flagClickCountprevious % 2 === 1) {
                  $(this).css("background-color", "rgba(170, 84, 134, 1)");
                  flag.css("background-color", "rgba(170, 84, 134, 1)");

                  $(this).prop("disabled", false).removeClass("disabled");
                  console.log("---flagged (Purple)");
                  arr[current] = 1;
                  console.log(arr);
                } else {
                  $(this).css("background-color", "gray");
                  flag.css("background-color", "rgb(187, 184, 184)");
                  $(this).prop("disabled", true).addClass("disabled");
                  console.log("---Unflagged (Gray)");
                  arr[current] = 0;
                  console.log(arr);
                }
              }
            });
          });
          // white
          //********************************************************uselesssssss */
        } else {
          console.log("ques_curr");
          console.log(ques_curr);

          qnum.text(`Question ${ques_curr} out of 10`);

          current -= 1;
          change_ques(current);

          $.each(user_answer, function (i) {
            if (i === current && user_answer[current]) {
              console.log(user_answer[current]);

              if (option1.text() === user_answer[current]) {
                option1.css("background-color", "rgb(187, 184, 184)");
              } else if (option2.text() === user_answer[current]) {
                option2.css("background-color", "rgb(187, 184, 184)");
              } else if (option3.text() === user_answer[current]) {
                option3.css("background-color", "rgb(187, 184, 184)");
              } else if (option4.text() === user_answer[current]) {
                option4.css("background-color", "rgb(187, 184, 184)");
              }
            }
          });

          // let flagClickCountprevious = 0;
          // flag.click(function () {
          //   console.log(qc.text());
          //   $.each(buttonq, function () {
          //     if (current + 1 == $(this).text()) {
          //       console.log(`Button ${$(this).text()} clicked`);
          //       console.log(flagClickCountprevious);
          //       flagClickCountprevious++;

          //       if (flagClickCountprevious % 2 === 1) {
          //         $(this).css("background-color", "rgba(170, 84, 134, 1)");
          //         flag.css("background-color", "rgba(170, 84, 134, 1)");

          //         $(this).prop("disabled", false).removeClass("disabled");
          //         console.log("---flagged (Purple)");
          //         arr[current] = 1;
          //         console.log(arr);
          //       } else {
          //         $(this).css("background-color", "gray");
          //         flag.css("background-color", "rgb(187, 184, 184)");
          //         $(this).prop("disabled", true).addClass("disabled");
          //         console.log("---Unflagged (Gray)");
          //         arr[current] = 0;
          //         console.log(arr);
          //       }
          //     }
          //   });
          // });
        }
      }
      console.log("please print currentttt when pre after finshhhh");
      console.log(current);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
////////////////////////////////////////////////////////
