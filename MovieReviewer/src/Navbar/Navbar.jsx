import movieLogo from '../assets/movieLogo.svg'
import SearchBar from '../SearchBar/SearchBar'
import UserSlot from '../UserSlot/UserSlot'
import './Navbar.css'

function Navbar() {
    return (
        <nav>
            <img src={movieLogo} className="logo" alt="Movie logo" />
            <SearchBar />
            <UserSlot />
        </nav>
    )
}

export default Navbar