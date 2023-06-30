import CarouselElement from "../CarouselElement/CarouselElement"
import './Carousel.css'

function Carousel() {
    const numOfElements = 6
    const carouselArray = Array(numOfElements).fill(null).map((_, index) => index)
    console.log(carouselArray)

    return (
        <div className="carousel">
            {carouselArray.map((index) => (
                <CarouselElement key={index} />
            ))}
        </div>
    )
}

export default Carousel