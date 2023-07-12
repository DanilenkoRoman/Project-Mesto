import { validationConfig } from "./arrElements.js";

const setInputInvalidState = (input, errElement, validationConfig) => {
  input.classList.add(validationConfig.inputErrorClass);
  errElement.classList.add(validationConfig.errorClass);
  errElement.textContent = input.validationMessage;
};

const setInputValidState = (input, errElement, validationConfig) => {
  input.classList.remove(validationConfig.inputErrorClass);
  errElement.classList.remove(validationConfig.errorClass);
  errElement.textContent = "";
};

function checkInputValidity(input, validationConfig) {
  const errElement = document.querySelector(`#err-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(input, errElement, validationConfig);
  } else {
    setInputInvalidState(input, errElement, validationConfig);
  }
}

const disableButton = (button, validationConfig) => {
  button.setAttribute("disabled", "");
  button.classList.add(validationConfig.inactiveButtonClass);
};

const enableButton = (button, validationConfig) => {
  button.removeAttribute("disabled");
  button.classList.remove(validationConfig.inactiveButtonClass);
};

const toggleButtonState = (form, submitButton, validationConfig) => {
  if (form.checkValidity()) {
    enableButton(submitButton, validationConfig);
  } else {
    disableButton(submitButton, validationConfig);
  }
};

const setEventListeners = (form, validationConfig) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, validationConfig);
      toggleButtonState(form, submitButton, validationConfig);
    });
  });
};

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig);

export { setInputValidState };