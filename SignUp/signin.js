import { displaypass } from "./validations.js";

// export const input = $("input");
function LoginValidation() {
  const pass = displaypass("#passicon", 1);
  $("#btn2").click(async function (e) {
    e.preventDefault();
    const enteredEmail = $("#emailcheck").val();
    console.log(enteredEmail);

    const enteredPassword = pass();
    console.log(enteredPassword);

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responsedata = await response.json();
        console.log(responsedata);
        const matchusers = responsedata.find(function (user) {
          return (
            user.email === enteredEmail && user.password === enteredPassword
          );
        });
        if (matchusers) {
          // window.location.href = "../start_exam.html";
          // localStorage.setItem("firstname", matchusers.firstname);
          localStorage.setItem("firstname", matchusers.firstName);
          window.location.replace("../start_exam.html");
        } else {
          $(".messg").show().text("Invalid email or password");
        }
      } else {
        console.error("Error: Failed to fetch. Status:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });
}
LoginValidation();
