import * as valid from "./validations.js";

async function FormValidation() {
  let responsedata;
  const responseGet = await fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (responseGet.ok) {
    responsedata = await responseGet.json();
    console.log(responsedata);
  }

  let isValid = true;
  let userData;

  const email1 = valid.EmailValidation();
  const firstName1 = valid.NameValidation(0);
  const lastName1 = valid.NameValidation(1);

  const confirmPassword = valid.ConfirmPassword();

  $("#btn").click(async function (e) {
    isValid = true;
    e.preventDefault();
    if (!confirmPassword().isPasswordMatch) {
      $(valid.messg[4]).show().text("Invalid password or password mismatch");
      isValid = false;
    }

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
        .text("Email should be in this format:Example@example.com");
    }

    if (!isValid && $("#password").val() !== "") {
      e.preventDefault();
      return false;
    }

    if (isValid) {
      // Get the real password from ConfirmPassword function
      const passwordvalue = confirmPassword().originvalue; // This is the real password

      userData = {
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        email: $("#email").val(),
        password: passwordvalue, // Use the real password value
      };

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
          console.log(data);
          window.location.href = "../start_exam.html";
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  });
}

FormValidation();
