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

            <h3>Add new review</h3>
            <form className="addReviewForm">
                <input type="file" id="addFile"/>
                <label>Movie name </label>
                <input type="text" id="addMovie"/>
                <label>Score </label>
                <input type="number" id="addScore"/>
                <label>/10</label>
                <br />
                <label>Description:</label>
                <br />
                <textarea id="addDescription"></textarea>
            </form>
            <button id="addReview">Add review</button>
        </div>
    )
}

export default Feed