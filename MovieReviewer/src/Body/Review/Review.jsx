import { useState } from 'react'
import star from '../../assets/logos/star.svg'
import './Review.css'

function Review({imgSrc, imgAlt, movieName, score, userName, reviewText}) {
    // console.log(imgSrc)
    // console.log(imgAlt)
    // console.log(movieName)
    // console.log(score)
    // console.log(userName)
    // console.log(reviewText)

    const [imgSrcState, setImgSrcState] = useState(imgSrc)
    const [imgAltState, setImgAltState] = useState(imgAlt)
    const [movieNameState, setMovieNameState] = useState(movieName)
    const [scoreState, setScoreState] = useState(score)
    const [userNameState, useUserNameState] = useState(userName)
    const [reviewTextState, setReviewTextState] = useState(reviewText)
    
    return (        
        <div className="reviewContainer">
            <section className="reviewSectionCoverImage">
                <img src={imgSrcState} alt={imgAltState}/>
            </section>
            <section className="reviewSectionBody">
                <section className="reviewSectionHeader">
                    <div className="headerItem">
                        <span>{movieNameState}</span>
                    </div>
                    <div className="headerItem">
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                    </div>
                    <div className="headerItem">
                        <span>{userNameState}</span>
                    </div>
                </section>
                <section className="reviewText">
                    <span>{reviewTextState}</span>
                </section>
            </section>
        </div>
    )
}

export default Review