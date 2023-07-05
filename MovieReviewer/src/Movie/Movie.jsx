import React from "react";
import { Link, useParams } from "react-router-dom";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";
import Review from "../Body/Review/Review";

function Movie() {
  const { id } = useParams();

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
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster} alt="Movie Poster" className="img-fluid" />
        </div>
        <div className="col-md-8">
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

          <br />
          <h2>Reviews</h2>
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
        </div>
      </div>
      <br />
      <div className="row">
        <center>
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
        </center>
      </div>
    </div>
  );
}

export default Movie;
