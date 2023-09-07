import UserInfo from "../UserInfo/UserInfo";
import profileLogo from "../../assets/logos/profileLogo.svg";
import "./UserSlot.css";

function UserSlot({ username, score, image }) {
  return (
    <section className="userSlot">
      <UserInfo username={username} score={score} />
      <img
        src={`data:image;base64,${image}`}
        alt="Profile logo"
        className="img-fluid"
        width="70"
      />
    </section>
  );
}

export default UserSlot;
