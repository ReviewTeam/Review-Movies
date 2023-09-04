import UserScore from "../UserScore/UserScore";
import "./UserInfo.css";

function UserInfo({ username, score }) {
  return (
    <div className="userInfo">
      <h3>{username}</h3>
      <UserScore score={score} />
    </div>
  );
}

export default UserInfo;
