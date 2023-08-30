import React, { useState } from "react";
import profilePic from "../assets/images/profile-pic.png";

function AddMovie() {
  const existingPersons = [
    {
      id: "1",
      picture: { profilePic },
      firstname: "Person",
      lastname: "1",
      birthdate: "1/1/1000",
    },
    {
      id: "2",
      picture: { profilePic },
      firstname: "ABPerson",
      lastname: "2",
      birthdate: "1/1/1000",
    },
    {
      id: "3",
      picture: { profilePic },
      firstname: "CPerson",
      lastname: "3",
      birthdate: "1/1/1000",
    },
  ];

  const [title, setTitle] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [actorId, setActorId] = useState("");
  // const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (token) {
      try {
        console.log(firstName, lastName, birthdate);
        await axios.post("http://localhost:8080/api/v1/movies", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
          title,
          shortDescription,
          year,
          directorId,
          actorId,
          image,
        });
        setSuccessMessage("Movie added!");
      } catch (error) {
        setError("Error. Please try again.");
      }
      setTitle("");
      setDirectorId("");
      setActorId("");
      // setGenre("");
      setImage("");
      setShortDescription("");
      setYear("");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    window.location.href = `/`;
  };

  return (
    <div className="container">
      <br />
      <h1>Add Movie</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
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
          <label htmlFor="year" className="form-label">
            Year:
          </label>
          <input
            type="text"
            className="form-control"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
            value={directorId}
            onChange={(e) => setDirectorId(e.target.value)}
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
            className="form-select"
            id="actor"
            value={actorId}
            onChange={(e) => setActorId(e.target.value)}
            required
          >
            <option value="">Select Actor</option>
            {existingPersons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstname + " " + person.lastname}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="mb-3">
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
        </div> */}

        {/* imagine */}
        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Poster:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handlePictureChange}
            required
          />
        </div>
        {image && (
          <div className="mb-3">
            <label>Preview:</label>
            <img src={image} alt="Preview" style={{ maxWidth: "200px" }} />
          </div>
        )} */}

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
