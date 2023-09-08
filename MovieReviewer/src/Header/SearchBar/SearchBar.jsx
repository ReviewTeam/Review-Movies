import movieSearchBar from '../../assets/logos/movieSearchBar.svg'
import searchBarIcon from '../../assets/logos/searchBarIcon.svg'
import userSolid from '../../assets/logos/userSolid.svg'
import './SearchBar.css'
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function SearchBar({ isMovie }) {
    const [searchString, setSearchString] = useState("");
    const [movieId, setMovieId] = useState();
    const [userId, setUserId] = useState();
    const placeholder = (isMovie ? "Cauta film aici..." : "Cauta user aici");
    const token = localStorage.getItem("jwtToken");
    const onChange = (e) => {
        setSearchString(e.target.value);
    }

    const onSearch = (e) => {
        axios
            .get(`http://localhost:8080/api/v1/movies?title=${searchString}&page-number=0&page-size=5`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((data) => {
                console.log("Am reusit sa gasim filmul din searchbar");
                //movieId = data.id;
            })
            .catch((error) => {
                console.log("Eroare la cautarea filmului " + error);
            })
    }

    return (
        <div className="searchBar">
            <Link to={(isMovie ? `movie/${movieId}` : `user/`)}>
                <button id="searchButton" onClick={onSearch}>
                    <img src={searchBarIcon} className="logo" alt="Search icon" />
                </button>
            </Link>
            <input type="text" placeholder={placeholder} value={searchString} onChange={onChange}/>

            <img src={movieSearchBar} className="logo borderLeft borderRigth" alt="Movie search bar icon"/>
            <img src={userSolid} className="logo" alt="User solid icon"/>
        </div>
    )
}

export default SearchBar