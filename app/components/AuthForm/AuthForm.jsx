'use client';
import Styles from './AuthForm.module.css';
import {isResponseOk,authorize,getMe} from '../../api/api-utils';
import {useStore} from '@/app/store/app-store';
import {endpoints} from '../../api/config';
import {useState,useEffect} from 'react';
export const AuthForm = (props) => {
  const authContext =useStore();
  const [authData, setAuthData] = useState({email: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
const handleInput = (e) => {
  const newAuthData = authData;
  newAuthData[e.target.name] = e.target.value;
  setAuthData({ ...authData, [e.target.name]: e.target.value });
}
const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = await authorize(endpoints.auth, authData);
  if(isResponseOk(userData)) {
    authContext.login({...userData, id: userData._id}, userData.jwt); // login из контекста
    setMessage({ status: "success", text: "Вы авторизовались!" });
  } else {
    setMessage({ status: "error", text: "Неверные почта или пароль" });
  }
};
useEffect(() => {
  authorize(endpoints.auth, {identifier: 'aski@example.com', password: 'ilovehtml'})
    .then(res => console.log(res))
}, [])
useEffect(() => {
  let timer; 
  if (authContext.user) {
    timer = setTimeout(() => {
            /* В props close лежит функция закрытия попапа */
      props.close();
    }, 1000);
  }
  return () => clearTimeout(timer);
}, [authContext.user]);
  return (
    <form className={Styles['form']} onSubmit={handleSubmit}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input
  onInput={handleInput}
  className={Styles["form__field-input"]}
  name="email"
  type="email"
  placeholder="hello@world.com"
/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} type="password" placeholder='***********' onInput={handleInput}  name="password" />
        </label>
      </div>
      {message.status && (
    <p className={Styles["form__message"]}>{message.text}</p>
)}
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
