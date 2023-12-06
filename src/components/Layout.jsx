import React from 'react'
import Header from './Header/header'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Layout = () => {
  const toggleheaderalbum=useSelector((state)=>state.info.albumState)
  const toggleheaderartist=useSelector((state)=>state.info.artistState)
  return (
    <div className='mx-auto'>
       <>
       {!toggleheaderalbum && !toggleheaderartist?
          <Header/>
          :
          <></>
       }
        <Outlet/>
       </> 
    
    </div>
  )
}

export default Layout
