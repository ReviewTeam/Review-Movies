import movieScoreLogo from '../assets/movieScoreLogo.svg'
import profileLogo from '../assets/profileLogo.svg'
import './UserSlot.css'

function UserSlot() {
    return (
        <section className="userSlot">
            <div className="userInfo">
                <h3>Username12345</h3>
                <div className="userScore">
                    <strong>9999</strong>
                    <img src={movieScoreLogo} alt="Movie score logo"/>
                </div>
            </div>
            <img src={profileLogo} alt="Profile logo"/>
        </section>
    )
}

export default UserSlot