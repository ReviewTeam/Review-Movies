import { Link } from 'react-router-dom'
import movieLogo from '../../assets/logos/movieLogo.svg'
import SearchBar from '../SearchBar/SearchBar'
import UserSlot from '../UserSlot/UserSlot'
import './Navbar.css'

function Navbar({searchValue, onChange}) {
    return (
        <nav>
            {/* Go to the homepage by clicking on the logo */}
            <Link to='/'>
                <img src={movieLogo} className="logo" alt="Movie logo" />
            </Link>
            <SearchBar {...{searchValue, onChange}}/>

            {/* Go to the user profile by clicking on the user slot */}
            <Link to='/profile/user1' style={{ textDecoration: 'none' }}>
                <UserSlot />
            </Link>
        </nav>
    )
}

export default Navbar