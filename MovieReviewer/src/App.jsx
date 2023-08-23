import { useState } from 'react'
import Navbar from './Header/Navbar/Navbar'
import HarryPotterMovie from './assets/images/HarryPotterMovie.jpg'
import Inception from './assets/images/Inception.jpg'
import JohnWick1 from './assets/images/JohnWick1.jpg'
import TheGodfatherI from './assets/images/TheGodfatherI.jpg'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './Profile/ProfilePage'
import ReviewBody from './Body/ReviewBody'

function App() {
    const [reviewsState, setReviewsState] = useState([
      {
          imgSrc: HarryPotterMovie,
          imgAlt: "Harry Potter Movie Photo",
          movieName: "Harry Potter",
          score: 10,
          userName: "user1",
          reviewText: "One of the best movies ever made",
          likes: 0
      },
      {
          imgSrc: Inception,
          imgAlt: "Inception Movie Photo",
          movieName: "Inception",
          score: 10,
          userName: "user1",
          reviewText: "Inception breaks the laws",
          likes: 0
      },
      {
          imgSrc: JohnWick1,
          imgAlt: "John Wick Movie Photo",
          movieName: "John Wick",
          score: 10,
          userName: "user1",
          reviewText: "Thanos should be afraid of him",
          likes: 0
      },
      {
          imgSrc: TheGodfatherI,
          imgAlt: "God Father I Movie Photo",
          movieName: "God Father I",
          score: 10,
          userName: "user1",
          reviewText: "He is your papa",
          likes: 0
      },
      {
        imgSrc: JohnWick1,
        imgAlt: "John Wick Movie Photo",
        movieName: "John Wick",
        score: 10,
        userName: "user1",
        reviewText: "Thanos should be afraid of him 2",
        likes: 0
      },
    ])

  const [searchValue, setSearchValue] = useState('')
  const [searchedReviewsState, setSearchedReviewsState] = useState([])

  const onChange = (e) => {
    console.log("Changing the value to: " + e.target.value)
    setSearchValue(e.target.value.toLowerCase())

    const listReviews = []

    for(let i = 0; i < reviewsState.length; i++) {
      console.log(`For review ${i} we have ${reviewsState[i].movieName.toLowerCase()}`)
      console.log(reviewsState[i].movieName.toLowerCase().startsWith(e.target.value.toLowerCase()));
      if(reviewsState[i].movieName.toLowerCase().startsWith(e.target.value.toLowerCase())) {
        listReviews.push(reviewsState[i])
        console.log(listReviews)
      }
    }

    console.log(listReviews)
    setSearchedReviewsState(listReviews)
    console.log(searchedReviewsState)
  }

  console.log("search review state-ul este ", searchedReviewsState)
  return (
    <>
      <Navbar {...{searchValue, onChange}}/>
      <Routes>
        <Route path='/' element={<ReviewBody {...{searchValue, reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}}/>}/>
        <Route path='/profile/:username' element={<ProfilePage />}/>
      </Routes>
    </>
  )
}

export default App
