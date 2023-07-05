import { useParams } from "react-router-dom";
import profilePic from "../assets/images/profile-pic.png";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

function EditProfile() {
  const { username } = useParams();

  // Dummy users
  const users = [
    {
      picture: { profilePic },
      username: "user1",
      firstName: "User",
      lastName: "1",
      email: "user1@example.com",
      score: 999,
    },
    {
      picture: { profilePic },
      username: "user2",
      firstName: "User",
      lastName: "2",
      email: "user2@example.com",
      score: 123,
    },
    {
      picture: { profilePic },
      username: "user3",
      firstName: "User",
      lastName: "3",
      email: "user3@example.com",
      score: 321,
    },
  ];

  // find the user
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      user = users[i];
    }
  }

  const [picture, setPicture] = useState(user.picture);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    // to do
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Redirect the user back to the profile page without saving any changes
    window.location.href = `/profile/${username}`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file, such as uploading it to a server or processing it locally
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Profile Picture:</Form.Label>
            <div className="d-flex align-items-center">
              <img
                src={profilePic}
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
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Change Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => (e ? setPassword(e.target.value) : user.password)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#8e27f5" }}
        >
          Save
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

export default EditProfile;
