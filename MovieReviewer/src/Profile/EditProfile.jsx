import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EditProfile() {
  const { username } = useParams();

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          // setPicture(response.data.picture);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // console.log(user);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(password);
      console.log(image);
      await axios.put(
        "http://localhost:8080/api/v1/me",
        {
          firstName,
          lastName,
          email,
          password,
          image,
        },
        {
          headers: {
            // "Content-Type": "application/json", // or other content types
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        }
      );
      setSuccessMessage("Profile edited!");

      // localStorage.removeItem("jwtToken");
      // axios
      //   .post("http://localhost:8080/api/v1/auth", {
      //     username,
      //     password,
      //   })
      //   .then((response) => {
      //     const token = response.data.token;

      //     localStorage.setItem("jwtToken", token);

      //     window.location.href = `/`;
      //     console.log(token);
      //   })
      //   .catch((error) => {
      //     setError("Login failed. Please check your credentials.");
      //   });

      // window.location.href = `/profile/${username}`;
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
      <h2>Edit Profile</h2>
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
