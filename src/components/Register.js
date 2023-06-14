import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';

/** компонент регистрации */

function Register({ onRegister }) {
  const { values, handleChange } = useForm({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  /** разметка jsx */
  return (
    <section className='auth'>
      <div className='auth__container'>
        <h3 className='auth__title'>Регистрация</h3>
        <form
          className='auth__form'
          name='auth-login'
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className='auth__input'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            type='email'
            placeholder='e-mail'
            minLength='2'
            maxLength='30'
            required
            autoComplete='off'
          />

          <input
            className='auth__input'
            name='password'
            value={values.password || ''}
            onChange={handleChange}
            type='password'
            placeholder='Пароль'
            minLength='8'
            maxLength='15'
            required
            autoComplete='off'
          />

          <button
            className='auth__submit-button'
            type='submit'
            aria-label='Кнопка регистрации'
          >
            Зарегистрироваться
          </button>

          <div className='auth__signup'>
            <p>Уже зарегистрированы?</p>
            <Link to='/sign-in' className='auth__link'>
              Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export { Register };