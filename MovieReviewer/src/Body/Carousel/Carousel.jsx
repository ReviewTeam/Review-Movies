import CarouselElement from "../CarouselElement/CarouselElement"
import carouselRightLogo from "../../assets/carouselRightLogo.svg"
import './Carousel.css'

function Carousel() {
    const numOfElements = 10
    const carouselArray = Array(numOfElements).fill(null).map((_, index) => index)
    console.log(carouselArray)

    return (
        <div className="carousel">
            <section>
                {carouselArray.map((index) => (
                    <CarouselElement key={index} />
                ))}
            </section>
            
            <div>
                <img src={carouselRightLogo} />
            </div>    
        </div>
    )
}

export default Carousel