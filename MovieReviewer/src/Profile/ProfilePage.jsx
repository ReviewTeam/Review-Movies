import { Link, useParams } from "react-router-dom";
import profilePic from '../assets/images/profile-pic.png'
import UserProfile from "./UserProfile";
import PlaceHolder from "./PlaceHolder";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import SendFriendRequestButton from "./SendFriendRequestButton";
import './ProfilePage.css';

function ProfilePage() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from storage

    if (token) {
      // get the logged in user
      axios
        .get("http://localhost:8080/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          const userData = {
            profilePic,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            score: 321,
          };

          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where the user is not authenticated
      setLoading(false);
    }

    // check if the current profile page is the logged in user's profile page
    if (!user || user.username != username) {
      // if it is another user's profile page get that user's data
      axios
        .get(`http://localhost:8080/api/v1/users?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response1) => {
          const userData1 = {
            profilePic,
            username: response1.data[0].username,
            firstName: response1.data[0].firstName,
            lastName: response1.data[0].lastName,
            email: response1.data[0].email,
            score: 321,
          };

          setUser((prevUser) => ({ ...prevUser, ...userData1 }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("USER");
  console.log(user);

  return (
    <>
      <div className="container">
        <div className="row">

          {/* User information on the left */}
          <div className="col-3">
            <UserProfile user={user} />
          </div>

          {/* Reviews in the middle */}
          <div className="col-6">
            <PlaceHolder></PlaceHolder>
          </div>
          
          {/* Friend list on the right */}
          <div className="col-3">
            <FriendList user={user}/>
            <FriendRequestList/>
            <SendFriendRequestButton targetUsername={user.username}/>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default ProfilePage;