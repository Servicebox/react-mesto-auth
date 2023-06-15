import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import '../index.css';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { Login } from './Login.js';
import { Register } from './Register.js';

import { ProtectedRoute } from './ProtectedRoute.js';

import { ImagePopup } from './ImagePopup.js';
import { InfoTooltip } from './InfoTooltip.js';

import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import { api } from '../utils/Api.js';
import { auth } from '../utils/Auth.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(
    {}
  );
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  // const [isLoading, setIsLoading] = /** переменная для отслеживания состояния загрузки во время ожидания ответа от сервера */
  //   useState(
  //     false
  //   );

  const [isLoadingEditProfilePopup, setIsLoadingEditProfilePopup] = useState(false); 
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false); 
  const [isLoadingEditAvatarPopup, setIsLoadingEditAvatarPopup] = useState(false); 
  const [isLoadingConfirmDeletePopup, setIsLoadingConfirmDeletePopup] = useState(false); 

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  
  useEffect(() => {
    if (isLoggedIn) { // я на столько измоталась с этой работой,что уже не понимаю элементарных вещей
      Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([currentUser, initialCards]) => {
        setCurrentUser(currentUser);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);

  /** проверка токена */
  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(()=> {
    if (isLoggedIn) {
      navigate('/')
    }
  },[isLoggedIn, navigate]);

  /** обработчики */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(request) {
    //setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      //.finally(() => setIsLoading(false));
  }


  function handleCardDelete(card) {
    setIsLoadingConfirmDeletePopup(true)
    function makeRequest() {
      return api
        .removeCard(card._id)
        .then(() => {
          setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
        .finally(() => {setIsLoadingConfirmDeletePopup(false)})
    }
    handleSubmit(makeRequest);
  }


  function handleUpdateUser(inputValues) {
    setIsLoadingEditProfilePopup(true)
    function makeRequest() {
      return api
        .editUserInfo(inputValues)
        .then(setCurrentUser)
        .finally(() => {setIsLoadingEditProfilePopup(false)})
    }
    handleSubmit(makeRequest);
  }


  function handleUpdateAvatar(inputValues) {
    setIsLoadingEditAvatarPopup(true)
    function makeRequest() {
      return api
        .editUserAvatar(inputValues)
        .then(setCurrentUser)
        .finally(() => {setIsLoadingEditAvatarPopup(false)})
    }
    handleSubmit(makeRequest);
  }


  function handleAddPlaceSubmit(inputValues) {
    setIsLoadingAddPlacePopup(true)
    function makeRequest() {
      return api
        .addCards(inputValues)
        .then((newCard) => {
          setCards([newCard, ...cards])
      })
        .finally(() => {setIsLoadingAddPlacePopup(false)})
    }
    handleSubmit(makeRequest);
  }


  function handleRegister(data) {
    return auth
      .register(data)
      .then((res) => {
        setIsSuccessInfoTooltipStatus(true);
        openInfoTooltip();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
        openInfoTooltip();
      })
  }

  /** обработчик авторизации пользователя */
  function handleLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(data.email)
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** перенаправляем пользователя после проверки токена */
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .checkToken(jwt)
      .then((res) => {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /** обработчик чекаута пользователя */
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  /** закрытие всех попап */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }


  //разметка jsx
  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Header loggedIn={isLoggedIn} userEmail={userEmail} onSignOut={handleSignOut} />

          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleDeleteClick}
                  onConfirmDelete={handleDeleteClick}
                />
              }
            />

            <Route
              path='/sign-in'
              element={
                <Login navigate={navigate} onLogin={handleLogin} />
              }
            />

            <Route
              path='/sign-up'
              element={
                <Register navigate={navigate} onRegister={handleRegister} />
              }
            />

            <Route path='*' 
              element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' /> } 
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingEditProfilePopup}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoadingAddPlacePopup}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            card={deletedCard}
            onSubmit={handleCardDelete}
            isLoading={isLoadingConfirmDeletePopup}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoadingEditAvatarPopup}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isConfirmStatus={isSuccessInfoTooltipStatus}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>

  );
}

export default App;
