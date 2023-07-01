import movieScoreLogo from '../../assets/logos/movieScoreLogo.svg'

function UserScore() {
    return (
        <div className="userScore">
            <strong>9999</strong>
            <img src={movieScoreLogo} alt="Movie score logo"/>
        </div>
    )
}

export default UserScore;