import movieSearchBar from '../../assets/movieSearchBar.svg'
import searchBarIcon from '../../assets/searchBarIcon.svg'
import userSolid from '../../assets/userSolid.svg'
import './SearchBar.css'

function SearchBar() {
    return (
        <div className="searchBar">
            <img src={searchBarIcon} className="logo" alt="Search icon" />
            <input type="text" value="Search..."/>
            <img src={movieSearchBar} className="logo borderLeft borderRigth" alt="Movie search bar icon"/>
            <img src={userSolid} className="logo" alt="User solid icon"/>
        </div>
    )
}

export default SearchBar