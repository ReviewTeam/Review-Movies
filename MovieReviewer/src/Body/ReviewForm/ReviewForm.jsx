import { useState } from 'react';

export const ReviewForm = ({reviewsState, setReviewsState}) => {
    const [file, setFile] = useState();
    const [movie, setMovie] = useState();
    const [score, setScore] = useState();
    const [description, setDescription] = useState();

    const handleFileChange = (e) => {
        if(e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleMovieChange = (e) => {
        setMovie(e.target.value);
    }

    const handleScoreChange = (e) => {
        setScore(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    // const handleButtonClick = (e) => {
    //     const listReviews = reviewsState;

    //     listReviews.push({
    //         imgSrc: file,
    //         imgAlt: "God Father I Movie Photo",
    //         movieName: "God Father I",
    //         score: 10,
    //         userName: "user1",
    //         reviewText: "He is your papa"
    //     });

    //     e.preventDefault();
    //     setReviewsState();
    // }

    return (
        <>
            <form className="addReviewForm">
                <input type="file" id="addFile" onChange={handleFileChange}/>
                <label>Movie name </label>
                <input type="text" id="addMovie" onChange={handleMovieChange}/>
                <label>Score </label>
                <input type="number" id="addScore" onChange={handleScoreChange}/>
                <label>/10</label>
                <br />
                <label>Description:</label>
                <br />
                <textarea id="addDescription" onChange={handleDescription}></textarea>
            </form>

            <button id="addReview" /*onClick={handleButtonClick}*/>Add review</button>
        </>
    )
}