import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import axios from "axios";

function EditMovie() {
  const { id } = useParams();

  const [movie, setMovie] = useState( {
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
  });
  // Sample list of existing persons
  const [existingPersons, setExistingPersons] = useState([]);
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
    //  console.log("Avem token");
      // get the logged in user to check if it is an admin
      axios
          .get("http://localhost:8080/api/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
            },
          })
          .then((response) => {
           // console.log(response);

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
                 // console.log("Movie");

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

                 // console.log(movie);
                  axios
                      .get("http://localhost:8080/api/v1/persons", {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        }
                      })
                      .then((response) => {
                        const data = response.data;
                        console.log("Persons");
                        console.log(response);
                        setExistingPersons(data);
                        console.log(data);
                      })
                      .catch((error) => {
                       // console.log(error);
                      })
                  // getReviews();
                })
                .catch((error) => {
                  // console.log("Error fetching the movie with id " + id);
                  // console.log(error);
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

  const handleOnClickDropdownItem = (e) => {}

  return (
    <div className="container">
      <br />
      <label htmlFor="actors" className="form-label">
        Actors:
      </label>
      <Dropdown>
        <Dropdown.Toggle variant=" primary" id="dropdown-basic">
          Dropdown Navigation Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {existingPersons.map((actor) => {
            <Dropdown.Item key={actor.id}  href={`#/action-${actor.id}`} onClick={handleOnClickDropdownItem}>
              {actor.firstName + " " + actor.lastName}
            </Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
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
