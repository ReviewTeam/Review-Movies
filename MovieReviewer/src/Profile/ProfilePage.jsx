import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/profile-pic.png";
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FriendList from "./FriendList";
import Review from "../Body/Review/Review";
import axios from "axios";
import FriendRequestList from "./FriendRequestList";
import SendFriendRequestButton from "./SendFriendRequestButton";
import RemoveFriendButton from "./RemoveFriendButton";


function ProfilePage() {
  const { username } = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  console.log(token);


useEffect(() => {

  console.log("salam");

  if (token) { 
    
    // get the logged in user
    axios
      .get("http://localhost:8080/api/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        },
      })
      .then((response) => {
        console.log("salam");
        const userData = {
          image: response.data.image,
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          score: 321,
        };

        console.log(userData);

        // check if the current profile page is the logged in user's profile page
        if (userData.username != username) {
          // if it is another user's profile page get that user's data
          axios
            .get(`http://localhost:8080/api/v1/users?username=${username}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
              },
            })
            .then((response1) => {
              const userData1 = {
                image: response1.data[0].image,
                username: response1.data[0].username,
                firstName: response1.data[0].firstName,
                lastName: response1.data[0].lastName,
                email: response1.data[0].email,
                score: 321,
              };

              setUser((prevUser) => ({ ...prevUser, ...userData1 }));
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setLoading(false);
            });
        } else {
          setUser(userData);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("salam");
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  } else {
    // Handle the case where the user is not authenticated
    setLoading(false);
  }
}, []);


  const getFriendUsernames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/me/friends', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.map((friend)=>friend.username);
    } catch (error) {
      console.error('Error fetching friend usernames:', error);
      throw error;
    }
  };

  const { friendUsernames } = getFriendUsernames();


  console.log("USER");
  console.log(user);
  console.log(username);

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          {/* User information on the left */}
          <div className="col-3">
            <UserProfile user={user} username={username}/>
          </div>

          {/* Reviews in the middle */}
          <div className="col-6">
            <Review></Review>
          </div>

          {/* Friend list on the right*/}
          if ({user.username} != {username}) {  /* check if the current profile page is the logged in user's profile page */
              <div className="col-3">
                <FriendList user={user}/>
                <FriendRequestList user={user}/>
              </div>
          }
          else if ( {friendUsernames}.includes({username}) == false){
              <div className="col-3">
                <FriendList user={user}/>
                <SendFriendRequestButton username={username}/>
              </div>
          }

          else {
            <div className="col-3">
              <FriendList user={user}/>
              <RemoveFriendButton username={username}/>
            </div>
          }
          
        </div>
      </div>
    </>
  );
}

export default ProfilePage;