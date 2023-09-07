import { Link, useParams } from "react-router-dom";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";
import MovieReview from "./MovieReview";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Movie.css";

function Movie() {
  const { id } = useParams();
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [itle, setTitle] = useState("");

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [isAdmin, setIsAdmin] = useState(false);
  const [movie, setMovie] = useState({
    id: 1,
    title: "Movie Title",
    director: { id: 1, name: "Director Name" },
    actors: [
      { id: 2, name: "Actor 4"},
      { id: 2, name: "Actor 5"},
      { id: 2, name: "Actor 6"},
      { id: 2, name: "Actor 7"}.
      { id: 2, name: "Actor 1" },
      { id: 2, name: "Actor 2" },
      { id: 2, name: "Actor 3" },
    ],
    genre: "Genre",
    poster: HarryPotterMovie,
    description: "Short description of the movie.",
  });

  useEffect(() => {
    if (token) {
      console.log("Avem token");
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

          axios
            .get(`http://localhost:8080/api/v1/movies/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
              },
            })
            .then((response) => {
              console.log("Movie");

              const data = response.data;
              const director = data.director;
              const actors = data.actors;

              setMovie({
                id: data.id,
                title: data.title,
                director: { id: director.id,
                            name: director.firstName + director.lastName },
                actors,
                genre: "Genre",
                poster: data.image,
                description: data.shortDescription,
              });

              console.log(movie);
            })
            .catch((error) => {
              console.log("Error fetching the movie with id " + id);
              console.log(error);
            })
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // Handle the case where the user is not authenticated
      console.log("aici");
    }
  }, []);

  const addReview = (e) => {
    e.preventDefault();

    console.log("id: " + id)
    console.log("rating: " + reviewScore);
    console.log("description: " + reviewDescription);

    axios
        .post("http://localhost:8080/api/v1/me/reviews", {
          data: {
            "movieId": id,
            "rating": reviewScore,
            "description": reviewDescription
          },
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  const onChangeScore = (e) => {
    setReviewScore(e.target.value);
    console.log(reviewScore);
  }

  const onChaneTitle = (e) => {
    setReviewTitle(e.target.value);
    console.log(title);
  }

  const onChangeDescription = (e) => {
    setReviewDescription(e.target.value);
    console.log(reviewDescription);
  }

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
                  <input></input>in
                </button>
              </Link>
              <br />
              <br />
            </div>
          )}
          <br />
          <h2>Reviews</h2>
          {/* //{id, imgSrc, imgAlt, movieName, score, userName, reviewText, likes, reviewsState, setReviewsState} */}
          <MovieReview 
            key="1"
            ></MovieReview>
          <MovieReview key="2"></MovieReview>
          <MovieReview key="3"></MovieReview>
          <MovieReview key="4"></MovieReview>
          <MovieReview key="5"></MovieReview>
          <div className="AddReview">
            <div>
              <label>Movie score </label>
              <input type="number" onChange={onChangeScore}></input>
            </div>
            <div>

              <input
              <label>Description </label>
              <textarea onChange={onChangeDescription}></textarea>
            </div>
            <button type="button" class="btn btn-primary" onClick={addReview}>Add</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;
