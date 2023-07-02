import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { useState } from 'react'

function Feed({reviewsState, setReviewsState}) {
    // console.log("array of reviews")
    // console.log(arrayReviews)

    return (
        <div className="feed">
            {reviewsState.map((review, id) => {
                const newObject = {...review, reviewsState: reviewsState, setReviewsState: setReviewsState}
                return <Review key={id} id={id} {...newObject}/>
            })}
        </div>
    )
}

export default Feed