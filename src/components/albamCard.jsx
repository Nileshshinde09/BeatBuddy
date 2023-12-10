import React from 'react'
import { useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Album,setAlbumTrue } from '../slices/infoSlice';
const albamCard = () => {
  const dispatch=useDispatch();
  const [recommendation, setRecommendation] = useState([])
  const [title, settitle] = useState('Top Albums')
  const data = useSelector((state) =>state.cards.recommendationlistData)
  const location=useSelector((state)=>state.cards.navlocation)
  const topalbum=useSelector((state)=>state.cards.homelistData)
  const trendingalbum=useSelector((state)=>state.cards.trendinglistData)
  const ref = useRef(null);
  const [skeletonstate, setSkeletonstate] = useState(true)
  const loading = useSelector((state) => state.cards.loading)
  const error=useSelector((state) => state.cards.loadingerror)
  useEffect(() => {
    if (data) {
      setRecommendation(data);
    }
  }, [data])

  useEffect(() => {
    if (data) {
      if (loading) {
        setSkeletonstate(true)
      }
      else {
        setSkeletonstate(false)
      }

    }
  }, [loading])

  
  useEffect(() => {
    if (location=='/') {
      settitle('Top Albums')
    }
    if (location=='/recommender') {
      settitle('Recommendation')
    }
    if (location=='/trending') {
      settitle('Trending')
    }
    
  }, [location])
  location

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const handleAlbum=(val)=>{
    if (val){
      dispatch(Album(val))
      dispatch(setAlbumTrue())
    }
  }
  
  return (
    <>
      <div ref={ref} onClick={handleClick} className='flex flex-wrap sm:space-x-2 h-screen sm:mx-40 mx-4 no-scrollbar overflow-y-scroll'>

        <div className="flex flex-wrap -mx-3 mb-5 ">
          <div className="w-full max-w-full px-3 mb-6  mx-auto ">
            <div className="relative flex-[1_auto] bg-gradient-to-r from-gray-50 to-red-300 flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-dashed border-stone-200 bg-white m-5">
              <div className="flex-auto block pb-8 px-9">
                <div className='md:mx-16 sm:mx-36'>
                  <div className="mb-2">
                    <h1 className="text-[1.75rem] text-dark text-center font-bold text-5xl">{title}</h1>
                    {
                      loading?
                      <div className="text-center">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                      :
                      <></>
                    }
                  </div>
                  <div className="flex flex-wrap w-full mx-auto md:mx-20">
                    <div></div>
                    {
                      title=='Recommendation' && !error?
                        recommendation ? Object.values(recommendation).map((value) => {
                          return (
                            <div onClick={()=>handleAlbum(value)} key={value[0]} className="flex flex-col bg-slate-900 shadow-2xl shadow-slate-950 hover:scale-110 transition hover:shadow-indigo-400  text-white rounded-xl p-2 text-center mb-11 lg:mr-2">
                              <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                                <img className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]" src={value[7]} alt='image' />
                              </div>
                              <div className="text-center w-[250px]">
                                <span className="block font-medium text-muted">{value[0]}</span>
                              </div>
                            </div>
                          )
                        })
                          :<></>
                        :<></>
                    }
                     {
                      title=='Top Albums'?
                      topalbum?Object.values(topalbum).map((value) => {
                        return (
                          <div onClick={()=>handleAlbum(value)} key={value[0]} className="flex flex-col bg-slate-900 shadow-2xl shadow-slate-950 hover:scale-110 transition hover:shadow-indigo-400  text-white rounded-xl p-2 text-center mb-11 lg:mr-2">
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
                      :
                      <></>

                    } 
                    {
                      title=='Trending'?
                      trendingalbum?Object.values(trendingalbum).map((value) => {
                        return (
                          <div onClick={()=>handleAlbum(value)} key={value[0]} className="flex flex-col bg-slate-900 shadow-2xl shadow-slate-950 hover:scale-110 transition hover:shadow-indigo-400  text-white rounded-xl p-2 text-center mb-11 lg:mr-2">
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
                    {error?
                     <div className='text-9xl text-bold'>
                      No Search Results
                      </div>
                      :
                      <></>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}





const Card = () => {
  return (
    <div className="flex flex-col bg-slate-900 shadow-2xl shadow-slate-950 hover:scale-110 transition hover:shadow-sky-300  text-white rounded-xl p-2 text-center mb-11 lg:mr-2">
      <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
        <div className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]">
          <Skeleton width={150} height={150} baseColor='gray' />
        </div>
      </div>
      <div className="text-center w-[250px]">
        <span className="block font-medium text-muted"><Skeleton baseColor='gray' /></span>
        <span className="block font-medium text-muted"><Skeleton baseColor='gray' /></span>
      </div>
    </div>
  )
}


export default albamCard
