import profilePic from '../../assets/logos/profileLogoPurple.svg';
import './ProfilePicture.css';

function ProfilePicture() {
  return (
    <div className="profile-picture">
      <img src={profilePic} alt="Profile" />
    </div>
  );
}

export default ProfilePicture;