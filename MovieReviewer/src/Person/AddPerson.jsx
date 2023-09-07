import axios from "axios";
import profilePic from "../assets/images/profile-pic.png";
import { useState } from "react";

function AddPerson() {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDate2, setBirthDate2] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (token) {
      // console.log(firstName, lastName, birthdate);

      axios
        .post(
          "http://localhost:8080/api/v1/persons",
          {
            firstName,
            lastName,
            birthDate,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
            },
          }
        )
        .then(() => {
          setSuccessMessage("Person added!");
          // window.location.href = `/`;
        })
        .catch((error) => {
          console.log(error);
          setError("Error");
        });
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target.result.split(",")[1];
        setImage(base64String);
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
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <br />
      <center>
        <h1>Add Person</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Picture:
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
        {/* {picture && (
          <div className="mb-3">
            <label>Preview:</label>
            <img src={picture} alt="Preview" style={{ maxWidth: "200px" }} />
          </div>
        )} */}

        {/* <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            id="profileImage"
            required
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Birthdate:
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            value={birthDate2}
            onChange={(e) => {
              let data = e.target.value;
              let arr = data.split("-");
              data = `${arr[2]}-${arr[1]}-${arr[0]}`;
              setBirthDate(data);
              setBirthDate2(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Person
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

export default AddPerson;
