import UserInfo from '../UserInfo/UserInfo'
import profileLogo from '../../assets/profileLogo.svg'
import './UserSlot.css'

function UserSlot() {
    return (
        <section className="userSlot">
            <UserInfo />
            <img src={profileLogo} alt="Profile logo"/>
        </section>
    )
}

export default UserSlot