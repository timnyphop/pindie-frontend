"use client";
import Styles from './Promo.module.css';
import {useState, useEffect} from 'react';
export const Promo = () => {
  const [codeIsVisible, SetCodeIsVisible] = useState(false);
  const handleButtonClick=()=>{
    SetCodeIsVisible(!codeIsVisible);
  }
  useEffect(() => {
    let timeout;
    if (codeIsVisible) {
        timeout = setTimeout(() => {
            SetCodeIsVisible(false);
        }, 5000);    
    }
    return () => {
        clearTimeout(timeout);
    };
}, [codeIsVisible]);
    return(
      <section className={Styles["promo"]}>
        <div className={Styles["promo__description-block"]}>
          <h2 className={Styles["promo__title"]}>Твой промо-код</h2>
          <p className={Styles["promo__description"]}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
          <button className={`button ${Styles["promo__button"]}`}onClick={handleButtonClick}>{codeIsVisible ? <span className={Styles["promo-code"]}>WEBTEENS10</span> : <span className={Styles["promo-code"]}>Получить код</span>}</button>
        </div>
        <img src="images\promo-illustration.svg" alt="Собака" className={Styles["promo__image"]}/>
      </section>
    )
  }