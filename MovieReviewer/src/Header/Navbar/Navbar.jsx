import { Link } from "react-router-dom";
import movieLogo from "../../assets/logos/movieLogo.svg";
import SearchBar from "../SearchBar/SearchBar";
import UserSlot from "../UserSlot/UserSlot";
import "./Navbar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import profilePic from "../../assets/images/profile-pic.png";

function Navbar() {
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState("/");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      // get the logged in user
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          console.log(response);
          const userData = {
            profilePic,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            score: 321,
            roles: response.data.authorizationRoles,
          };

          setUser(userData);
          setUrl(`/profile/${userData.username}`);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // Handle the case where the user is not authenticated
      console.log("aici");
    }

    if (user && user.roles.split(",").length > 1) {
      setIsAdmin(true);
    }
  }, []);

  console.log(isAdmin);

  return (
    <nav>
      {/* Go to the homepage by clicking on the logo */}
      <Link to="/">
        <img src={movieLogo} className="logo" alt="Movie logo" />
      </Link>
      <SearchBar />

      {isAdmin && (
        <Link to="/movie/add" style={{ color: "white" }}>
          Add Movie
        </Link>
      )}
      {isAdmin && (
        <Link to="/person/add" style={{ color: "white" }}>
          Add Movie
        </Link>
      )}
      {/* Go to the user profile by clicking on the user slot */}
      {user && (
        <Link to={url} style={{ textDecoration: "none" }}>
          <UserSlot />
        </Link>
      )}

      {!user && (
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      )}
      {!user && (
        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
