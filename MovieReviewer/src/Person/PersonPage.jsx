import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PersonPage() {
  const { id } = useParams();

  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage
  const [isAdmin, setIsAdmin] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState(null);

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
          console.log(response);

          if (response.data.authorizationRoles.split(",").length > 1) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      axios
        .get(`http://localhost:8080/api/v1/persons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          console.log(response);
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

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <img
              src={`data:image;base64,${image}`}
              alt="Profile"
              className="rounded-circle mb-4"
              style={{ width: "200px" }}
            />
            <h2>
              {firstName} {lastName}
            </h2>
            <p>Birthdate: {birthDate}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="col text-center">
              <h2>Acted in</h2>
            </div>
            <ul class="list-group">
              {
                <li class="list-group-item">
                  <Link to={`/movie`} style={{ textDecoration: "none" }}>
                    <div className="col text-center">Movie</div>
                  </Link>
                </li>
              }
            </ul>
          </Col>
          <Col>
            <div className="col text-center">
              <h2>Directed</h2>
            </div>
            <ul class="list-group">
              {
                <li class="list-group-item">
                  <Link to={`/movie`} style={{ textDecoration: "none" }}>
                    <div className="col text-center">Movie</div>
                  </Link>
                </li>
              }
            </ul>
          </Col>
        </Row>
        <br />
        <Row>
          {isAdmin && (
            <center>
              <Link
                to={{
                  pathname: `/person/${id}/edit`,
                }}
                style={{ textDecoration: "none" }}
              >
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ backgroundColor: "#8e27f5" }}
                >
                  Edit
                </button>
              </Link>
            </center>
          )}
        </Row>
      </Container>
    </>
  );
}

export default PersonPage;
