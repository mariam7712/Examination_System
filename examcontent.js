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

run_clock("clockdiv", deadline);
//////////////////////////////
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

fetch("question.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Remove duplicates based on 'question_n'
   const uniqueQuestions = [
     ...new Map(data.map((item) => [item.question_n, item])).values(),
   ];


    // Shuffle the unique questions
    const shuffledQuestions = uniqueQuestions.sort(() => Math.random() - 0.5);

    // Select the first 10 questions
    const selectedQuestions = shuffledQuestions.slice(0, 10);

    // Create the final question object
    const questionObject = {};
    selectedQuestions.forEach((question, index) => {
      questionObject[`question_${index + 1}`] = {
        question: question.question_n,
        options: {
          A: question.A,
          b: question.b,
          c: question.c,
          d: question.d,
        },
        right_answer: question.right_answer,
      };
    });

    console.log(questionObject);
    const firstQuestion = questionObject["question_1"];

    qc.innerText = firstQuestion.question;
    option1.innerText = firstQuestion.options.A;
    option2.innerText = firstQuestion.options.b;
    option3.innerText = firstQuestion.options.c;
    option4.innerText = firstQuestion.options.d;
    var arr2 = [option1, option2, option3, option4];
    let user_answer = new Array(10);
    let Exam_answer = new Array(10);
    for (let i = 0; i < 10; i++) {
      Exam_answer[i] = questionObject[`question_${i + 1}`].right_answer;
    }
    console.log("serverrrr");
    console.log(Exam_answer);
    ////////////////////////////////////////////////////
    for (let i = 0; i < 4; i++) {
      arr2[i].addEventListener("click", () => {
        if (!Flg_answer) {
          arr2.forEach((option) => (option.style.backgroundColor = "white"));

          arr2[i].style.backgroundColor = "rgb(15, 167, 15)";

          answer = arr2[i].innerText;

          Flg_answer = 1;

          user_answer[ques_curr - 1] = answer;
        } else {
          arr2[i].style.backgroundColor = "white";
          Flg_answer = 0;
          user_answer[ques_curr - 1] = null;
        }

        console.log("User's answer: ", user_answer[ques_curr - 1]);
        console.log(user_answer);
        console.log(ques_curr + "mmmmmm");
      });
    }

    ///////////////////////////////////////////////////////////////////
    let current = 0;
    let ques_curr = 1;
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    run_clock("clockdiv", deadline);

    flag.addEventListener("click", () => {
      flag.style.backgroundColor = "rgba(170, 84, 134, 1)";
      console.log(qc.innerText);
      Array.from(buttonq).forEach((button) => {
        if (current + 1 == button.innerText) {
          console.log(`Button ${button.innerText} clicked`);
          qnum.innerText = ` Question ${button.innerText} out of 10`;
          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            data[button.innerText - 1].question_n +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[button.innerText - 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[button.innerText - 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[button.innerText - 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[button.innerText - 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          button.style.backgroundColor = "rgba(170, 84, 134, 1)";
          button.disabled = false;
          button.classList.remove("disabled");
          arr[current] = 1;
          console.log(arr);
        }
      });
    });

    Array.from(buttonq).forEach((button) => {
      button.addEventListener("click", () => {
        flag.style.backgroundColor = "rgba(170, 84, 134, 1)";
        if (arr[button.innerText - 1] == 1) {
          console.log(`Button ${button.innerText} clicked`);
          qnum.innerText = "";
          qnum.innerText = ` Question ${button.innerText} out of 10`;
          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            data[button.innerText - 1].question_n +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[button.innerText - 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[button.innerText - 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[button.innerText - 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[button.innerText - 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);
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
      flag.style.backgroundColor = "rgb(187, 184, 184)"; // Default flag icon color
      Flg_answer = 0;
      $(btn1).prop("disabled", false).removeClass("disabled");

      if (current + 1 < allButtons.length) {
        const currentButton = allButtons[current + 1]; // Get the current button
        if (
          currentButton.style.backgroundColor === "rgba(170, 84, 134, 1)" ||
          currentButton.style.backgroundColor === "rgb(170, 84, 134)"
        ) {
          flag.style.backgroundColor = "rgba(170, 84, 134, 1)"; // Update the flag icon color
        }
      }

      if (current <= 9) {
        console.log(`Button ${current + 1}:`, allButtons[current]); // Log each button

        qnum.innerText = "";
        if (ques_curr < 9) {
          ques_curr = ques_curr + 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;
        }

        console.log("Data fetched:", data[current]);
        if (current <= 8 && current != 9) {
          console.log(",,,," + (current + 1));

          console.log(questionObject[`question_${current + 1}`].question);

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            questionObject[`question_${current + 1}`].question +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' +
            questionObject[`question_${current + 1}`].options.A +
            "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' +
            questionObject[`question_${current + 1}`].options.b +
            "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' +
            questionObject[`question_${current + 1}`].options.c +
            "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' +
            questionObject[`question_${current + 1}`].options.d +
            "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          current++;
        }
        if (current == 9) {
          qnum.innerText = ` Question ${current + 1} out of 10`;

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            questionObject[`question_${current}`].question +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' +
            questionObject[`question_${current}`].options.A +
            "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' +
            questionObject[`question_${current}`].options.b +
            "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' +
            questionObject[`question_${current}`].options.c +
            "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' +
            questionObject[`question_${current}`].options.d +
            "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          btn2.innerText = "Finish Exam";

          console.log("mxxx");

          console.log(current);
          console.log(questionObject.length);
          console.log("------");

          btn2.addEventListener("click", () => {
            if (current + 1 === questionObject.length) {
              let grade = 0;
              for (let i = 0; i <= Exam_answer.length + 1; i++) {
                if (Exam_answer[i] === user_answer[i]) {
                  grade++;
                  console.log("welldone" + grade);
                }
              }
              console.log(`Exam finished! Your score is: ${grade}`);
            }
          });
        }
      }
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

      btn2.innerText = "NEXt";
      console.log("currr" + current);

      if (current > 0) {
        console.log(`Button ${current - 1}:`, allButtons[current - 1]);

        let qnum = document.getElementById("qnum");
        qnum.innerText = "";

        if (ques_curr > 1 && current <= 10) {
          ques_curr = ques_curr - 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;

          console.log("Data fetched:" + questionObject[`question_${current}`]);
          console.log(",,,," + (current - 1));
          console.log(questionObject[`question_${current - 1}`].question);

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' +
            questionObject[`question_${current - 1}`].question +
            "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' +
            questionObject[`question_${current - 1}`].options.A +
            "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' +
            questionObject[`question_${current - 1}`].options.b +
            "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' +
            questionObject[`question_${current - 1}`].options.c +
            "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' +
            questionObject[`question_${current - 1}`].options.d +
            "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          current = current - 1;
        }
      }
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
//
////////////////////////////////////////////////////////
