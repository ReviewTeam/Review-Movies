import { useState } from 'react'
import star from '../../assets/logos/star.svg'
import './Review.css'

function Review({id, imgSrc, imgAlt, movieName, score, userName, reviewText, reviewsState, setReviewsState}) {
    // console.log(imgSrc)
    // console.log(imgAlt)
    // console.log(movieName)
    // console.log(score)
    // console.log(userName)
    // console.log(reviewText)
    
    const [isEditingState, setIsEditingState] = useState(false)
    const [newReviewTextState, setNewReviewTextState] = useState(reviewText)

    const onInput = (e) => {
        console.log("value: ", e.target.value)
        setNewReviewTextState(e.target.value);
        console.log("new Revie Text State: ", newReviewTextState)
    }

    const onEdit = () => {
        if(isEditingState) {
            document.getElementsByClassName('reviewTextArea')[id].style.display = "none"
            console.log("Reviews State", reviewsState)
            const newReviewsState = [...reviewsState]
            console.log("New Review Text State", newReviewsState)
            console.log("id", id)
            newReviewsState[id].reviewText = newReviewTextState
            console.log("Updated New Review Text State", newReviewsState) 
            setReviewsState(newReviewsState)
        } else {
            document.getElementsByClassName('reviewTextArea')[id].style.display = "block"
        }

        setIsEditingState(!isEditingState)
    }
    
    return (
        <div className='flexContainer'>
            <div className="reviewContainer">
                <section className="reviewSectionCoverImage">
                    <img src={imgSrc} alt={imgAlt}/>
                </section>
                <section className="reviewSectionBody">
                    <section className="reviewSectionHeader">
                        <div className="headerItem">
                            <span>{movieName}</span>
                        </div>
                        <div className="headerItem">
                            {Array(score).fill(null).map((val, index) => (
                                <img key={index} src={star} alt="start" />
                            ))}
                        </div>
                        <div className="headerItem">
                            <span>{userName}</span>
                        </div>
                    </section>
                    <section className="reviewText">
                        <span>{reviewText}</span>
                        <button className="editReview" onClick={onEdit}>{!isEditingState ? "Edit" : "Save"}</button>
                    </section>
                </section>
            </div>
            <div> <textarea className="reviewTextArea" value={newReviewTextState} onInput={onInput}></textarea></div>
           
        </div> 
    )
}

export default Review