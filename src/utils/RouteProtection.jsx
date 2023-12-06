import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const routeProtection=({children})=>{
  const auth=useSelector((state)=>state.auth.status)
  location= useLocation()
  console.log(location)
  if(!auth){
      return <Navigate to={'/login'} state={{ from: location}} replace />
  }
  return children
}

export default routeProtection;