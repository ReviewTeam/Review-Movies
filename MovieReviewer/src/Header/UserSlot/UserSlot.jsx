import UserInfo from "../UserInfo/UserInfo";
import profileLogo from "../../assets/logos/profileLogo.svg";
import "./UserSlot.css";

function UserSlot({ username, score }) {
  return (
    <section className="userSlot">
      <UserInfo username={username} score={score} />
      <img src={profileLogo} alt="Profile logo" />
    </section>
  );
}

export default UserSlot;
