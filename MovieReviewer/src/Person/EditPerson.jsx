import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import profilePic from "../assets/images/profile-pic.png";
// import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";

function EditPerson() {
  const { id } = useParams();
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDate2, setBirthDate2] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/v1/persons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setBirthDate(response.data.birthDate);
          setImage(response.data.image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.put(
        `http://localhost:8080/api/v1/persons/${id}`,
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
      );
      setSuccessMessage("Profile edited!");
      window.location.href = `/person/${id}`;
    } catch (error) {
      console.log(error);
      setError("Error!");
    }
  };

  const handleCancel = () => {
    // Redirect the user back to the profile page without saving any changes
    window.location.href = `/person/${id}`;
  };

  const handleFileChange = (e) => {
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

  return (
    <div className="container">
      <h1>Edit Person</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Profile Picture:</Form.Label>
            <div className="d-flex align-items-center">
              <img
                src={`data:image;base64,${image}`}
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
            BirthDate:
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
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#8e27f5" }}
        >
          Save Changes
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

export default EditPerson;
