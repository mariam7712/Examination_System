// import * as valid from "./validations.js";

// async function FormValidation() {
//   let responsedata;
//   const responseGet = await fetch("http://localhost:3000/user", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (responseGet.ok) {
//     responsedata = await responseGet.json();
//     console.log(responsedata);
//   }

//   let isValid = true;
//   let userData;

//   const email1 = valid.EmailValidation();
//   const firstName1 = valid.NameValidation(0);
//   const lastName1 = valid.NameValidation(1);

//   const confirmPassword = valid.ConfirmPassword();

//   $("#btn").click(async function (e) {
//     isValid = true;
//     e.preventDefault();

//     $("#form input").each(function (index) {
//       const inputValue = $(this).val();
//       if (inputValue === "") {
//         $(valid.messg[index]).show().text("This field is required");
//         isValid = false;
//       } else {
//         $(valid.messg[index]).hide();

//         if (responsedata.some((user) => inputValue === user.firstName)) {
//           $(valid.messg[index]).show().text("This name already exists");
//           isValid = false;
//         }
//         if (responsedata.some((user) => inputValue === user.lastName)) {
//           $(valid.messg[index]).show().text("This last name already exists");
//           isValid = false;
//         }

//         if (responsedata.some((user) => inputValue === user.email)) {
//           $(valid.messg[index]).show().text("This email already exists");
//           isValid = false;
//         }
//       }
//     });
//     if (!confirmPassword().isPasswordMatch && $("#password").val() !== "") {
//       $(valid.messg[4]).show().text("Invalid password or password mismatch");
//       isValid = false;
//     }
//     if (!firstName1() && $("#first-name").val() !== "") {
//       $(valid.messg[0])
//         .show()
//         .text("Name must be at least 7 alphabetic characters");
//       isValid = false;
//     }
//     if (!lastName1() && $("#last-name").val() !== "") {
//       $(valid.messg[1])
//         .show()
//         .text("Name must be at least 7 alphabetic characters");
//       isValid = false;
//     }
//     if (!email1() && $("#email").val() !== "") {
//       $(valid.messg[2])
//         .show()
//         .text("Email should be in this format:Example@example.com");
//     }
//     if (!isValid) {
//       e.preventDefault();
//       return false;
//     }

//     if (isValid) {
//       // Get the real password from ConfirmPassword function
//       const passwordvalue = confirmPassword().originvalue; // This is the real password

//       userData = {
//         firstName: $("#first-name").val(),
//         lastName: $("#last-name").val(),
//         email: $("#email").val(),
//         password: passwordvalue, // Use the real password value
//       };

//       try {
//         const response = await fetch("http://localhost:3000/user", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           // window.location.href = "../start_exam.html";
//           $("#form").attr("action", "../start_exam.html");

//           return true;
//         }
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     }
//   });
// }
// FormValidation();

// // FormValidation();
import * as valid from "./validations.js";

async function FormValidation() {
  let responsedata;

  // Fetch existing user data
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

  // Define validation functions
  const email1 = valid.EmailValidation();
  const firstName1 = valid.NameValidation(0);
  const lastName1 = valid.NameValidation(1);
  const confirmPassword = valid.ConfirmPassword();

  // Button click event handler
  $("#btn").on("click", async function (e) {
    // Prevent form submission at the start
    e.preventDefault();
    console.log("Form submission prevented. Starting validation.");

    isValid = true; // Reset the validation flag

    // Perform validation
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

    // Password validation
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
      return false; // Stop if validation fails
    }

    // Validation passed, proceed to send data
    console.log("Validation passed. Preparing to send data...");

    const passwordvalue = confirmPassword().originvalue; // Real password

    userData = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      email: $("#email").val(),
      password: passwordvalue, // Real password value
    };

    console.log("User data prepared for sending:", userData);

    // Send the POST request
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

        // Try multiple redirection methods
        try {
          // Method 1: Direct assignment
          window.location.href = "../start_exam.html";

          // Method 2: Replace (if Method 1 fails)
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

          // Method 3: Absolute path (if Method 2 fails)
          // setTimeout(() => {
          //   if (window.location.href.indexOf("start_exam.html") === -1) {
          //     console.log("Trying absolute path redirection...");
          //     const currentPath = window.location.pathname;
          //     const basePath = currentPath.substring(
          //       0,
          //       currentPath.lastIndexOf("/")
          //     );
          //     const newPath = `../start_exam.html`;
          //     window.location.href = newPath;
          //   }
          // }, 200);
        } catch (redirectError) {
          console.error("Redirection error:", redirectError);
          // Final fallback: try a simple link click
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

// Make sure DOM is fully loaded before initializing
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", FormValidation);
} else {
  FormValidation();
}
