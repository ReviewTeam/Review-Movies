import { Link } from "react-router-dom";
import HarryPotterMovie from "../../assets/images/HarryPotterMovie.jpg";
import star from "../../assets/logos/star.svg";
import "./Review.css";

function Review() {
  return (
    <div className="reviewContainer">
      <section className="reviewSectionCoverImage">
        <img src={HarryPotterMovie} alt="Harry Potter Movie" />
      </section>
      <section className="reviewSectionBody">
        <section className="reviewSectionHeader">
          <div className="headerItem">
            <Link to="/movie/1">
              <span>Movie / Series Name</span>
            </Link>
          </div>
          <div className="headerItem">
            <img src={star} alt="start" />
            <img src={star} alt="start" />
            <img src={star} alt="start" />
            <img src={star} alt="start" />
            <img src={star} alt="start" />
          </div>
          <div className="headerItem">
            <Link to="/profile/user1">
              <span>User</span>
            </Link>
          </div>
        </section>
        <section className="reviewText">
          <span>Review text</span>
        </section>
      </section>
    </div>
  );
}

export default Review;
