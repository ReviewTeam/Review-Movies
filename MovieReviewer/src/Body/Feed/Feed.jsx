import Review from "../Review/Review";
import Review1 from "../../Movie/MovieReview";
import "./Feed.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Feed({
  searchValue,
  reviewsState,
  setReviewsState,
  searchedReviewsState,
  setSearchedReviewsState,
}) {
  // console.log("array of reviews")
  // console.log(arrayReviews)
  console.log("Search revieweul state-ul este: ", searchedReviewsState);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // get the logged in user
    axios.get("http://localhost:8080/api/v1/feed").then((response) => {
      setReviews(response.data);
    });
  }, []);
  console.log(reviews);

  return (
    <div className="feed">
      {/* {searchValue
        ? searchedReviewsState.map((review, id) => {
            const newObject = {
              ...review,
              searchedReviewsState,
              setSearchedReviewsState,
            };
            return <Review key={id} id={id} {...newObject} />;
          })
        : reviewsState.map((review, id) => {
            const newObject = { ...review, reviewsState, setReviewsState };
            return <Review key={id} id={id} {...newObject} />;
          })} */}

      {reviews.map((review) => (
        <Review1 id={review.id}></Review1>
      ))}

      {/* <h3>Add new review</h3>
            
            <ReviewForm {...{setReviewsState}} /> */}
    </div>
  );
}

export default Feed;
