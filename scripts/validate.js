import { validationConfig } from "./arrElements.js";

const setInputValidState = (input, errElement, validationConfig) => {
  input.classList.add(validationConfig.inputErrorClass);
  errElement.classList.add(validationConfig.errorClass);
  errElement.textContent = input.validationMessage;
};
const setInputInvalidState = (input, errElement, validationConfig) => {
  input.classList.remove(validationConfig.inputErrorClass);
  errElement.classList.remove(validationConfig.errorClass);
  errElement.textContent = "";
};

const enableButton = (button, validationConfig) => {
  button.removeAttribute("disabled");
  button.classList.remove(validationConfig.inactiveButtonClass);
};

const disableButton = (button, validationConfig) => {
  button.setAttribute("disabled", "");
  button.classList.add(validationConfig.inactiveButtonClass);
};

function checkInputValidity(input, validationConfig) {
  const errElement = document.querySelector(`#err-${input.id}`);
  if (input.checkValidity()) {
    setInputInvalidState(input, errElement, validationConfig);
  } else {
    setInputValidState(input, errElement, validationConfig);
  }
}

const toggleButtonState = (form, validationConfig) => {
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );
  if (form.checkValidity()) {
    enableButton(submitButton, validationConfig);
  } else {
    disableButton(submitButton, validationConfig);
  }
};

const setSubmitListener = (form, validationConfig) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    toggleButtonState(form, validationConfig);
  });
};

function setEventListeners(form, validationConfig) {
  setSubmitListener(form, validationConfig);
  toggleButtonState(form, validationConfig);

  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, validationConfig);
      toggleButtonState(form, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig);

export { setInputInvalidState, toggleButtonState };
