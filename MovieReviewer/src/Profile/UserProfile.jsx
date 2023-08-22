import profilePic from "../assets/images/profile-pic.png";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

    if (token) {
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          const userData = {
            profilePic,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            score: 321,
          };
          setUser(userData);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where the user is not authenticated
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile bg-light p-3">
      <div className="col">
        {/* Profile picture */}
        <div className="row">
          <img src={profilePic} alt="User Profile" className="img-fluid" />
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
