import HarryPotterMovie from '../../assets/images/HarryPotterMovie.jpg'
import './CarouselElement.css'

function CarouselElement() {
    return (
        <div>
            <img src={HarryPotterMovie} className="carouselElement" alt="Harry Potter Movie"/>
        </div>
    )
}

export default CarouselElement