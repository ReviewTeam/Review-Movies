import React, { useState } from "react";

function AddPerson() {
  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here (e.g., send data to backend or update state)
    // You can access the entered data using the state variables (picture, firstName, lastName, birthdate)

    // Reset the form after submission
    setPicture("");
    setFirstName("");
    setLastName("");
    setBirthdate("");
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Redirect the user back to the profile page without saving any changes
    window.location.href = `/person/${id}`;
  };

  return (
    <div className="container">
      <br />
      <center>
        <h1>Add Person</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="picture" className="form-label">
            Picture:
          </label>
          <input
            type="file"
            className="form-control"
            id="picture"
            accept="image/*"
            onChange={handlePictureChange}
            required
          />
        </div>
        {picture && (
          <div className="mb-3">
            <label>Preview:</label>
            <img src={picture} alt="Preview" style={{ maxWidth: "200px" }} />
          </div>
        )}
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
