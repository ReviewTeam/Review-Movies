import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import star from '../../assets/star.svg'
import './Review.css'

function Review() {
    return (
        <div className="reviewContainer">
            <section className="reviewSectionCoverImage">
                <img src={HarryPotterMovie} alt="Harry Potter Movie"/>
            </section>
            <section className="reviewSectionBody">
                <section className="reviewSectionHeader">
                    <div className="headerItem">
                        <span>Movie / Series Name</span>
                    </div>
                    <div className="headerItem">
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                        <img src={star} alt="start" />
                    </div>
                    <div className="headerItem">
                        <span>User</span>
                    </div>
                </section>
                <section className="reviewText">
                    <span>Review text</span>
                </section>
            </section>
        </div>
    )
}

export default Review