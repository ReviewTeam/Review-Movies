import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import profilePic from "../assets/images/profile-pic.png";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EditMovie() {
  const { id } = useParams();

  // Sample list of existing persons
  const [existingPersons, setExistingPersons] = useState([]);
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [isAdmin, setIsAdmin] = useState(false);

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
                  // getReviews();
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

  const movie = {
    id: 1,
    title: "Movie Title",
    director: { id: 1, name: "Director Name" },
    actors: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ],
    genre: "Genre",
    poster: HarryPotterMovie,
    description: "Short description of the movie.",
  };

  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [actors, setActors] = useState(movie.actors);
  const [genre, setGenre] = useState(movie.genre);
  const [poster, setPoster] = useState(movie.poster);
  const [description, setDescription] = useState(movie.description);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file, such as uploading it to a server or processing it locally
    setPoster(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here (e.g., send data to backend or update state)
    // You can access the entered data using the state variables

    // Reset the form after submission
    setTitle("");
    setDirector("");
    setActors([]);
    setGenre("");
    setPoster("");
    setDescription("");
  };

  return (
    <div className="container">
      <br />
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director:
          </label>
          <select
            className="form-select"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          >
            <option value="">Select Director</option>
            {existingPersons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstname + " " + person.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="actors" className="form-label">
            Actors:
          </label>
          <select
            multiple
            className="form-select"
            id="actors"
            value={actors}
            onChange={(e) =>
              setActors(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            {existingPersons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstname + " " + person.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre:
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Poster:</Form.Label>
              <div className="d-flex align-items-center">
                <img
                  src={HarryPotterMovie}
                  alt="Profile"
                  className="mr-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <Button
                  variant="outline-primary"
                  style={{ color: "#8e27f5", borderColor: "#8e27f5" }}
                >
                  Change
                </Button>
                <Form.Control type="file" onChange={handleFileChange} />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#8e27f5" }}
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default EditMovie;
