import React from 'react'
import AlbamCard from '../albamCard'
import { useDispatch, useSelector } from 'react-redux';
import { trendinglist } from '../../slices/cardSlice';
import axios from 'axios';
import { useState,useEffect,useRef } from 'react';
import TrendingArtist from '../trendingArtist';
import AlbumInfoCard from '../AlbumInfoCard/albumInfoCard';
import ArtistInfo from '../artistInfo';
import { useNavigate } from 'react-router-dom';
const Trending = () => {
  const TrendingStatealbum = useSelector((state) =>state.info.albumState)
  const TrendingStateartist = useSelector((state) =>state.info.artistState)
  const dispatch= useDispatch()
  // const info= useSelector()
  const [trendingAlbum, setTrendingAlbum] = useState(false)
  const navigate = useNavigate();
  const isAuthenticated=useSelector((state)=>state.auth.status)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      
    }
  }, [])
  useEffect(() => {
      axios.get('/api/v1/getTrendingAlbum')
          .then((res) => {setTrendingAlbum(res.data)
            dispatch(trendinglist(res.data))
          })
          .catch((error) => {
              console.log(error);
          })
  }, [])
  const ref = useRef(null);
  const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
  }
  const chechInfo=()=>{
    if (TrendingStatealbum) {
      return <AlbumInfoCard/>
    }
    if (TrendingStateartist) {
      return <ArtistInfo/>
    }
  }
  return (
    <div ref={ref}>
      {
        TrendingStatealbum ||TrendingStateartist?
        chechInfo()
        :
        <> 
      <div>
        <h1 className='text-slate-300 text-3xl font-bold text-center my-2'>
          Trending Artist
        </h1>
      </div>
      <TrendingArtist/>
      <AlbamCard/>
        </>
      }
    </div>
  )
}

export default Trending
