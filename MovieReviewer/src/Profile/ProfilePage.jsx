import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/profile-pic.png";
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FriendList from "./FriendList";
// import Review from "../Body/Review/Review";
import Review from "../Movie/MovieReview";
import axios from "axios";

function ProfilePage() {
  const { username } = useParams();
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [userReviews, setUserReview] = useState([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/v1/reviews/user-reviews/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          setUserReview(response.data);

          let scr = 0;
          for (let i = 0; i <= response.data.length; i++) {
            scr += response.data[i].nrLikes;
          }
          setUserScore(scr);
        });
    }
  }, [username]);

  console.log(userScore);

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          {/* User information on the left */}
          <div className="col-3">
            <UserProfile userScore={userScore} />
          </div>

          {/* Reviews in the middle */}
          <div className="col-6">
            {userReviews.map((review) => (
              <Review id={review.id}></Review>
            ))}
          </div>

          {/* Friend list on the right*/}
          <div className="col-3">
            <FriendList />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;