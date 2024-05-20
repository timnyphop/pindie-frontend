"use client";
import Styles from "./Game.module.css";
import {getNormalizedGameDataById,getJWT,removeJWT,getMe,checkIfUserVoted,vote} from '../../api/api-utils.js';
import {Preloader} from '../../components/Preloader/Preloader.js';
import { useEffect,useState } from "react";
import {useRouter} from 'next/navigation';
import {endpoints} from '../../api/config.js';
import {isResponseOk} from '../../api/api-utils.js';
import {GameNotFound} from '../../components/GameNotFound/GameNotFound.jsx';

import { useStore } from "@/app/store/app-store";
export default function GamePage(props) {
  const authContext =useStore();
  const [game,setGame]=useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  
  const handleVote = async () => {
    const jwt = authContext.token; // Данные о токене получаем из контекста
  let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
    : [];
  usersIdArray.push(authContext.user.id); // Данные о пользователе получаем из контекста
  const response = await vote(
      `${endpoints.games}/${game.id}`,
    jwt,
    usersIdArray
  );
  if (isResponseOk(response)) {
      setGame(() => {
        return {
          ...game,
        // Данные о пользователе получаем из контекста
        users: [...game.users, authContext.user],
      };
    });
        setIsVoted(true);
  }}
  const router = useRouter();
useEffect(() => {
  async function fetchData() {
      setPreloaderVisible(true);
    const game = await getNormalizedGameDataById(
      endpoints.games,
      props.params.id
    );
    isResponseOk(game) ? setGame(game) : setGame(null);
    setPreloaderVisible(false);
  }
  fetchData();
}, []);
  
useEffect(() => { // Данные о пользователе получаем из контекста authContext.user
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, game]);
  return (
    <main className="main">
      {
    game ? (
        <>
          <section className={Styles['game']}>
            <iframe className={Styles['game__iframe']} src={game.link}></iframe>
          </section>
          <section className={Styles['about']}>
            <h2 className={Styles['about__title']}>{game.title}</h2>
            <div className={Styles['about__content']}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
            <button
            disabled={!authContext.isAuth || isVoted}
            className={`button ${Styles["about__vote-button"]}`}
            onClick={handleVote}
            >
  {isVoted ? "Голос учтён" : "Голосовать"}
</button>
            </div>
          </section>
        </>
    ) : preloaderVisible?(
      <Preloader/>
    ):
      (
        <GameNotFound/>
    )
}
    </main>
    
  );
}