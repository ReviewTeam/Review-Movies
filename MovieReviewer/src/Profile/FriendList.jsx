import { Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function FirendList({ user }) {
  const friends = {
    'user1': ['user2', 'user3'],
    'user2': ['user1', 'user3'],
    'user3': ['user1', 'user2']
  }

  const friendList = friends[user.username];

  return (
    <>
      <h2>Friend List</h2>
      <ul>
        {friendList.map(friend => <li key={friend.username}><Link to={`/profile/${friend}`}>{friend}</Link></li>)}
      </ul>
    </>
  );
}

export default FirendList;