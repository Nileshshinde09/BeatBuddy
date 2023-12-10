import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye, FaCommentDots } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Related from '../related';
import { setAlbumFalse, Album, setArtistTrue, Artist } from '../../slices/infoSlice';
import { setRecommendationFalse } from '../../slices/cardSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Skeleton from 'react-loading-skeleton';
const albumInfoCard = () => {
  const dispatch = useDispatch();
  const [artisturl, setArtistUrl] = useState(false)
  const data = useSelector((state) => state.info.albumData)
  const artistname = data[1]
  const handleLocation = () => {
    dispatch(setAlbumFalse())
  }
  useEffect(() => {
    if (artistname) {
      axios.get(`/api/v1/ArtistImage?artistname=${artistname}`)
        .then((res) => {
          setArtistUrl(res.data);

        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [data])
  const getArtistInfo = (val) => {

    dispatch(Artist(val));
    dispatch(setAlbumFalse());
    dispatch(setArtistTrue());
    dispatch(setRecommendationFalse())
  }
  return (
    <>
      <div className=''>
        <div className='max-sm:hidden bg-gradient-to-b from-slate-50 via-violet-600 to-indigo-600 sm:h-1/2 h-[30rem] flex space-x-10'>
          <div className='m-3 text-3xl'>
            <FaArrowCircleLeft onClick={handleLocation} />
          </div>
          <div>
            <img src={data[7]} alt="" className='sm:w-[20rem] sm:ml-20 sm:py-10 mx-auto max-sm:absolute w-[10rem] mt-10' />
          </div>

          <div className='sm:mt-[10rem] space-x-2 space-y-1'>
            <div></div>
            <div className='flex'>
              <h1 className='text-white text-xl font-semibold'>Album : </h1>
              <h1 className='text-slate-200 text-xl font-semibold'>{data[0]}</h1>
            </div>

            <div className='flex '>
              <div className='flex space-x-3 max-sm:mt-[9rem]'>
                <div className='shrink-0'>
                  {artisturl ?
                    <div onClick={() => { getArtistInfo(data[1]) }}>
                      <img src={artisturl || "url"} alt="" className='hover:scale-110 transition shadow-xl hover:shadow-indigo-400 mt-2 rounded-full hover:rounded-3xl sm:w-24 sm:h-24 w-24 h-24' />
                    </div>
                    :
                    <Skeleton className='hover:scale-110 transition shadow-xl hover:shadow-indigo-400 mt-2 rounded-full hover:rounded-3xl sm:w-24 sm:h-24 w-24 h-24' />
                  }
                </div>
                <h1 className='text-slate-200 text-xl font-semibold my-auto'>{data[1]}</h1>
              </div>
            </div>

          </div>

          <div className='sm:mt-[17rem] max-sm:absolute mt-[28rem] space-x-2 sm:flex'>
            <div></div>
            <div className='flex space-x-2'>
              <h1 className='text-white font-semibold text-2xl mt-1'><FaRegEye /></h1>
              <h1 className='text-slate-200 text-xl font-semibold'>{data[3]}</h1>
            </div>

            <div className='flex space-x-2'>
              <h1 className='text-white font-semibold text-2xl'><AiOutlineLike /></h1>
              <h1 className='text-slate-200 text-xl font-semibold'>{data[4]}</h1>
            </div>

            <div className='flex space-x-2'>
              <h1 className='text-white font-semibold text-2xl'><FaCommentDots /></h1>
              <h1 className='text-slate-200 text-xl font-semibold'>{data[5]}</h1>
            </div>
          </div>
        </div>

        <div className='sm:hidden bg-gradient-to-b from-slate-50 via-violet-600 to-indigo-600 sm:h-1/2 h-[30rem] space-x-10'>
          <div className='absolute m-3 text-3xl'>
            <FaArrowCircleLeft onClick={handleLocation} />
          </div>
          <div className='py-5'>
            <img src={data[7]} alt="" className=' mx-auto w-[15rem] ' />
          </div>
          <div className='flex'>
              <h1 className='text-slate-200 text-xl font-semibold'>{data[0]}</h1>
          </div>        

          <div className='flex justify-center'>
              <div className='flex space-x-3'>
                <div className='shrink-0'>
                  {artisturl ?
                    <div onClick={() => { getArtistInfo(data[1]) }}>
                      <img src={artisturl || "url"} alt="" className='hover:scale-110 transition shadow-xl hover:shadow-indigo-400 mt-2 rounded-full hover:rounded-3xl sm:w-24 sm:h-24 w-24 h-24' />
                    </div>
                    :
                    <Skeleton className='hover:scale-110 transition shadow-xl hover:shadow-indigo-400 mt-2 rounded-full hover:rounded-3xl sm:w-24 sm:h-24 w-24 h-24' />
                  }
                </div>
                <h1 className='text-slate-200 text-xl font-semibold my-auto'>{data[1]}</h1>
              </div>
            </div>



          <div className='space-x-2 flex justify-center'>
            <div></div>
            <div className='flex space-x-2 justify-center'>
              <h1 className='text-white font-semibold text-2xl mt-1'><FaRegEye /></h1>
              <h1 className='text-slate-100 text-xl font-semibold'>{data[3]}</h1>
            </div>

            <div className='flex space-x-2 justify-center'>
              <h1 className='text-white font-semibold text-2xl'><AiOutlineLike /></h1>
              <h1 className='text-slate-100 text-xl font-semibold'>{data[4]}</h1>
            </div>

          </div>
            <div className='flex space-x-2 justify-center'>
              <h1 className='text-white font-semibold text-2xl'><FaCommentDots /></h1>
              <h1 className='text-slate-100 text-xl font-semibold'>{data[5]}</h1>
            </div>
        </div>
        <div className='py-20'>
        <Related />
        </div>
      </div>
      <div>
</div>
      </>
      )
}
      export default albumInfoCard

