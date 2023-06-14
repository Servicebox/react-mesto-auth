import React from 'react';
import '../index.css';
import { usePopupClose } from '../hooks/usePopupClose';
function ImagePopup({ card, onClose }) {
  usePopupClose(card.link, onClose);
    //разметка jsx
  return (
    <div
      className={`popup popup-image ${card.link ? 'popup_opened' : ''}`}
      onClick={ onClose }
    >
      <div className='popup-image__container'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        />
        <figure className='image'>
          <img className='popup-image__img' src={card.link} alt={card.name} />
          <figcaption className='popup-image__title'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export { ImagePopup };