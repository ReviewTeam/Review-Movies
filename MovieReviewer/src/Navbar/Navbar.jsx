import movieLogo from '../assets/movieLogo.svg'
import './Navbar.css'

function Navbar() {
    return (
        <nav>
            <img src={movieLogo} className="logo" alt="Movie logo" />
        </nav>
    )
}

export default Navbar