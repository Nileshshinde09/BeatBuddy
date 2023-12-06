import React from 'react'
import AlbamCard from '../albamCard'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TopArtist from '../topArtist';
import AlbumInfoCard from '../AlbumInfoCard/albumInfoCard';
import { homelist } from '../../slices/cardSlice';
import ArtistInfo from '../artistInfo';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
  const HomeStatealbum = useSelector((state) =>state.info.albumState)
  const HomeStateartist = useSelector((state) =>state.info.artistState)
  const dispatch = useDispatch()
  const [topAlbum, setTopAlbum] = useState(false)
  const navigate = useNavigate();
  const isAuthenticated=useSelector((state)=>state.auth.status)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      
    }
  }, [])
  
  useEffect(() => {
    axios.get('https://beatbuddybackend.onrender.com/api/v1/getTopAlbum')
      .then((res) => {
        setTopAlbum(res.data)
        dispatch(homelist(res.data))
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const chechInfo=()=>{
    if (HomeStatealbum) {
      return <AlbumInfoCard/>
    }
    if (HomeStateartist) {
      return <ArtistInfo/>
    }
  }
  
  return (
    <>
      {
        HomeStatealbum ||HomeStateartist ?
          chechInfo()
          :
          <>
            <div>
              <h1 onClick={handleClick} ref={ref} className='my-5 flex justify-center text-3xl text-center font-bold bg-gradient-to-r from-gray-50 to-red-400 bg-clip-text text-transparent'>
                <NavLink to={''} className={({ isActive }) => `block drop-shadow-2xl shadow-slate-950 ${isActive ? 'text-red-900 ' : 'text-slate-400 text-sm my-auto'}`}>{'TOP ALBUMS' || <Skeleton />}</NavLink>
                <NavLink to={'/artists'} className={({ isActive }) => `block drop-shadow-2xl shadow-slate-950 ${isActive ? 'text-red-900' : 'text-slate-400 text-sm my-auto'}`}>{'TOP ARTIST' || <Skeleton />}</NavLink>
              </h1>
              <TopArtist />
              <AlbamCard />
            </div>

          </>
      }
    </>
  )
}

export default Home
