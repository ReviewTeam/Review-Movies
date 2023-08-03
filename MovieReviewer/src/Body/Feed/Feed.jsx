import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { useState } from 'react'

function Feed({searchValue, reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}) {
    // console.log("array of reviews")
    // console.log(arrayReviews)
    console.log("Search revieweul state-ul este: ", searchedReviewsState);

    return (
        <div className="feed">
            {searchValue ? searchedReviewsState.map((review, id) => {
                const newObject = {...review, searchedReviewsState, setSearchedReviewsState}
                return <Review key={id} id={id} {...newObject}/>
            }) : reviewsState.map((review, id) => {
                const newObject = {...review, reviewsState, setReviewsState}
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