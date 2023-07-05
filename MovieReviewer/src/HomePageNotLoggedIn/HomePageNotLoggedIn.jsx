import ReviewBody from "../Body/ReviewBody"
import NavBarNotSignedIn from "../Header/Navbar/NavBarNotSignedIn"

function HomePageNotLoggedIn() {
    return (
        <div className="page">
            <NavBarNotSignedIn/>
            <ReviewBody />
        </div>
    )
}

export default HomePageNotLoggedIn