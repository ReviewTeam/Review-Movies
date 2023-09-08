import { Link } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'
import star from '../assets/logos/star.svg'
import like from '../assets/logos/like.svg'
import "./MovieReview.css";
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
    const myElementRef = useRef(null);
    const [movieId, setMovieId] = useState();
    const [isEditing, setIsEditing] = useState(false)
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
                setMovieId(movie.id);
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
        if(isEditing) {
            myElementRef.current.querySelector('.reviewTextArea').style.display = "none";
            axios
                .put(`http://localhost:8080/api/v1/reviews/${id}`, {
                    movieId,
                    rating: score,
                    description: newReviewText
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                    },
                })
                .then((response) => {
                    console.log("update review with id " + id);
                    console.log(response.data);
                    setReviewText(newReviewText);
                })
                .catch(console.log);
        } else {
            myElementRef.current.querySelector('.reviewTextArea').style.display = "block"
        }

        setIsEditing(!isEditing);
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
        <div className='flexContainer' ref={myElementRef}>
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
                            <button className="editReview" onClick={onEdit}>{!isEditing ? "Edit" : "Save"}</button>
                        </div>
                    </section>
                </section>
            </div>
            <div>
                <textarea className="reviewTextArea" value={newReviewText} onInput={onInput} />
            </div>
           
        </div> 
    )
}

export default Review;
