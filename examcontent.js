///////////////////////////////////////////////////////////
// 10 minutes from now
var time_in_minutes = 20;
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
      window.location.href = "time.html";
    }
  }
  update_clock(); // run function once at first to avoid delay
  var timeinterval = setInterval(update_clock, 1000);
}

// Start the timer immediately when the page loads
run_clock("clockdiv", deadline);

//////////////////////////////
// run_clock("clockdiv", deadline);
// /////////////////////////////////////////////////////
$(".buttonq").prop("disabled", true).addClass("disabled");

var qc = document.getElementById("qc");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
const flagg = document.getElementById("flagg");
let buttonq = document.getElementsByClassName("buttonq");
let qnum = document.getElementById("qnum");
const flag = document.getElementById("flag");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let answer;
let Flg_answer = 0;
$(btn1).prop("disabled", true).addClass("disabled"); // Disable the button
let ex = new Set();
fetch("question.json")
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
      // console.log(data[index]);
    } while (ex.size < 10);
    // console.log("Final Set:", ex);
    const exArray = Array.from(ex);
    // for (let i = 0; i < 10; i++) {
    //   console.log(`Question ${i + 1}:`, exArray[i].question);
    //   console.log(exArray[i].A);
    //   console.log(exArray[i].b);
    //   console.log(exArray[i].c);
    //   console.log(exArray[i].d);
    //   console.log(exArray[i].right_answer);
    // }
    qc.innerText = exArray[0].question_n;
    option1.innerText = exArray[0].A;
    option2.innerText = exArray[0].b;
    option3.innerText = exArray[0].c;
    option4.innerText = exArray[0].d;
    var arr2 = [option1, option2, option3, option4];
    // let user_answer = new Array(10);
    let Exam_answer = new Array(10);
    for (let i = 0; i < 10; i++) {
      ///////////////////server///////////////////////////
      Exam_answer[i] = exArray[i].right_answer;
    }
    console.log("serverrrr");
    console.log(Exam_answer);
    ////////////////////////////////////////////////////
    let user_answer = new Array(exArray.length).fill(null);

    for (let i = 0; i < 4; i++) {
      arr2[i].addEventListener("click", () => {
        if (!Flg_answer) {
          arr2.forEach((option) => (option.style.backgroundColor = "white"));

          arr2[i].style.backgroundColor = "green";

          window.localStorage.setItem(
            exArray[current].question_n,
            arr2[i].innerText
          );
          answer = arr2[i].innerText;

          user_answer[current] = answer;
          Flg_answer = 1;
        } else {
          arr2[i].style.backgroundColor = "white";
          window.localStorage.setItem(exArray[current].question_n, "");

          user_answer[current] = null;
          Flg_answer = 0;
        }

        console.log(
          "User's answer for current question: ",
          user_answer[current]
        );
        console.log("All user answers: ", user_answer);
      });
    }

    ///////////////////////////////////////////////////////////////////
    let current = 0;
    let ques_curr = 1;
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    run_clock("clockdiv", deadline);
    let flagClickCount = 0;

    flag.addEventListener("click", () => {
      console.log(qc.innerText);
      Array.from(buttonq).forEach((button) => {
        if (current + 1 == button.innerText) {
          console.log(`Button ${button.innerText} clicked`);

          qnum.innerText = `Question ${button.innerText} out of 10`;
          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            exArray[button.innerText - 1].question_n +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' +
            exArray[button.innerText - 1].A +
            "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' +
            exArray[button.innerText - 1].b +
            "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' +
            exArray[button.innerText - 1].c +
            "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' +
            exArray[button.innerText - 1].d +
            "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          // Toggle flag color based on the click count
          flagClickCount++;

          if (flagClickCount % 2 === 1) {
            // First click
            button.style.backgroundColor = "rgba(170, 84, 134, 1)";
            flag.style.backgroundColor = "rgba(170, 84, 134, 1)";

            button.disabled = false;
            button.classList.remove("disabled");
            console.log("---flagged (Gray)");
            console.log(flagClickCount);

            arr[current] = 1;
            console.log(arr);
          } else {
            // Second click and alternating
            button.style.backgroundColor = "gray";
            flag.style.backgroundColor = "rgb(187, 184, 184)";
            button.disabled = true;
            button.classList.add("disabled");
            arr[current] = 0;
            console.log("---Unflagged (Gray)");
            console.log(arr);
            console.log(flagClickCount);
          }
        }
      });
    });

    Array.from(buttonq).forEach((button) => {
      button.addEventListener("click", () => {
        current = button.innerText - 1;

        flag.style.backgroundColor = "rgba(170, 84, 134, 1)";

        if (arr[current] == 1) {
          console.log(`Button ${button.innerText} clicked`);
          qnum.innerText = `Question ${button.innerText} out of 10`;

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + exArray[current].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var options = [
            exArray[current].A,
            exArray[current].b,
            exArray[current].c,
            exArray[current].d,
          ];
          var optionElements = [option1, option2, option3, option4];

          // Populate the options
          options.forEach((optionText, index) => {
            var newOptionDiv = document.createElement("div");
            newOptionDiv.innerHTML = `<div class="option">${optionText}</div>`;
            optionElements[index].innerText = ""; // Clear previous content
            optionElements[index].appendChild(newOptionDiv);
          });

          optionElements.forEach((optionElement) => {
            optionElement.style.backgroundColor = "white";
          });

          if (user_answer[current]) {
            optionElements.forEach((optionElement, index) => {
              if (
                optionElement.innerText.trim() === user_answer[current].trim()
              ) {
                optionElement.style.backgroundColor = "green"; // Correct answer
              } else {
                optionElement.style.backgroundColor = "white"; // Incorrect answer
              }
            });
          }
          console.log(" noooooooooooooooooooooo");
          // console.log(ques_curr);
          // console.log(button.innerText);
          ques_curr = button.innerText;
          ques_curr = parseInt(ques_curr);

          console.log("user_answer:", user_answer);
        }
      });
    });

    ////////////////////// circle /buttons //////////////////////

    const buttonsDiv = document.getElementById("buttons");
    const allButtons = buttonsDiv.getElementsByTagName("button");
    btn2 = document.getElementById("btn2");

    btn2.addEventListener("click", () => {
      option1.style.backgroundColor = "white";
      option2.style.backgroundColor = "white";
      option3.style.backgroundColor = "white";
      option4.style.backgroundColor = "white";
      console.log("yeesssss");
      console.log(current);
      flag.style.backgroundColor = "rgb(187, 184, 184)";
      Flg_answer = 0;
      $(btn1).prop("disabled", false).removeClass("disabled");

      // Check if the current button is flagged
      if (current + 1 < allButtons.length) {
        const currentButton = allButtons[current + 1];
        if (
          currentButton.style.backgroundColor === "rgba(170, 84, 134, 1)" ||
          currentButton.style.backgroundColor === "rgb(170, 84, 134)"
        ) {
          flag.style.backgroundColor = "rgba(170, 84, 134, 1)";
        }
      }

      // Your existing code for handling questions
      if (current <= 9) {
        console.log(`Button ${current + 1}:`, allButtons[current]);

        qnum.innerText = "";
        if (ques_curr < 9) {
          ques_curr = ques_curr + 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;
        }

        console.log("Data fetched:", exArray[current]);
        if (current <= 8 && current != 9) {
          console.log(",,,," + (current + 1));
          console.log(exArray[current + 1].question_n);

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            exArray[current + 1].question_n +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + exArray[current + 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + exArray[current + 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + exArray[current + 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + exArray[current + 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);
          console.log(current);

          current++;
          console.log("123334455677890--");
          console.log("new" + current);
          console.log(user_answer);
          for (let i = 0; i < user_answer.length; i++) {
            if (i == current && user_answer[current]) {
              console.log("banseh");
              console.log(user_answer[current]);
              for (let i = 0; i < 4; i++) {
                if (option1.innerText == user_answer[current]) {
                  option1.style.backgroundColor = "green";
                } else if (option2.innerText == user_answer[current]) {
                  option2.style.backgroundColor = "green";
                } else if (option3.innerText == user_answer[current]) {
                  option3.style.backgroundColor = "green";
                } else if (option4.innerText == user_answer[current]) {
                  option4.style.backgroundColor = "green";
                }
              }
            }
          }
        }
        if (current == 9) {
          qnum.innerText = ` Question ${current + 1} out of 10`;

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + exArray[current].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + exArray[current].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + exArray[current].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + exArray[current].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + exArray[current].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          btn2.innerText = "Finish Exam";

          console.log("mxxx");
          ///////////////////resultttttttttttt////////////////
          console.log(current);
          console.log(data.length);
          console.log("------");
          btn2.addEventListener("click", () => {
            let grade = 0;

            if (current + 1 === exArray.length) {
              console.log("Exam correct answers:", Exam_answer);
              console.log("User answers:", user_answer);

              for (let i = 0; i < Exam_answer.length; i++) {
                if (Exam_answer[i] === user_answer[i]) {
                  grade++;
                }
              }

              console.log("Your final grade is:", grade);
            }
          });
        }
      }
      /////test///
      let flagClickCountnext = 0;
      flag.addEventListener("click", () => {
        console.log(qc.innerText);
        Array.from(buttonq).forEach((button) => {
          if (current + 1 == button.innerText) {
            console.log(`Buttonxxxx ${button.innerText} clicked`);
            console.log(flagClickCountnext);
            flagClickCountnext++;

            if (flagClickCountnext % 2 === 1) {
              // First click
              button.style.backgroundColor = "rgba(170, 84, 134, 1)";
              flag.style.backgroundColor = "rgba(170, 84, 134, 1)";

              button.disabled = false;
              button.classList.remove("disabled");
              console.log("---flagged (Gray)");
              console.log(flagClickCountnext);

              arr[current] = 1;
              console.log(arr);
            } else {
              // Second click and alternating
              button.style.backgroundColor = "gray";
              flag.style.backgroundColor = "rgb(187, 184, 184)";
              button.disabled = true;
              button.classList.add("disabled");
              arr[current] = 0;
              console.log("---Unflagged (Gray)");
              console.log(arr);
              console.log(flagClickCount);
            }
          }
        });
      });
      ///////
    });

    // ////////////***************previous******************************** */
    let isClicked = false;

    btn1.addEventListener("click", () => {
      if (ques_curr === 2 || ques_curr === 1) {
        if (!isClicked || current - 1 == 0) {
          isClicked = true;
          $(btn1).prop("disabled", true).addClass("disabled");
          console.log("Button disabled because this is the first question.");
        }
      }

      option1.style.backgroundColor = "white";
      option2.style.backgroundColor = "white";
      option3.style.backgroundColor = "white";
      option4.style.backgroundColor = "white";
      Flg_answer = 0;

      flag.style.backgroundColor = "rgb(187, 184, 184)";
      flagg.style.color = "rgb(255, 255, 255)";

      if (current < allButtons.length) {
        const currentButton = allButtons[current - 1];
        if (
          currentButton.style.backgroundColor === "rgba(170, 84, 134, 1)" ||
          currentButton.style.backgroundColor === "rgb(170, 84, 134)"
        ) {
          flag.style.backgroundColor = "rgba(170, 84, 134, 1)";
        }
      }

      btn2.innerText = "NEXT";
      console.log("currr" + current);

      if (current > 0) {
        console.log(`Button ${current - 1}:`, allButtons[current - 1]);

        let qnum = document.getElementById("qnum");
        qnum.innerText = "";

        if (ques_curr > 1 && current <= 10) {
          ques_curr = ques_curr - 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;

          console.log("Data fetched:", exArray[current]);
          console.log(",,,," + (current - 1));
          console.log(exArray[current - 1].question_n);

          // Populate new question
          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            exArray[current - 1].question_n +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + exArray[current - 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + exArray[current - 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + exArray[current - 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + exArray[current - 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          current = current - 1;

          //////**care */
          for (let i = 0; i < user_answer.length; i++) {
            if (i == current && user_answer[current]) {
              console.log("banseh");
              console.log(user_answer[current]);
              for (let i = 0; i < 4; i++) {
                if (option1.innerText == user_answer[current]) {
                  option1.style.backgroundColor = "green";
                } else if (option2.innerText == user_answer[current]) {
                  option2.style.backgroundColor = "green";
                } else if (option3.innerText == user_answer[current]) {
                  option3.style.backgroundColor = "green";
                } else if (option4.innerText == user_answer[current]) {
                  option4.style.backgroundColor = "green";
                }
              }
            }
          }
          //*
          ///////////////test/////////////////////////
          let flagClickCountprevious = 0;
          flag.addEventListener("click", () => {
            console.log(qc.innerText);
            Array.from(buttonq).forEach((button) => {
              if (current + 1 == button.innerText) {
                console.log(`Buttonxxxx ${button.innerText} clicked`);
                console.log(flagClickCountprevious);
                flagClickCountprevious++;

                if (flagClickCountprevious % 2 === 1) {
                  // First click
                  button.style.backgroundColor = "rgba(170, 84, 134, 1)";
                  flag.style.backgroundColor = "rgba(170, 84, 134, 1)";

                  button.disabled = false;
                  button.classList.remove("disabled");
                  console.log("---flagged (Gray)");
                  console.log(flagClickCountprevious);

                  arr[current] = 1;
                  console.log(arr);
                } else {
                  // Second click and alternating
                  button.style.backgroundColor = "gray";
                  flag.style.backgroundColor = "rgb(187, 184, 184)";
                  button.disabled = true;
                  button.classList.add("disabled");
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
    console.log("---------------------------------");
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
//
//////////////////////////
