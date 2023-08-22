import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/profile-pic.png";
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FirendList from "./FriendList";
import Review from "../Body/Review/Review";
import axios from "axios";

function ProfilePage() {
  // const { username } = useParams();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // Dummy users
  // const users = [
  //   {
  //     picture: { profilePic },
  //     username: "user1",
  //     firstName: "User",
  //     lastName: "1",
  //     email: "user1@example.com",
  //     score: 999,
  //   },
  //   {
  //     picture: { profilePic },
  //     username: "user2",
  //     firstName: "User",
  //     lastName: "2",
  //     email: "user2@example.com",
  //     score: 123,
  //   },
  //   {
  //     picture: { profilePic },
  //     username: "user3",
  //     firstName: "User",
  //     lastName: "3",
  //     email: "user3@example.com",
  //     score: 321,
  //   },
  // ];

  // find the user
  // let user;
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i].username === username) {
  //     user = users[i];
  //   }
  // }

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          {/* User information on the left */}
          <div className="col-3">
            <UserProfile />
          </div>

          {/* Reviews in the middle */}
          <div className="col-6">
            <Review></Review>
          </div>

          {/* Friend list on the right*/}
          {/* <div className="col-3">
            <FirendList />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
