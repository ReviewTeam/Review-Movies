import { Link } from 'react-router-dom'
import movieLogo from '../../assets/logos/movieLogo.svg'
import SearchBar from '../SearchBar/SearchBar'
import LogInSignUpButton from '../LogInSignUpButton/LogInSignUpButton'
import './Navbar.css'

function NavBarNotSignedIn() {
    return (
        <nav>
            {/* Go to the homepage by clicking on the logo */}
            <Link to='/'>
                <img src={movieLogo} className="logo" alt="Movie logo" />
            </Link>
            <SearchBar />

            {/* Go to the user profile by clicking on the user slot */}
            <Link to='/profile/user1' style={{ textDecoration: 'none' }}>
                <LogInSignUpButton/>
            </Link>
        </nav>
    )
}

export default NavBarNotSignedIn