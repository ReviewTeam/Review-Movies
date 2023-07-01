import Review from '../Review/Review'
import './Feed.css'

function Feed() {
    const nrOfReviews = 5
    let arrayReviews = Array(nrOfReviews).fill(null).map((_, index) => index)
    console.log("array of reviews")
    console.log(arrayReviews)

    return (
        <div className="feed">
            {arrayReviews.map(index => (
                <Review key={index} />
            ))}
        </div>
    )
}

export default Feed