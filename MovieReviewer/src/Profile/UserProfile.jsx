import { Link } from "react-router-dom";
import profilePic from "../assets/images/profile-pic.png";

function UserProfile({ user }) {
  return (
    <div className="profile bg-light p-3">
      <div className="col">
        {/* Profile picture */}
        <div className="row">
          <img src={profilePic} alt="User Profile" className="img-fluid" />
        </div>

        <div className="row">
          {/* Username */}
          <div className="col text-center">
            <h2>{user.username}</h2>
          </div>
          {/* Full name */}
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          {/* Email address */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Review score */}
          <p>
            <strong>Review score:</strong> {user.score}
          </p>
          {/* Edit profile button */}
          <Link
            to={{
              pathname: `/profile/${user.username}/edit`,
              state: { user },
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
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
