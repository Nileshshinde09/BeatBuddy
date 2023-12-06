import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { setArtistFalse } from '../slices/infoSlice'
import { FaSpotify, FaYoutube, FaArrowCircleLeft } from "react-icons/fa";
import { SiYoutubemusic, SiApplemusic } from "react-icons/si";
const artistInfo = () => {
    const dispatch=useDispatch()
    const [Image, setImage] = useState(false)
    const name = useSelector((state) => state.info.artistData)
    const [social, setSocial] = useState(false);
    const [desc, setDesc] = useState(false)
    const [musicPlatformsUrl, setMusicPlatformsUrl] = useState(false)
    useEffect(() => {
        axios.get(`https://beatbuddybackend.onrender.com/api/v1/getDesc?name=${name}`)
            .then((res) => {
                setDesc(res.data);

            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(`https://beatbuddybackend.onrender.com/api/v1/ArtistImage?artistname=${name}`)
            .then((res) => {
                setImage(res.data);
                console.log((res.data));
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(`https://beatbuddybackend.onrender.com/api/v1/getSocialMedia?artistname=${name}`)
            .then((res) => {
                setSocial(res.data);
            })
            .catch((error) => {
                console.log(error);
            })


        axios.get(`https://beatbuddybackend.onrender.com/api/v1/getUrl?name=${name}`)
            .then((res) => {
                setMusicPlatformsUrl(res.data);

            })
            .catch((error) => {
                console.log(error);
            })
    }, [name])

    const handleLocation = () => {
        dispatch(setArtistFalse())
    }
    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className='m-3 text-4xl absolute text-violet-300'>
                    <FaArrowCircleLeft onClick={()=>handleLocation()} />
                </div>
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {
                            Image ?
                                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={Image} />
                                :
                                <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"><Skeleton className='h-full' /></div>
                        }
                        <div className=" lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-lg font-bold title-font text-gray-100 tracking-widest">{name}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
                            <div className="flex mb-4">

                                <span className="flex space-x-3 ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a href={social['Facebook'] || 'https://www.facebook.com/'} className="text-blue-600">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>

                                    </a>
                                    <a href={social['Twitter'] || 'https://twitter.com/'} className="text-sky-400">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a href={social['Instagram'] || 'https://instagram.com/'} className="text-red-400">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path>
                                        </svg>
                                    </a>

                                    <a href={social['YouTube'] || 'https://youtube.com/'} className="text-red-700 ">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            {desc ?
                                <p className="leading-relaxed text-white text-2xl">{desc}</p>
                                :
                                <Skeleton className='leading-relaxed ' count={5} />
                            }
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">


                            </div>
                            <div className="flex">
                                <span className="flex text-4xl space-x-3 ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a href={musicPlatformsUrl['spotify'] || 'https://www.spotify.com/'} className="text-green-600">
                                        <FaSpotify />
                                    </a>
                                    <a href={musicPlatformsUrl['youtube music'] || 'https://music.youtube.com/'} className="text-red-600">
                                        <SiYoutubemusic />
                                    </a>
                                    <a href={musicPlatformsUrl['apple music'] || 'https://music.apple.com/'} className="text-red-200">
                                        <SiApplemusic />
                                    </a>

                                    <a href={musicPlatformsUrl['youtube'] || 'https://youtube.com/'} className="text-red-600">
                                        <FaYoutube />
                                    </a>

                                </span>
                                <a href={musicPlatformsUrl['spotify'] || musicPlatformsUrl['youtube music'] || musicPlatformsUrl['youtube'] || 'https://www.spotify.com/'} className="flex ml-auto text-white justify-center text-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Listen</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default artistInfo
