import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function FriendList() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [friendData, setFriendData] = useState(null);
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
          const userData = {
            image: response.data.image,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            score: userScore,
          };

          // check if the current profile page is the logged in user's profile page
          if (userData.username != username) {
            // if it is another user's profile page get that user's data
            axios
              .get(`http://localhost:8080/api/v1/users?username=${username}`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                },
              })
              .then((response1) => {
                const userData1 = {
                  image: response1.data[0].image,
                  username: response1.data[0].username,
                  firstName: response1.data[0].firstName,
                  lastName: response1.data[0].lastName,
                  email: response1.data[0].email,
                  score: 321,
                };

                setUser((prevUser) => ({ ...prevUser, ...userData1 }));
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoading(false);
              });
          } else {
            setUser(userData);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
        
        console.log("AAAAAAAAAA");
        axios
        .get("http://localhost:8080/api/v1/me/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("salam");
          console.log(response.data.username);
          setFriendData (response.data.username);
        })

    } else {
      // Handle the case where the user is not authenticated
      setLoading(false);
    }
  }, []);
  console.log("user");
  console.log(user);

  console.log(friendData);

  //const friendList = friendData.map(friend => friend.username);

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col text-center">
              <h2>Friends</h2>
            </div>
          </div>
          <div className="row">
            <ul class="list-group">
              {/* Display each friend with a link to that user's profile */}
              {friendData.map((friend) => (
                <li class="list-group-item">
                  <Link
                    to={`/profile/${friend.username}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="col text-center">{friend.username}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendList;
