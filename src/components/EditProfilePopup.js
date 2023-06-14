import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { PopupWithForm } from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) { 
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name); /** после загрузки текушего пользователя из апи его данные будут использованыв управляемых компонентах */
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  //разметка jsx
  return (
    <PopupWithForm
      name='popup-profile'
      title='Редактировать профиль'
      //text={onLoading? 'Сохраненяем...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__input-container'>
        <input
          type='text'
          name='name'
          id='name-input'
          className='form__input form__input_text_name'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          required
          onChange={handleEditName}
          value={name || ''}
        />
        <span className='form__input-error name-input-error' />
        <input
          type='text'
          name='about'
          id='job-input'
          className='form__input form__input_text_job'
          placeholder='О себе'
          minLength={2}
          maxLength={200}
          required
          onChange={handleEditDescription}
          value={description || ''}
        />
        <span className='form__input-error job-input-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export { EditProfilePopup };