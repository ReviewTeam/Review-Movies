import { useState } from 'react'
import movieSearchBar from '../../assets/logos/movieSearchBar.svg'
import searchBarIcon from '../../assets/logos/searchBarIcon.svg'
import userSolid from '../../assets/logos/userSolid.svg'
import './SearchBar.css'

function SearchBar() {
    const [searchValue, setSearchValue] = useState("")

    const onChange = (e) => {
        setSearchValue(e.value)
    }

    return (
        <div className="searchBar">
            <img src={searchBarIcon} className="logo" alt="Search icon" />
            <input type="text" value={searchValue} onChange={onChange}/>
            <img src={movieSearchBar} className="logo borderLeft borderRigth" alt="Movie search bar icon"/>
            <img src={userSolid} className="logo" alt="User solid icon"/>
        </div>
    )
}

export default SearchBar