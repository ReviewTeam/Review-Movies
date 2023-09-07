import { Link } from "react-router-dom";
import { useState } from 'react'
import star from '../assets/logos/star.svg'
import like from '../assets/logos/like.svg'

function Review({id}) {
    // console.log(imgSrc)
    // console.log(imgAlt)
    // console.log(movieName)
    // console.log(score)
    // console.log(userName)
    // console.log(reviewText)
    // {id, imgSrc, imgAlt, movieName, score, userName, reviewText, likes, reviewsState, setReviewsState}
    
    const [isEditingState, setIsEditingState] = useState(false)
    const [imgSrc, setImgSrc] = useState();
    const [imgAlt, setImgAlt] = useState();
    const [movieName, setMovieName] = useState();
    const [score, setScore] = useState();
    const [userName, setUserName] = useState();
    const [reviewText, setReviewText] = useState();
    const [likes, setLikes] = useState();

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

    const onLiking = () => {
        const newReviewsState = [...reviewsState];
        newReviewsState[id].likes += 1;
        setReviewsState(newReviewsState);
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
                        <Link to="/movie/1">
                            <span>{movieName}</span>
                        </Link>
                        </div>
                        <div className="headerItem">
                            <img src={star} alt="start" />
                            <img src={star} alt="start" />
                            <img src={star} alt="start" />
                            <img src={star} alt="start" />
                            <img src={star} alt="start" />
                        </div>
                        <div className="headerItem">
                          <Link to="/profile/user1">
                            <span>{userName}</span>
                          </Link>
                        </div>
                    </section>
                    <section className="reviewSection">
                        <span>{reviewText}</span>
                        <div className="editDiv">
                            <img className="likeIcon" onClick={onLiking} src={like} alt="like" />
                            <span>{likes}</span>
                            <button className="editReview" onClick={onEdit}>{!isEditingState ? "Edit" : "Save"}</button>
                        </div>
                    </section>
                </section>
            </div>
            <div> <textarea className="reviewTextArea" value={reviewText} onInput={onInput}></textarea></div>
           
        </div> 
    )
}

export default Review;
