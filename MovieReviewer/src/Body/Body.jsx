import Carousel from "./Carousel/Carousel";
import './Body.css'
import Feed from "./Feed/Feed";

function Body() {
    return (
        <div className="body">
            <section className="carouselSection">
                <div className="carouselText">
                    <span>Check out the most popular movies & series according to our members</span>
                </div>
                <Carousel />
            </section>
            <Feed />
        </div>
    )
}

export default Body