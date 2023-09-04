import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/profile-pic.png";
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FirendList from "./FriendList";
import Review from "../Body/Review/Review";
import axios from "axios";

function ProfilePage() {
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
