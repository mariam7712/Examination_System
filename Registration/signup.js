import * as valid from "./validations.js";

async function FormValidation() {
  let responsedata;

  try {
    const responseGet = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responseGet.ok) {
      responsedata = await responseGet.json();
      console.log("Fetched user data:", responsedata);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  let isValid = true;
  let userData;

  const email1 = valid.EmailValidation();
  const firstName1 = valid.NameValidation(0);
  const lastName1 = valid.NameValidation(1);
  const confirmPassword = valid.ConfirmPassword();

  $("#btn").on("click", async function (e) {
    e.preventDefault();
    console.log("Form submission prevented. Starting validation.");

    isValid = true;

    $("#form input").each(function (index) {
      const inputValue = $(this).val();
      if (inputValue === "") {
        $(valid.messg[index]).show().text("This field is required");
        isValid = false;
      } else {
        $(valid.messg[index]).hide();

        if (responsedata.some((user) => inputValue === user.firstName)) {
          $(valid.messg[index]).show().text("This name already exists");
          isValid = false;
        }
        if (responsedata.some((user) => inputValue === user.lastName)) {
          $(valid.messg[index]).show().text("This last name already exists");
          isValid = false;
        }

        if (responsedata.some((user) => inputValue === user.email)) {
          $(valid.messg[index]).show().text("This email already exists");
          isValid = false;
        }
      }
    });

    if (!confirmPassword().isPasswordMatch && $("#password").val() !== "") {
      $(valid.messg[4]).show().text("Invalid password or password mismatch");
      isValid = false;
    }
    if (!firstName1() && $("#first-name").val() !== "") {
      $(valid.messg[0])
        .show()
        .text("Name must be at least 7 alphabetic characters");
      isValid = false;
    }
    if (!lastName1() && $("#last-name").val() !== "") {
      $(valid.messg[1])
        .show()
        .text("Name must be at least 7 alphabetic characters");
      isValid = false;
    }
    if (!email1() && $("#email").val() !== "") {
      $(valid.messg[2])
        .show()
        .text("Email should be in this format: Example@example.com");
      isValid = false;
    }

    if (!isValid) {
      console.log("Validation failed, form not submitted.");
      return false;
    }

    console.log("Validation passed. Preparing to send data...");

    const passwordvalue = confirmPassword().originvalue;

    userData = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      email: $("#email").val(),
      password: passwordvalue,
    };
    localStorage.setItem("firstName", userData.firstName);

    console.log("User data prepared for sending:", userData);

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data successfully sent. Server response:", data);
        console.log("Attempting redirection...");

        try {
          window.location.href = "../start_exam.html";

          setTimeout(() => {
            if (window.location.href.indexOf("start_exam.html") === -1) {
              console.log("Trying alternative redirection method...");
              window.location.replace("../start_exam.html");
            }
          }, 100);
          setTimeout(() => {
            if (window.location.href.indexOf("start_exam.html") === -1) {
              console.log("Trying alternative redirection method...");
              window.location.replace("../start_exam.html");
            }
          }, 200);
        } catch (redirectError) {
          console.error("Redirection error:", redirectError);
          const link = document.createElement("a");
          link.href = "../start_exam.html";
          document.body.appendChild(link);
          link.click();
        }
      } else {
        console.error("Failed to send data. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", FormValidation);
} else {
  FormValidation();
}
