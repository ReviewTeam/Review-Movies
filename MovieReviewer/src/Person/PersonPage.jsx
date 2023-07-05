import { useParams, Link } from "react-router-dom";
import profilePic from "../assets/images/profile-pic.png";
import { Container, Row, Col } from "react-bootstrap";

function PersonPage() {
  const { id } = useParams();

  const people = [
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
      firstname: "Person",
      lastname: "2",
      birthdate: "1/1/1000",
    },
    {
      id: "3",
      picture: { profilePic },
      firstname: "Person",
      lastname: "3",
      birthdate: "1/1/1000",
    },
  ];

  let person;
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === id) {
      person = people[i];
    }
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle mb-4"
              style={{ width: "200px" }}
            />
            <h2>
              {person.firstname} {person.lastname}
            </h2>
            <p>Birthdate: {person.birthdate}</p>
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
          <center>
            <Link
              to={{
                pathname: `/person/${person.id}/edit`,
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
        </Row>
      </Container>
    </>
  );
}

export default PersonPage;
