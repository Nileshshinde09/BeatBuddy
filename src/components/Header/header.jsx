import React, { useEffect } from 'react'
import Nav from '../nav'
import { useNavigate, Link } from 'react-router-dom';
import { logout as authLogout } from '../../slices/authSlice';
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const header = () => {
  const navigate = useNavigate();
  const sessionstate = useSelector((state) => state.auth.status)
  const [session, setsession] = useState(true)
  const [error, setError] = useState("")
  const dispatch=useDispatch()
  useEffect(() => {
    setsession(sessionstate)
  }, [sessionstate])

  const handleLogout = async () => {
    setError('')
    try {
      const session = await authService.logout()

      dispatch(authLogout())


      navigate("/login")
    } catch (error) {
    setError(error.message)
  }
}
return (
  <>
    {
      session ?
        <div className=' overflow-y-scroll no-scrollbar'>
          <div className='lg:flex mx-auto'>
            <div>
              <div className='max-sm:pt-[1rem] sm:flex'>
                <div className='min-lg:ml-[10rem] sm:ml-[10rem] sm:mt-[1rem]'>
                  <h1 className='hover:scale-110 transition text-[5rem] max-sm:order-1 font-extrabold min-lg:text-[5rem] sm:text-[4rem] text-white drop-shadow-xl opacity-20'>
                    {'BEAT BUDDY' || <Skeleton />}
                  </h1>
                  <h1 className='hover:scale-110 transition max-sm:hidden font-extrabold max-sm:order-3 text-9xl bg-gradient-to-r from-gray-50 to-red-300 bg-clip-text text-transparent drop-shadow-xl'>
                    {'PLAY.' || <Skeleton />}
                  </h1>
                  <button onClick={() => handleLogout()} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
                </div>
                <div className='overflow-hidden'>
                  <div className='flex'>
                    <h1 className='sm:hidden font-extrabold sm:text-9xl text-7xl text-white drop-shadow-xl'>
                      <div className='flex flex-col ml-5'>
                        <span>{'P' || <Skeleton />}</span>
                        <span>{'L' || <Skeleton />}</span>
                        <span>{'A' || <Skeleton />}</span>
                        <span>{'Y' || <Skeleton />}</span>
                      </div>
                    </h1>
                    <div>
                      <img src='public/home.png' className=' max-sm:h-[15rem] sm:h-[20rem] sm:mt-[1rem] min-lg:h-[25rem] drop-shadow-xl'/>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Nav />
            </div>
          </div>
        </div>
        :
        <>
        </>
    }
  </>

)
}

export default header
