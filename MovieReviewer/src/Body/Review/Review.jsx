import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import star from '../../assets/star.svg'
import './Review.css'

function Review() {
    return (
        <div className="reviewContainer">
            <section className="reviewSectionCoverImage">
                <img src={HarryPotterMovie} alt="Harry Potter Movie"/>
            </section>
            <section className="reviewSectionHeader">
                <div>
                    <span>Movie / Series Name</span>
                    <span>
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                    </span>
                    <span>User</span>
                </div>
            </section>
            <section className="reviewText">
                <span>Review text</span>
            </section>
        </div>
    )
}

export default Review