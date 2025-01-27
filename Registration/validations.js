export const messg = $(".messg");
export const input = $("input");
messg.hide();
input.removeClass("error");

export function NameValidation(index) {
  let isValid = false;

  $(input[index]).on("focus blur", function (event) {
    const nameInput = this.value.trim();

    if (event.type === "focus") {
      $(messg[index]).hide();
    } else if (event.type === "blur") {
      const isValidName = /^[A-Za-z\s]+$/.test(nameInput);

      if (!nameInput || !isValidName || nameInput.length < 7) {
        $(messg[index])
          .show()
          .text("Name must be at least 7 alphabetic characters");
        isValid = false;
      } else {
        $(messg[index]).hide();
        isValid = true;
      }
    }
  });

  return function () {
    return isValid;
  };
}
export function EmailValidation() {
  let isValid = false;

  $(input[2]).on("blur focus", function (event) {
    const emailInput = this.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (event.type === "focus") {
      $(messg[2]).hide();
    } else {
      if (!emailInput || !emailPattern.test(emailInput)) {
        $(messg[2])
          .show()
          .text("Email should be in this format: Example@example.com");
        isValid = false;
      } else {
        $(messg[2]).hide();
        isValid = true;
      }
    }
  });

  return function () {
    return isValid;
  };
}

export function displaypass(iconid, index) {
  let originvalue = "";
  let markedvalue = "";
  let passvisible = false;

  $(input[index]).off("input blur focus");
  $(iconid).off("click");

  $(input[index]).on("input", function () {
    const newChar = this.value.slice(-1);
    if (this.value.length > originvalue.length) {
      originvalue += newChar;
    } else {
      originvalue = originvalue.slice(0, -1);
    }

    markedvalue = "*".repeat(originvalue.length);
    if (!passvisible) {
      $(input[index]).val(markedvalue);
    }
  });

  $(iconid).on("click", function () {
    passvisible = !passvisible;
    $(input[index]).val(passvisible ? originvalue : markedvalue);
    $(this).toggleClass("bi-eye-fill bi-eye-slash-fill");
  });
  return function getPassword() {
    return originvalue;
  };
}

export function passwordValidation() {
  $(input[3]).off("blur focus");
  let originvalue;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const originPassword = displaypass("#passicon", 3);

  $(input[3]).on("blur focus", function (event) {
    if (event.type === "focus") {
      $(messg[3]).hide();
    } else if (event.type === "blur") {
      originvalue = originPassword();
      console.log("Password:", originvalue);

      if (!passwordPattern.test(originvalue)) {
        $(messg[3])
          .show()
          .text(
            "Password must have 8+ characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&)"
          );
      } else {
        $(messg[3]).hide();
      }
    }
  });
  return function getPassword() {
    return originvalue;
  };
}
export function ConfirmPassword() {
  const getPassword = displaypass("#passicon2", 4);
  const password = passwordValidation();
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let isPasswordMatch = false;
  let originvalue = "";

  $(input[4]).on("blur focus", function (event) {
    if (event.type === "focus") {
      $(messg[4]).hide();
    } else if (event.type === "blur") {
      originvalue = getPassword();
      console.log("Confirm Password:", originvalue);

      const passwordValue = password();
      console.log("Password from validation:", passwordValue);

      if (originvalue !== passwordValue) {
        $(messg[4]).show().text("Password does not match");
        isPasswordMatch = false;
      } else {
        $(messg[4]).hide();
        isPasswordMatch = true;
      }

      if (!passwordPattern.test(passwordValue)) {
        $(messg[3])
          .show()
          .text(
            "Password must have 8+ characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&) "
          );
        isPasswordMatch = false;
      } else {
        $(messg[3]).hide();
        isPasswordMatch = true;
      }
    }
  });

  return function getPasswordAndMatchStatus() {
    return {
      originvalue: originvalue,
      isPasswordMatch: isPasswordMatch,
    };
  };
}
