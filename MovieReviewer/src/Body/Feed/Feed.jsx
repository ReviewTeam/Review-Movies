import Review from '../Review/Review'
import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './Feed.css'
import { ReviewForm } from '../ReviewForm/ReviewForm';

function Feed({searchValue, reviewsState, setReviewsState, searchedReviewsState, setSearchedReviewsState}) {
    // console.log("array of reviews")
    // console.log(arrayReviews)
    console.log("Search revieweul state-ul este: ", searchedReviewsState);

    return (
        <div className="feed">
            {searchValue ? searchedReviewsState.map((review, id) => {
                const newObject = {...review, searchedReviewsState, setSearchedReviewsState}
                return <Review key={id} id={id} {...newObject}/>
            }) : reviewsState.map((review, id) => {
                const newObject = {...review, reviewsState, setReviewsState}
                return <Review key={id} id={id} {...newObject}/>
            })}

            <h3>Add new review</h3>
            
            <ReviewForm {...{setReviewsState}} />
        </div>
    )
}

export default Feed