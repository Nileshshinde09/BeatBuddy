import { NavLink } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";

import { useLocation } from 'react-router-dom'
import React,{ useState,useEffect } from 'react'
import SubRecommender from './subHeader/subRecommender'
import SubVideo from './subHeader/subVideo'
import Skeleton from 'react-loading-skeleton'
import { navlocation } from '../slices/cardSlice'
import { useDispatch } from 'react-redux'
import 'react-loading-skeleton/dist/skeleton.css'
const nav = () => {
  const dispatch=useDispatch();
  const home="Discover a tailored musical experience with BEAT BUDDY, blending machine learning insights and React.js sophistication. Seamlessly navigate through a sleek interface, exploring personalized playlists that evolve with your unique taste. Welcome to the future of music discovery – your curated soundtrack awaits!"
  const [subhome, setsubHome] = useState(home);
  const [subtrending, setsubTrending] = useState(false);
  const [subrecommender, setsubRecommender] = useState(false);
  const location = useLocation();
  useEffect(() => {
    dispatch(navlocation(location.pathname))
    if (location.pathname=='/'){
      setsubHome(<SubVideo/>)
    }
    else if(location.pathname=='/recommender'){
      setsubHome(<SubRecommender/>)
    }
    else if(location.pathname=='/trending'){
      setsubHome(<SubVideo/>)
    }
    
  }, [location])
 
  return (
    <>
    <div className='max-sm:hidden text-2xl font-bold text-white mt-5 mx-5 md:mx-20 flex space-x-4 text-center '>
        <NavLink to={'/'} className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{'Home'||<Skeleton/>}</NavLink>
        <NavLink to={'/recommender'}  className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{'Recommender'||<Skeleton/>}</NavLink>
        <NavLink to={'trending'}  className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{'Trending'||<Skeleton/>}</NavLink>
    </div>
    <div className='sm:hidden text-2xl font-bold text-white mt-5 mx-5 flex justify-center space-x-10'>
        <NavLink to={'/'} className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{<IoHome />||<Skeleton/>}</NavLink>
        <NavLink to={'/recommender'}  className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{<MdOutlineSettingsSuggest />||<Skeleton/>}</NavLink>
        <NavLink to={'trending'}  className={({isActive})=>`block drop-shadow-2xl shadow-slate-950 ${isActive?'text-red-900 text-3xl ':'text-slate-400'}`}>{<FaFire />||<Skeleton/>}</NavLink>
    </div>
    <div className='sm:w-[25rem] w-screen min-sm:mt-5 text-xl  bg-gradient-to-r from-gray-950 to-red-800 bg-clip-text text-transparent text-center mx-auto'>
    {subhome||<Skeleton/>} 
    </div>
    </> 
  )
}

export default nav

