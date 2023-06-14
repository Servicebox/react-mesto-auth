import { PopupWithForm } from './PopupWithForm.js';

function ConfirmDeletePopup({ card, isOpen, onClose, onSubmit, isLoading }) {
  function handleConfirmDelete(e) {
    e.preventDefault();
    onSubmit(card);
  }
  //разметка jsx
  return (
    <PopupWithForm
      name='popup-delete'
      title='Вы уверены?'
      text={isLoading? 'Удаляем...' : 'Удалить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmDelete}
    />
  );
}

export { ConfirmDeletePopup };