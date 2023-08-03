import movieSearchBar from '../../assets/logos/movieSearchBar.svg'
import searchBarIcon from '../../assets/logos/searchBarIcon.svg'
import userSolid from '../../assets/logos/userSolid.svg'
import './SearchBar.css'

function SearchBar({searchValue, onChange}) {
    return (
        <div className="searchBar">
            <button id="searchButton">
                <img src={searchBarIcon} className="logo" alt="Search icon" />
            </button>
            <input type="text" value={searchValue} onChange={onChange}/>
            <img src={movieSearchBar} className="logo borderLeft borderRigth" alt="Movie search bar icon"/>
            <img src={userSolid} className="logo" alt="User solid icon"/>
        </div>
    )
}

export default SearchBar