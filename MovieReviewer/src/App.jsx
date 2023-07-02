import { useState } from 'react'
import Navbar from './Header/Navbar/Navbar'
import HarryPotterMovie from './assets/images/HarryPotterMovie.jpg'
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
        reviewText: "One of the best movies ever made"
    },
    {
        imgSrc: HarryPotterMovie,
        imgAlt: "Harry Potter Movie Photo",
        movieName: "Harry Potter",
        score: 10,
        userName: "user1",
        reviewText: "One of the best movies ever made"
    },
    {
        imgSrc: HarryPotterMovie,
        imgAlt: "Harry Potter Movie Photo",
        movieName: "Harry Potter",
        score: 10,
        userName: "user1",
        reviewText: "One of the best movies ever made"
    },
    {
        imgSrc: HarryPotterMovie,
        imgAlt: "Harry Potter Movie Photo",
        movieName: "Harry Potter",
        score: 10,
        userName: "user1",
        reviewText: "One of the best movies ever made"
    },
    {
        imgSrc: HarryPotterMovie,
        imgAlt: "Harry Potter Movie Photo",
        movieName: "Harry Potter",
        score: 10,
        userName: "user1",
        reviewText: "One of the best movies ever made"
    },
])

  const [searchValue, setSearchValue] = useState("")
  const [searchedReviewsState, setSearchedReviewsState] = useState(reviewsState)

  const onChange = (e) => {
    setSearchValue(e.value)
  }

  const onClick = () => {
    const listReviews = []

    for(let i = 0; i < reviewsState.length; i++)
      if(reviewsState[i].userName == searchValue)
        listReviews.push(reviewsState[i])

    setSearchedReviewsState(listReviews)
  }

  return (
    <>
      <Navbar {...{searchValue, onChange, onClick}}/>
      <Routes>
        <Route path='/' element={<ReviewBody {...{reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}}/>}/>
        <Route path='/profile/:username' element={<ProfilePage />}/>
      </Routes>
    </>
  )
}

export default App
