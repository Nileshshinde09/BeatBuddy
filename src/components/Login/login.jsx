import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../../slices/authSlice';
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const isAuthenticated=useSelector((state)=>state.auth.status)
    
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
        
      }
    }, [])
    const _login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (

        <div>
            <div className=' overflow-y-scroll no-scrollbar sm:ml-3'>
                <div className='lg:flex mx-auto sm:space-x-28'>
                    <div>
                        <div className='max-sm:pt-[1rem] sm:mt-[10rem] sm:flex'>
                            <div className=''>
                                <h1 className='text-[5rem] max-sm:order-1 font-extrabold min-lg:text-[5rem] sm:text-[4rem] text-white drop-shadow-xl opacity-20'>
                                    {'BEAT BUDDY' || <Skeleton />}
                                </h1>
                                <h1 className=' max-sm:hidden font-extrabold max-sm:order-3 text-9xl bg-gradient-to-r from-gray-50 to-red-300 bg-clip-text text-transparent drop-shadow-xl'>
                                    {'PLAY.' || <Skeleton />}
                                </h1>
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
                                        <img src='home.png' className='max-sm:h-[15rem] sm:h-[20rem] sm:mt-[1rem] min-lg:h-[25rem] drop-shadow-xl'>
                                        </img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <section className="bg-gray-50 sm:w-[30rem] dark:bg-gray-900">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Sign in to your account
                                        </h1>
                                        <p className="mt-2 text-center text-base text-white">
                                            Don&apos;t have any account?&nbsp;
                                            <Link
                                                to="/register"
                                                className="font-medium text-blue-300 text-primary transition-all duration-200 hover:underline"
                                            >
                                                Sign Up
                                            </Link>
                                        </p>
                                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(_login)}>
                                            <div>
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                                                {...register("email", {
                                                    required: true,
                                                    validate: {
                                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                            "Email address must be a valid address",
                                                    }
                                                })}
                                                />
                                            </div>
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                                {...register("password", {
                                                    required: true,
                                                })}
                                                 />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                
                                            </div>
                                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
