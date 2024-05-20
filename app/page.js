'use client';
import {useGetDataByCategory} from '@/app/api/api-hooks';
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsList} from './components/CardsListSection/CardsList'
import {Banner} from './components/Bannner/Banner.jsx';
import {Promo} from './components/Promo/Promo.jsx';
import { CardsListSection } from './components/CardsListSection/CardsListSection';
import {endpoints} from '@/app/api/config';
export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games,"popular");
  const newGames = useGetDataByCategory(endpoints.games,"new");
  return (
    <main className="main">
    <Banner/>
    {popularGames ? (
    <CardsListSection id='popular' title='Популярное' data={popularGames} type="slider"/>
    ):(<Preloader/>)}
    {newGames ?(
    <CardsListSection id='new' title='Новинки' data={newGames} type="slider"/>
    ):(<Preloader/>)}
    <Promo/>
    </main>
    )
} 
