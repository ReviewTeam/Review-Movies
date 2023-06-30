import movieLogo from '../assets/movieLogo.svg'
import SearchBar from '../SearchBar/SearchBar'
import './Navbar.css'

function Navbar() {
    return (
        <nav>
            <img src={movieLogo} className="logo" alt="Movie logo" />
            <SearchBar />
        </nav>
    )
}

export default Navbar