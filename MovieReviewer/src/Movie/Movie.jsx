import { Link, useParams } from "react-router-dom";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";
import Review from "../Body/Review/Review";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

function Movie() {
  const { id } = useParams();

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      // get the logged in user to check if it is an admin
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          console.log(response);

          if (response.data.authorizationRoles.split(",").length > 1) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // Handle the case where the user is not authenticated
      console.log("aici");
    }
  }, []);

  // Sample movie data
  const movie = {
    id: 1,
    title: "Movie Title",
    director: { id: 1, name: "Director Name" },
    actors: [
      { id: 2, name: "Actor 1" },
      { id: 2, name: "Actor 2" },
      { id: 2, name: "Actor 3" },
    ],
    genre: "Genre",
    poster: HarryPotterMovie,
    description: "Short description of the movie.",
  };

  return (
    <Container>
      <br />
      <Row>
        <Col xs={8} md={4}>
          <img src={movie.poster} alt="Movie Poster" className="img-fluid" />
        </Col>
        <Col>
          <h1>{movie.title}</h1>
          <p>
            <strong>Director:</strong>{" "}
            <Link to={`/person/${movie.director.id}`}>
              {movie.director.name}
            </Link>
          </p>
          <p>
            <strong>Actors:</strong>{" "}
            {movie.actors.map((actor) => (
              <span key={actor.id}>
                <Link to={`/person/${actor.id}`}>{actor.name}</Link>{" "}
              </span>
            ))}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>{movie.description}</p>
          {isAdmin && (
            <div className="col">
              <Link
                to={{
                  pathname: `/movie/${movie.id}/edit`,
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
              <br />
              <br />
            </div>
          )}
          <br />
          <h2>Reviews</h2>
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;
