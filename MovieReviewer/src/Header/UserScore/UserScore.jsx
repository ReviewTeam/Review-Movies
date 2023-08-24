import movieScoreLogo from "../../assets/logos/movieScoreLogo.svg";

function UserScore({ score }) {
  return (
    <div className="userScore">
      <strong>{score}</strong>
      <img src={movieScoreLogo} alt="Movie score logo" />
    </div>
  );
}

export default UserScore;
