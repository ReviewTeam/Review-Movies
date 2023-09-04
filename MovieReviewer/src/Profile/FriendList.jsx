import { Link } from "react-router-dom";

function FirendList() {
  // Dummy friend list
  const friends = {
    user1: ["user2", "user3"],
    user2: ["user1", "user3"],
    user3: ["user1", "user2"],
  };

  // get the friend list of the current user
  const friendList = friends[user.username];

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col text-center">
              '<h2>Friends</h2>
            </div>
          </div>
          <div className="row">
            <ul class="list-group">
              {/* Diplay each frind with a link to that user's profile */}
              {friendList.map((friend) => (
                <li class="list-group-item">
                  <Link
                    to={`/profile/${friend}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="col text-center">{friend}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirendList;
