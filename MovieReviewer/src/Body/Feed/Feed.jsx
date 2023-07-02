import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { useState } from 'react'

function Feed() {
    // console.log("array of reviews")
    // console.log(arrayReviews)

    const [reviewsState, setReviewsState] = useState([
        {
            key: 1,
            imgSrc: HarryPotterMovie,
            imgAlt: "Harry Potter Movie Photo",
            movieName: "Harry Potter",
            score: 10,
            userName: "user1",
            reviewText: "One of the best movies ever made"
        },
        {
            key: 2,
            imgSrc: HarryPotterMovie,
            imgAlt: "Harry Potter Movie Photo",
            movieName: "Harry Potter",
            score: 10,
            userName: "user1",
            reviewText: "One of the best movies ever made"
        },
        {
            key: 3,
            imgSrc: HarryPotterMovie,
            imgAlt: "Harry Potter Movie Photo",
            movieName: "Harry Potter",
            score: 10,
            userName: "user1",
            reviewText: "One of the best movies ever made"
        },
        {
            key: 4,
            imgSrc: HarryPotterMovie,
            imgAlt: "Harry Potter Movie Photo",
            movieName: "Harry Potter",
            score: 10,
            userName: "user1",
            reviewText: "One of the best movies ever made"
        },
        {
            key: 5,
            imgSrc: HarryPotterMovie,
            imgAlt: "Harry Potter Movie Photo",
            movieName: "Harry Potter",
            score: 10,
            userName: "user1",
            reviewText: "One of the best movies ever made"
        },
    ])

    console.log({...reviewsState[0]})
    return (
        <div className="feed">
            {reviewsState.map((review) => (
                <Review {...review}/>
            ))}
        </div>
    )
}

export default Feed