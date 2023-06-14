const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  
  const obj = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-error",
  };
  
  // все модальные окна 
  const popup = document.querySelector(".popup");
  const popupProfile = document.querySelector('.popup-profile'); //мод.окно профиля
  const popupAdd = document.querySelector('.popup-add'); //мод.окно добавления карточки
  const popupImage = document.querySelector(".popup-image"); //мод.окно картинки
  
  // кнопки открытия модальных окон 
  const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка открытия модалки редактирования профиля
  const addCardButton = document.querySelector(".profile__add-button"); //кнопка открытия модалки добавления карточки
  const editAvatarButton = document.querySelector('.profile__avatar-edit'); //кнопка открытия модалки редактирования аватара
  const submitBtn = document.querySelector('.form__submit-button_profile');
  
  //формы модальных окон 
  const formCards = document.querySelector(".form-cards"); // форма модалки добавления карточек
  const formProfile = document.querySelector(".form-profile"); // форма модалки редактиования профиля
  const formAvatar = document.querySelector('.form-avatar'); //форма модалки изменения аватара пользователя
  
  // данные модального окна профиля и его инпуты 
  const nameProfileInput = document.querySelector(".form__input_text_name"); //поле ввода имени пользователя
  const jobProfileInput = document.querySelector(".form__input_text_job"); //поле ввода описания пользователя
  const nameProfileTitle = document.querySelector(".profile__name"); // имя пользователя
  const jobProfileTitle = document.querySelector(".profile__job"); //описание пользователя
  
  // инпуты модального окна добавления карточек 
  const nameImageAdd = document.querySelector(".form__input_image_name"); // название картинки
  const linkImageAdd = document.querySelector(".form__input_image_link"); // ссылка на картинку
  
  //данные модального окна просмотра изображения 
  const imageClicked = document.querySelector(".popup-image__img"); // изображение
  const nameImageClicked = document.querySelector(".popup-image__title"); // название изображения
  
  // данные шаблона 
  const cardsBlock = document.querySelector(".cards"); // секция всех карточек
  const likeNumber = document.querySelector('.card__like-number'); //для счетчика лайков
  const likeButton = document.querySelector('.card__like'); //кнопка лайка
  
  
  export {
    initialCards,
    obj,
    editProfileButton,
    addCardButton,
    formCards,
    formProfile,
    nameProfileInput,
    jobProfileInput,
    cardsBlock,
    editAvatarButton,
    formAvatar
  }
  