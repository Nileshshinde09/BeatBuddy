import React from 'react'
import AlbamCard from '../albamCard'
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { recommendationlist,loading,loadingerror } from '../../slices/cardSlice';
import AlbumInfoCard from '../AlbumInfoCard/albumInfoCard';
import axios from 'axios';

const Recommender = () => {
  const dispatch=useDispatch()
  const RecommenderState = useSelector((state) =>state.info.albumState)
  const state=useSelector((state)=>state.cards.searchState)
  const data=useSelector((state)=>state.cards.searchData)
  const navigate = useNavigate();
  const isAuthenticated=useSelector((state)=>state.auth.status)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      
    }
  }, [])
  useEffect(() => {
    if(data){
      
      axios.get(`/api/v1/recommendSongs?songname=${data}`)
        .then((response) => {
          dispatch(loading())
          dispatch(recommendationlist(response.data));
        })
        .catch((error) => {
          dispatch(loading())
          dispatch(recommendationlist(response.data));
          console.error('Error:', error.message);
          dispatch(loadingerror())
        });
    }
  }, [data]);
  
  return (
    <>
    
    {
        RecommenderState?
        <AlbumInfoCard/>
        :
        <>
      <div>
      <AlbamCard/>
    </div>
        </>
      }
    </>
  )
}

export default Recommender
