import { Link } from 'react-router-dom'
import movieLogo from '../../assets/logos/movieLogo.svg'
import BackButton from '../BackButton/BackButton.jsx'
import './Navbar.css'

function NavbarSignUpPage() {
    return (
        <nav>
            {/* Go to the homepage by clicking on the logo */}
            <Link to='/'>
                <img src={movieLogo} className="logo" alt="Movie logo" />
            </Link>

            {/* Go to the user profile by clicking on the user slot */}
            <Link to='/profile/user1' style={{ textDecoration: 'none' }}>
                <BackButton />
            </Link>
        </nav>
    )
}

export default NavbarSignUpPage