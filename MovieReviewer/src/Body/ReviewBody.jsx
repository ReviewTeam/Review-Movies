import Carousel from "./Carousel/Carousel";
import './ReviewBody.css'
import Feed from "./Feed/Feed";

function ReviewBody({reviewsState, setReviewsState, searchReviewsState, setSearchReviewsState}) {
    return (
        <div className="body">
            <section className="carouselSection">
                <div className="carouselText">
                    <h1>Check out the most popular movies & series according to our members</h1>
                </div>
                <Carousel />
            </section>
            <Feed {...{reviewsState, setReviewsState}}/>
        </div>
    )
}

export default ReviewBody