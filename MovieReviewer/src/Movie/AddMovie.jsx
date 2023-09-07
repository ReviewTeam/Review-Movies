import React, {useEffect, useState} from "react";
import profilePic from "../assets/images/profile-pic.png";
import axios from "axios";

function AddMovie() {
  const [existingPersons, setExistingPersons] = useState([
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
  ]);

  const [directorResults, setDirectorResults] = useState([]);
  const [actorResults, setActorResults] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedDirector, setSelectedDirector] = useState(null);

  useEffect(() => {
    // Fetch JWT token from localStorage
    const token = localStorage.getItem("jwtToken");
    // Set the token in the Axios default headers for authentication
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

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
            axios
                .get("http://localhost:8080/api/v1/persons", {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                })
                .then((response) => {
                  const data = response.data;
                  console.log("Persons");
                  setExistingPersons(data);
                  console.log(existingPersons);
                })
                .catch((error) => {
                  console.log(error);
                })
          })
          .catch((error) => {
            console.log(error);
          })
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    axios.
    post("http://localhost:8080/api/v1/movies",
        {
          title,
          shortDescription,
          year,
          directorId,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.location.href = `/`;
        })
        .catch((error) => {
          console.log(error);
        })
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        setImage(base64String);
      };  
      reader.readAsDataURL(file);
    }
  };

      const response = await axios.post(
        "http://localhost:8080/api/v1/movies",
        payload
      );

      console.log("Movie added:", response.data);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add a Movie</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shortDescription" className="form-label">
            Short Description
          </label>
          <textarea
            className="form-control"
            id="shortDescription"
            name="shortDescription"
            value={movieData.shortDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            value={movieData.year}
            onChange={handleInputChange}
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
                {person.firstName + " " + person.lastName}
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
                {person.firstName + " " + person.lastName}
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
            id="directorName"
            name="directorName"
            value={movieData.directorName}
            onChange={handleInputChange}
            placeholder="Search for director..."
            onBlur={() => searchPerson(movieData.directorName, "director")}
          />
          <div>
            {directorResults.map((person) => (
              <div key={person.id}>
                <p>
                  {`${person.firstName} ${person.lastName}`}
                  <button onClick={() => handleDirectorSelection(person)}>
                    Select
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="actorName" className="form-label">
            Actor
          </label>
          <input
            type="text"
            className="form-control"
            id="actorName"
            name="actorName"
            value={movieData.actorName}
            onChange={handleInputChange}
            placeholder="Search for actor..."
            onBlur={() => searchPerson(movieData.actorName, "actor")}
          />
          <div>
            {actorResults.map((person) => (
              <div key={person.id}>
                <p>
                  {`${person.firstName} ${person.lastName}`}
                  <button onClick={() => handleActorSelection(person)}>
                    Select
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Movie Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </form>

      <button onClick={addMovie} className="btn btn-success">
        Add Movie
      </button>
    </div>
  );
}

export default AddMovie;

// import React, { useState } from "react";
// import profilePic from "../assets/images/profile-pic.png";
// import axios from "axios";

// function AddMovie() {
//   const existingPersons = [
//     {
//       id: "1",
//       picture: { profilePic },
//       firstname: "Person",
//       lastname: "1",
//       birthdate: "1/1/1000",
//     },
//     {
//       id: "2",
//       picture: { profilePic },
//       firstname: "ABPerson",
//       lastname: "2",
//       birthdate: "1/1/1000",
//     },
//     {
//       id: "3",
//       picture: { profilePic },
//       firstname: "CPerson",
//       lastname: "3",
//       birthdate: "1/1/1000",
//     },
//   ];

//   const [title, setTitle] = useState("");
//   const [directorId, setDirectorId] = useState("");
//   const [actorId, setActorId] = useState("");
//   // const [genre, setGenre] = useState("");
//   const [image, setImage] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [year, setYear] = useState("");

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
//     if (token) {
//       try {
//         console.log(firstName, lastName, birthdate);
//         await axios.post("http://localhost:8080/api/v1/movies", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
//           },
//           title,
//           shortDescription,
//           year,
//           directorId,
//           actorId,
//           image,
//         });
//         setSuccessMessage("Movie added!");
//       } catch (error) {
//         setError("Error. Please try again.");
//       }
//       setTitle("");
//       setDirectorId("");
//       setActorId("");
//       // setGenre("");
//       setImage("");
//       setShortDescription("");
//       setYear("");
//     }
//   };

//   const handlePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPoster(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle cancel button click
//   const handleCancel = () => {
//     window.location.href = `/`;
//   };

//   const [people, setPeople] = useState("");

//   axios
//     .get("http://localhost:8080/api/v1/persons?page-number=0&page-size=10", {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
//       },
//     })
//     .then((response) => {
//       setPeople(response.data);
//     });

//   console.log(people);

//   return (
//     <div className="container">
//       <br />
//       <h1>Add Movie</h1>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {successMessage && (
//         <div className="alert alert-success">{successMessage}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Title:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="year" className="form-label">
//             Year:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="director" className="form-label">
//             Director:
//           </label>
//           <select
//             className="form-select"
//             id="director"
//             value={directorId}
//             onChange={(e) => setDirectorId(e.target.value)}
//             required
//           >
//             <option value="">Select Director</option>
//             {existingPersons.map((person) => (
//               <option key={person.id} value={person.id}>
//                 {person.firstname + " " + person.lastname}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="actors" className="form-label">
//             Actors:
//           </label>
//           <select
//             className="form-select"
//             id="actor"
//             value={actorId}
//             onChange={(e) => setActorId(e.target.value)}
//             required
//           >
//             <option value="">Select Actor</option>
//             {existingPersons.map((person) => (
//               <option key={person.id} value={person.id}>
//                 {person.firstname + " " + person.lastname}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* <div className="mb-3">
//           <label htmlFor="genre" className="form-label">
//             Genre:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="genre"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             required
//           />
//         </div> */}

//         {/* imagine */}
//         {/* <div className="mb-3">
//           <label htmlFor="image" className="form-label">
//             Poster:
//           </label>
//           <input
//             type="file"
//             className="form-control"
//             id="image"
//             accept="image/*"
//             onChange={handlePictureChange}
//             required
//           />
//         </div>
//         {image && (
//           <div className="mb-3">
//             <label>Preview:</label>
//             <img src={image} alt="Preview" style={{ maxWidth: "200px" }} />
//           </div>
//         )} */}

//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Description:
//           </label>
//           <textarea
//             className="form-control"
//             id="description"
//             rows="3"
//             value={shortDescription}
//             onChange={(e) => setShortDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Add Movie
//         </button>

//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddMovie;
