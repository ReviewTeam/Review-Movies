import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { useState } from 'react'

function Feed({reviewsState, setReviewsState}) {
    // console.log("array of reviews")
    // console.log(arrayReviews)

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