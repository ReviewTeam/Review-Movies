import profilePic from '../assets/images/profile-pic.png'

function UserProfile({ user }) {
  return (
    <div className="profile bg-light p-3">
      <div className="col">
        <div className="row">
          <img src={profilePic} alt="User Profile" className="img-fluid" />
        </div>
        <div className="row">
          <h2>{user.username}</h2>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Review score:</strong> {user.score}
          </p>
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
};
  
export default UserProfile;