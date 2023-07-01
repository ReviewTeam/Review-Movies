import { useState } from 'react'
import Navbar from './Header/Navbar/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PlaceHolder from './Profile/PlaceHolder'
import ProfilePage from './Profile/ProfilePage'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PlaceHolder />}/>
        <Route path='/profile/:username' element={<ProfilePage />}/>
      </Routes>
    </>
  )
}

export default App
