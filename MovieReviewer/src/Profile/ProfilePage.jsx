import { Link, useParams } from "react-router-dom";
import profilePic from '../assets/images/profile-pic.png'
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FirendList from "./FriendList";

function ProfilePage() {
  const { username } = useParams();

  // Dummy users
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

  // find the user
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
          {/* User information on the left */}
          <div className="col-3">
            <UserProfile user={user} />
          </div>
          {/* Reviews in the middle */}
          <div className="col-6">
            <PlaceHolder></PlaceHolder>
          </div>
          {/* Friend list on the right */}
          <div className="col-3">
            <FirendList user={user}/>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfilePage;