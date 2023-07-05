import HarryPotterMovie from "../../assets/images/HarryPotterMovie.jpg";
import "./CarouselElement.css";
import { Link } from "react-router-dom";

function CarouselElement() {
  return (
    <div>
      <Link to="/movie/1">
        <img
          src={HarryPotterMovie}
          className="carouselElement"
          alt="Harry Potter Movie"
        />
      </Link>
    </div>
  );
}

export default CarouselElement;
