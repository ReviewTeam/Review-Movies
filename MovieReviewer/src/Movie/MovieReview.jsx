import { Link } from "react-router-dom";
import {useEffect, useState} from 'react'
import star from '../assets/logos/star.svg'
import like from '../assets/logos/like.svg'
import review from "../Body/Review/Review.jsx";
import axios from "axios";

function Review({ id }) {
    // console.log(imgSrc)
    // console.log(imgAlt)
    // console.log(movieName)
    // console.log(score)
    // console.log(userName)
    // console.log(reviewText)
    // {id, imgSrc, imgAlt, movieName, score, userName, reviewText, likes, reviewsState, setReviewsState}
    console.log("movie review");
    const [isEditingState, setIsEditingState] = useState(false)
    const [imgSrc, setImgSrc] = useState();
    const [imgAlt, setImgAlt] = useState();
    const [movieName, setMovieName] = useState();
    const [score, setScore] = useState();
    const [userName, setUserName] = useState();
    const [reviewText, setReviewText] = useState();
    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState();
    const [newReviewText, setNewReviewText] = useState("");

    console.log("Id este " + id);
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                },
            })
            .then((response) => {
                const data = response.data;
                const user = data.user;
                const movie = data.movie;
                setImgSrc(movie.image);
                setImgAlt(movie.title + " " + movie.year);
                setMovieName(movie.title);
                setScore(data.rating);
                setUserName(user.username);
                setReviewText(data.description);
                setLikes(data.nrLikes);

                axios
                    .post(`http://localhost:8080/api/v1/reviews/like-info/${id}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                        },
                    })
                    .then((response) => {
                        const data = response.data;
                        setLiked(data.likedByCurrentUser);
                    })
                    .catch(console.log);

                console.log("img src: ", imgSrc);
                console.log("img alt: ", imgAlt);
                console.log("movie name: ", movieName);
                console.log("score: ", score);
                console.log("user name: ", userName);
                console.log("review text: ", reviewText);
                console.log("likes: ", imgSrc);
            })
            .catch(console.log);
    }, []);

    const onInput = (e) => {
        console.log("value: ", e.target.value)
        setNewReviewText(e.target.value);
        console.log("new Revie Text State: ", newReviewText)
    }

    const onEdit = () => {
        if(isEditingState) {
            document.getElementsByClassName('reviewTextArea')[key - 1].style.display = "none";
        } else {
            document.getElementsByClassName('reviewTextArea')[id].style.display = "block"
        }

        setIsEditingState(!isEditingState)
    }

    const onLiking = () => {
        axios
            .post(`http://localhost:8080/api/v1/reviews/like-info/${id}`, {},{
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                },
            })
            .then((response) => {
                const data = response.data;
                setLikes(data.nrLikes);
                setLiked(data.likedByCurrentUser);
            })
            .catch(console.log);
    }
    
    return (
        <div className='flexContainer'>
            <div className="reviewContainer">
                <section className="reviewSectionCoverImage">
                    <img src={`data:image;base64,${imgSrc}`} alt={imgAlt}/>
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
