import React from 'react'
import { useState, useEffect } from 'react';
import { Album } from '../slices/infoSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
const related = () => {
  const dispatch = useDispatch()
  const [recommendation, setRecommendation] = useState([])
  const [skeletonstate, setSkeletonstate] = useState(true)
  const relatedAlbum = useSelector((state) => state.cards.homelistData)
  const data = useSelector((state) => state.info.albumData)
  const Loading = useSelector((state) => state.cards.loading)
  const [related, setRelated] = useState(false)

  useEffect(() => {
    if (data) {
      if (Loading) {
        setSkeletonstate(true)
      }
      else {
        setSkeletonstate(false)
      }

    }
  }, [Loading])
  useEffect(() => {
    setRelated(Object.values(relatedAlbum).filter((value) => value[0] !== data[0]))

  }, [data])



  const handleAlbum = (val) => {
    if (val) {
      dispatch(Album(val))
    }
  }
  return (
    <div>
      <div className='text-center text-2xl text-slate-300 font-bold'>
        Related Albums
      </div>
      <>
        <div className='flex overflow-x-scroll no-scrollbar mt-10 space-x-10'>
          <div>

          </div>
          {
            related ? Object.values(related).map((value) => {
              return (
                <div onClick={() => handleAlbum(value)} key={value[0]} className="flex flex-col bg-slate-900 shadow-2xl shadow-slate-950 hover:scale-110 transition hover:shadow-indigo-400  text-white rounded-xl p-2 text-center mb-11 lg:mr-2">
                  <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                    <img className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]" src={value[7]} alt='image' />
                  </div>
                  <div className="text-center w-[250px]">
                    <span className="block font-medium text-muted">{value[0]}</span>
                  </div>
                </div>
              )
            })
              :
              <></>
          }
          {skeletonstate ?
            <>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </>
            :
            <></>
          }
        </div>
      </>
    </div>
  )
}
const Card = () => {
  return (
    <div className="flex flex-col bg-gray-800 hover:scale-105 transition hover:shadow-sky-300 text-white rounded-xl p-4 mb-4 md:mb-0">
      <div className="mb-4">
        <Skeleton width={160} height={160} baseColor="#4B5563" />
      </div>
      <div className="text-center">
        <span className="block font-medium text-gray-400">
          <Skeleton width={120} baseColor="#4B5563" />
        </span>
      </div>
    </div>
  )
}
export default related
