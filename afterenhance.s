///////////////////////////////////////////////////////////
// 10 minutes from now
var time_in_minutes = 10;
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
  var clock = document.getElementById(id);
  function update_clock() {
    var t = time_remaining(endtime);
    clock.innerHTML = "minutes: " + t.minutes + "  seconds: " + t.seconds;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  update_clock(); // run function once at first to avoid delay
  var timeinterval = setInterval(update_clock, 1000);
}
run_clock("clockdiv", deadline);
// /////////////////////////////////////////////////////
var qc = document.getElementById("qc");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let btn1 = document.getElementById("btn1");
const flagg = document.getElementById("flagg");
let buttonq = document.getElementsByClassName("buttonq");
let qnum = document.getElementById("qnum");

fetch("question.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    qc.innerText = data[0].question_n;
    option1.innerText = data[0].A;
    option2.innerText = data[0].b;
    option3.innerText = data[0].c;
    option4.innerText = data[0].d;

    let current = 0;
    let ques_curr = 1;
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    flagg.addEventListener("click", () => {
      flagg.style.color = "rgba(170, 84, 134, 1)";
      console.log(qc.innerText);
      // console.log(current + "flag");
      Array.from(buttonq).forEach((button) => {
        if (current + 1 == button.innerText) {
          console.log(`Button ${button.innerText} clicked`);
          button.style.backgroundColor = "rgba(170, 84, 134, 1)";
          arr[current] = 1;
          console.log(arr);

          //////////////////////////

          //////////////////////////
        }
      });
    });

    Array.from(buttonq).forEach((button) => {
      button.addEventListener("click", () => {
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
    let btn2 = document.getElementById("btn2");

    btn2.addEventListener("click", () => {
      flagg.style.color = "rgb(255, 255, 255)";

      if (current <= 9) {
        // Ensure we don't exceed the number of questions
        console.log(`Button ${current + 1}:`, allButtons[current]); // Log each button

        qnum.innerText = "";
        if (ques_curr <= 9) {
          ques_curr = ques_curr + 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;
        }

        console.log("Data fetched:", data[current]);
        if (current <= 8 && current != 9) {
          // Only fetch and display questions if within bounds
          console.log(",,,," + (current + 1));
          console.log(data[current + 1].question_n);

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + data[current + 1].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[current + 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[current + 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[current + 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[current + 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          current++;
        }
        if (current == 9) {
          qnum.innerText = ` Question ${current + 1} out of 10`;

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + data[current].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[current].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[current].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[current].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[current].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          btn2.innerText = "Finish Exam";
          console.log("mxxx");
        }
      }
    });
    // ////////////*********************************************** */

    btn1.addEventListener("click", () => {
      flagg.style.color = "rgb(255, 255, 255)";
      btn2.innerText = "NEXt";
      console.log("currr" + current);
      if (btn1.innerText === "RETURN PAGE") {
        window.location.href = "start_exam.html"; // Redirect to start.html
      } else if (current > 0) {
        // Ensure we don't exceed the number of questions
        console.log(`Button ${current - 1}:`, allButtons[current - 1]); // Log each button

        let qnum = document.getElementById("qnum");
        qnum.innerText = "";
        if (ques_curr > 0 && current <= 10) {
          ques_curr = ques_curr - 1;
          qnum.innerText = ` Question ${ques_curr} out of 10`;

          console.log("Data fetched:", data[current]);
          // Only fetch and display questions if within bounds
          console.log(",,,," + (current - 1));
          console.log(data[current - 1].question_n);

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + data[current - 1].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[current - 1].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[current - 1].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[current - 1].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[current - 1].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);
          current = current - 1;
        }
        if (current == 0) {
          qnum.innerText = ` Question ${current + 1} out of 10`;

          var newdiv = document.createElement("div");
          newdiv.innerHTML =
            '<div class="ques_name">' + data[current].question_n + "</div>";
          qc.innerText = "";
          qc.appendChild(newdiv);

          var newdiv1 = document.createElement("div");
          newdiv1.innerHTML =
            '<div class="option1">' + data[current].A + "</div>";
          option1.innerText = "";
          option1.appendChild(newdiv1);

          var newdiv2 = document.createElement("div");
          newdiv2.innerHTML =
            '<div class="option2">' + data[current].b + "</div>";
          option2.innerText = "";
          option2.appendChild(newdiv2);

          var newdiv3 = document.createElement("div");
          newdiv3.innerHTML =
            '<div class="option3">' + data[current].c + "</div>";
          option3.innerText = "";
          option3.appendChild(newdiv3);

          var newdiv4 = document.createElement("div");
          newdiv4.innerHTML =
            '<div class="option4">' + data[current].d + "</div>";
          option4.innerText = "";
          option4.appendChild(newdiv4);

          console.log("mxxx prev");
        }
      }
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
//
////////////////////////////////////////////////////////
