import { Link } from "react-router-dom";

function FirendList({ user }) {
  // Dummy friend list
  const friends = {
    'user1': ['user2', 'user3'],
    'user2': ['user1', 'user3'],
    'user3': ['user1', 'user2']
  }

  // get the friend list of the current user
  const friendList = friends[user.username];

  return (
    <>
      <h2>Friend List</h2>
      <ul>
        {/* Diplay each frind with a link to that user's profile */}
        {friendList.map(friend => <li key={friend}><Link to={`/profile/${friend}`}>{friend}</Link></li>)}
      </ul>
    </>
  );
}

export default FirendList;