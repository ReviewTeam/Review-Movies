import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './FriendList.css';
import FriendRequestList from "./FriendRequestList";

function FriendList({ username }) {
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      axios
        .get(`http://localhost:8080/api/v1/me/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const friendsData = response.data.map((friend) => ({
            fullName: `${friend.firstName} ${friend.lastName}`,
          }));
          setFriendList(friendsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching friend list:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div>Loading friend list...</div>;
  }

  return (
    <div>
      <h2>Friend List</h2>
      <div className="friend-list-container">
        <ul className="friend-list">
          {friendList.map((friend) => (
            <li key={friend.fullName}>{friend.fullName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendList;
