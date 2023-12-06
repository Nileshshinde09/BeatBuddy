import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home.jsx';
import Recommender from './components/Recommender/Recommender.jsx';
import Trending from './components/Trending/Trending.jsx';
import Layout from './components/Layout.jsx';
import { Provider } from 'react-redux';
import ArtistCard from './components/albamCard.jsx';
import store from './store/store.js';
import Login from './components/Login/login.jsx'
import Register from './components/Register/register.jsx';
import './index.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home /> || <Skeleton />}>
        <Route path='artists' element={<ArtistCard /> || <Skeleton />}></Route>
      </Route>
      <Route path='recommender' element={<Recommender /> || <Skeleton />}></Route>
      <Route path='trending' element={<Trending /> || <Skeleton />}></Route>
      <Route path='login' element={<Login /> || <Skeleton />}></Route>
      <Route path='register' element={<Register /> || <Skeleton />}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SkeletonTheme>
  </React.StrictMode>

)
