import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userEmail, onSignOut }) {
  return (
      <header className='header'>
        <img className='header__logo' src={logo} alt='логотип Место' />
        <Routes>
          <Route 
            path='/sign-in' 
            element={
              <Link to='/sign-up' className='header__link'>
                Регистрация
              </Link>
            } 
          />

          <Route 
            path='/sign-up' 
            element=
              {<Link to='/sign-in' className='header__link'>
                Войти
              </Link>
            } 
          />

          <Route 
            path='/' 
            element={
              <nav className='header__navigation'>
                <span className='header__email'>
                  {userEmail}
                </span>
                <button className='header__logout' type='button' onClick={onSignOut}>
                  Выйти
                </button>
              </nav>
            } 
          />
        </Routes>
      </header>
  );
}

export { Header };