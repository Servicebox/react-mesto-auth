import React from "react";
import { usePopupClose } from "../hooks/usePopupClose.js";

function PopupWithForm({
  isOpen,
  title,
  name,
  text,
  children,
  onClose,
  onSubmit,
}) {
  const popupOpened = isOpen ? 'popup_opened' : '';
  usePopupClose(isOpen, onClose);
  //разметка jsx
  return (
    <div className={`popup ${popupOpened}`}>

      <div className='popup__container'>
        <form className='form'
         name={name} 
         onSubmit={onSubmit}>
          <button className='popup__close' type='button'
           onClick={onClose} />
          <h2 className='popup__title'>{title}</h2>

          {children}

          <button
            className='form__submit-button'
            type='submit'
            aria-label='Кнопка сохранения изменений в профиле'
          >
            {text || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export { PopupWithForm };