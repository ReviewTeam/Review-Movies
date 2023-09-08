//import profilePic from "../assets/images/profile-pic.png";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile({ userScore }) {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

    if (token) {
      // get the logged in user
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          const userData = {
            image: response.data.image,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            score: userScore,
          };

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
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where the user is not authenticated
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log("USER");
  // console.log(user);

  return (
    <div className="profile bg-light p-3">
      <div className="col">
        {/* Profile picture */}
        <div className="row">
          <img
            src={`data:image;base64,${user.image}`}
            alt="User Profile"
            className="img-fluid"
          />
        </div>

        {/* Username */}
        <div className="col text-center">
          <h2>{user.username}</h2>
        </div>

        {/* Full name */}
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>

        {/* Email address */}
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        {/* Review score */}
        <p>
          <strong>Review score:</strong> {user.score}
        </p>

        {/* Edit profile button */}
        <Link
          to={{
            pathname: `/profile/${user.username}/edit`,
          }}
          style={{ textDecoration: "none" }}
        >
          <button
            type="button"
            class="btn btn-primary"
            style={{ backgroundColor: "#8e27f5" }}
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;