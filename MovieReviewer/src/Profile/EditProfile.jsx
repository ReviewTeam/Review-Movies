import { useParams } from "react-router-dom";
import profilePic from "../assets/images/profile-pic.png";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EditProfile() {
  const { username } = useParams();

  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

  useEffect(() => {
    if (token) {
      // get the logged in user
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          setPicture(profilePic);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // Handle the case where the user is not authenticated
    }
  }, []);

  // console.log(user);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.put("http://localhost:8080/api/v1/me", {
        headers: {
          // "Content-Type": "application/json", // or other content types
          Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        },
        firstName,
        lastName,
        email,
        password,
      });
      setSuccessMessage("Profile edited!");
      window.location.href = `/profile/${username}`;
    } catch (error) {
      console.log(error);
      setError("Error!");
    }
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
          <label htmlFor="password" className="form-label">
            Change Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => (e ? setPassword(e.target.value) : password)}
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
