import Carousel from "./Carousel/Carousel";
import './Body.css'

function Body() {
    return (
        <div className="body">
            <div className="carouselText">
                <span>Check out the most popular movies & series according to our members</span>
            </div>
            <Carousel />
        </div>
    )
}

export default Body