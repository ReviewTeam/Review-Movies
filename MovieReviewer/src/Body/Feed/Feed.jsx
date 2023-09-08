import Review from "../../Movie/MovieReview";
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
      console.log(response);
      setReviews(response.data);
    });
  });

  return (
    <div className="feed">
      {reviews.map((review) => (
        <Review id={review.id}></Review>
      ))}
    </div>
  );
}

export default Feed;
