import { useState } from 'react'
import Navbar from './Header/Navbar/Navbar'
import Body from './Body/ReviewBody'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PlaceHolder from './Profile/PlaceHolder'
import ProfilePage from './Profile/ProfilePage'
import ReviewBody from './Body/ReviewBody'
import SignUpPage from './SignUpPage/SignUpPage'
import HomePageNotLoggedIn from './HomePageNotLoggedIn/HomePageNotLoggedIn'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePageNotLoggedIn />}/>
        <Route path='/profile/:username' element={<ProfilePage />}/>
      </Routes>
    </>
  )
}

export default App
