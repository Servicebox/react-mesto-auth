import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  //подписка на котекст 
  const currentUser = useContext(CurrentUserContext);

  //определим является ли пользователь владелцем картиники
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClass = `card__del ${isOwn && 'card__del_active'}`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  //разметка jsx
  return (
    <div className='card'>
      <div className='card__image'>
        <img
          className='card__img'
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className={cardDeleteButtonClass}
            type='button'
            aria-label='Значок удаления карточки'
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className='card__description'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Значок лайк'
            onClick={handleLikeClick}
          />
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export { Card };