import { initialCards, validationConfig } from "./arrElements.js";
import { setInputInvalidState, toggleButtonState } from "./validate.js";

const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit-profile");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const detailInput = profilePopup.querySelector(".popup__input_type_detail");
const profileDetail = document.querySelector(".profile__details");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add");
const popupAddForm = document.querySelector(".popup__form_add");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContainer = popupImage.querySelector(".popup__image");
const popupName = popupImage.querySelector(".popup__image-name");
const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".elements-template");
const inputs = Array.from(
  document.querySelectorAll(validationConfig.inputSelector)
);
const nameProfile = popupAddForm.querySelector(".popup__input_type_name");
const linkProfile = popupAddForm.querySelector(".popup__input_type_link");

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

const closePopupEsc = (event) => {
  const popup = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    closePopup(popup);
  }
};

const createCard = (cardData) => {
  const card = cardTemplate.content.querySelector(".element").cloneNode(true);

  const elementName = card.querySelector(".element__name");
  const elementPhoto = card.querySelector(".element__photo");

  elementName.textContent = cardData.name;
  elementPhoto.src = cardData.link;
  elementPhoto.alt = cardData.name;

  elementPhoto.addEventListener("click", () => {
    openPopup(popupImage);
    popupImageContainer.src = cardData.link;
    popupImageContainer.alt = cardData.name;
    popupName.textContent = cardData.name;
  });

  const buttonLike = card.querySelector(".element__like-button");
  const deleteElement = card.querySelector(".element__delete");

  const handleLike = () => {
    buttonLike.classList.toggle("element__like-button_active");
  };

  const handleDelete = () => {
    card.remove();
  };

  buttonLike.addEventListener("click", handleLike);
  deleteElement.addEventListener("click", handleDelete);

  return card;
};

const prependCard = (element) => {
  cardsContainer.prepend(element);
};

const appendCard = (element) => {
  cardsContainer.append(element);
};

initialCards.forEach((element) => {
  appendCard(createCard(element, openPopup));
});

buttonOpenEditProfilePopup.addEventListener("click", () => {
  profilePopupForm.querySelector(".popup__form_edit");

  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  detailInput.value = profileDetail.textContent;
  //toggleButtonState(inputs, submitButton, validationConfig);
  toggleButtonState(profilePopupForm, profilePopup, validationConfig);

  inputs.forEach((nameInput) => {
    const errElement = document.querySelector(`#err-${nameInput.id}`);
    setInputInvalidState(nameInput, errElement, validationConfig);
  });
});

profilePopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDetail.textContent = detailInput.value;
  closePopup(profilePopup);
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.reset();
  openPopup(popupAdd);
//  toggleButtonState(inputs, submitButton, validationConfig);
  toggleButtonState(popupAddForm, validationConfig);
});

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  const name = nameProfile.value;
  const link = linkProfile.value;
  const elementData = {
    name,
    link,
  };

  prependCard(createCard(elementData));
  closePopup(popupAdd);
};

function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", closePopupByClickOverlay);
});

popupAddForm.addEventListener("submit", handleCardFormSubmit);
