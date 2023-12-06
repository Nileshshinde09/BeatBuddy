import React from 'react'

const artistCard = () => {
  return (

    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-fit p-2  md:w-20 md:rounded-none md:rounded-s-lg" src="/public/home.png" alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
        </div>
    </a>

  )
}

export default artistCard
