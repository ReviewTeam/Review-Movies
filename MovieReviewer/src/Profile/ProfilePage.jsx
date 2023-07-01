import { Link, useParams } from "react-router-dom";
import profilePic from '../assets/images/profile-pic.png'
import UserProfile from "./UserProfile";

function ProfilePage() {
  const { username } = useParams();

  const users = [
    {
      picture: {profilePic},
      username: 'user1',
      firstName: 'User',
      lastName: '1',
      email: 'user1@example.com',
      score: 999
    },
    {
      picture: {profilePic},
      username: 'user2',
      firstName: 'User',
      lastName: '2',
      email: 'user2@example.com',
      score: 123
    },
    {
      picture: {profilePic},
      username: 'user3',
      firstName: 'User',
      lastName: '3',
      email: 'user3@example.com',
      score: 321
    }
  ]

  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      user = users[i]
    }
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <UserProfile user={user} />
          </div>
          <div className="col-9">
            
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfilePage;