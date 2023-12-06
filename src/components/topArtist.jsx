import React from 'react'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Artist,setArtistTrue } from '../slices/infoSlice'
const trendingArtist = () => {
    const dispatch =useDispatch()
    const [trendingArtist, setTrendingArtist] = useState(false)
    useEffect(() => {
        axios.get('/api/v1/getTopArtist')
            .then((res) => { setTrendingArtist(res.data) })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const getArtistInfo=(val)=>{
        dispatch(Artist(val));
        dispatch(setArtistTrue())
    }

    return (
        <>
            <div className='flex hover:scale-110 transition md:mx-20 sm:mx-10 mx-5 overflow-x-scroll space-x-5 no-scrollbar'>
                {trendingArtist ?
                    trendingArtist.map((val) => {
                        return (
                            <div onClick={()=>{getArtistInfo(val['artist'])}} className='shrink-0 text-center'>
                                <img src={val['url']} alt="" className='hover:scale-110 transition shadow-xl hover:shadow-indigo-400 mt-2 rounded-full hover:rounded-3xl sm:w-24 sm:h-24 w-24 h-24' />
                                <span className='text-white'>{val['artist']}</span>
                            </div>

                        )
                    })
                    :
                    <>
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                        <ArtistSkeleton />
                    </>
                }
            </div>


        </>
    )
}

export default trendingArtist


const ArtistSkeleton = () => {
    return (
        <>
            <div className='shrink-0 text-center'>
                <Skeleton className='rounded-full sm:w-24 sm:h-24 w-24 h-24' />
                <span className='text-white'><Skeleton /></span>
            </div>
        </>
    )
}