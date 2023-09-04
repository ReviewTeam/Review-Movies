import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import profilePic from "../assets/images/profile-pic.png";
import HarryPotterMovie from "../assets/images/HarryPotterMovie.jpg";

function EditPerson() {
  const { id } = useParams();

  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here (e.g., send data to backend or update state)
    // You can access the entered data using the state variables (picture, firstName, lastName, birthdate)

    // Redirect to the person's details page after successful submission
    window.location.href = `/perons/${id}`;
  };

  const handleCancel = () => {
    // Redirect the user back to the profile page without saving any changes
    window.location.href = `/person/${id}`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file, such as uploading it to a server or processing it locally
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div className="container">
      <h1>Edit Person</h1>
      <form onSubmit={handleSubmit}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Profile Picture:</Form.Label>
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
          <label htmlFor="birthdate" className="form-label">
            Birthdate:
          </label>
          <input
            type="date"
            className="form-control"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
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
