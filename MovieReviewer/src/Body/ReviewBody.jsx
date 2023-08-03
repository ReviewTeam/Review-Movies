import Carousel from "./Carousel/Carousel";
import './ReviewBody.css'
import Feed from "./Feed/Feed";

function ReviewBody({searchValue, reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}) {

    console.log("Search revieweul state-ul este: ", searchedReviewsState);
    console.log(searchValue)
    return (
        <div className="body">
            <section className="carouselSection">
                <div className="carouselText">
                    <h1>Check out the most popular movies & series according to our members</h1>
                </div>
                <Carousel />
            </section>
            <Feed {...{searchValue, reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}}/>
        </div>
    )
}

export default ReviewBody