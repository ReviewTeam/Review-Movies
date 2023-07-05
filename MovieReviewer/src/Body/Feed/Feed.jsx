import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { useState } from 'react'

function Feed({reviewsState, setReviewsState}) {
    // console.log("array of reviews")
    // console.log(arrayReviews)
    const [fileState, setFileState] = useState("")
    const [altState, setAltState] = useState("")
    const [movieState, setMovieState] = useState("")
    const [scoreState, setScoreState] = useState(0)
    const [descriptionState, setDescriptionState] = useState("")

    const onChangeFile = (e) => {
        setFileState("src/assets/images/" + e.target.files[0].name)
    }

    const onChangeAlt = (e) => {
        setAltState(e.target.value)
    }

    const onChangeMovie = (e) => {
        setMovieState(e.target.value)
    }

    const onChangeScore = (e) => {
        setScoreState(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescriptionState(e.target.value)
    }
    
    const resetAllStates = () => {
        document.getElementById("addFile").value = ""
        setFileState("")
        setAltState("")
        setMovieState("")
        setScoreState(0)
        setDescriptionState("")
    }

    const onClickAddReview = (e) => {
        const score = parseInt(scoreState, 10)
        const val = (0 <= score && score <= 10) ? score : (score < 0) ? 0 : 10
        console.log(val)
        setReviewsState([...reviewsState, {
            imgSrc: fileState,
            imgAlt: altState,
            movieName: movieState,
            score: val,
            userName: "user1",
            reviewText: descriptionState
        }])

        console.log(reviewsState)
        resetAllStates()
    }

    return (
        <div className="feed">
            {reviewsState.map((review, id) => {
                const newObject = {...review, reviewsState: reviewsState, setReviewsState: setReviewsState}
                return <Review key={id} id={id} {...newObject}/>
            })}

            <h3>Add new review</h3>
            <form className="addReviewForm">
                <input type="file" onChange={onChangeFile} id="addFile"/>
                <label>Alt value</label>
                <input type="text" value={altState} onChange={onChangeAlt} id="addAlt"/>
                <label>Movie name </label>
                <input type="text" value={movieState} onChange={onChangeMovie} id="addMovie"/>
                <label>Score </label>
                <input type="number" value={scoreState} onChange={onChangeScore} id="addScore"/>
                <label>/10</label>
                <br />
                <label>Description:</label>
                <br />
                <textarea id="addDescription" value={descriptionState} onChange={onChangeDescription}></textarea>
            </form>
            <button id="addReview" onClick={onClickAddReview}>Add review</button>
        </div>
    )
}

export default Feed