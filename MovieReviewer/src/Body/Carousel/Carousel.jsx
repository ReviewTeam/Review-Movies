import CarouselElement from "../CarouselElement/CarouselElement"
import carouselRightLogo from "../../assets/carouselRightLogo.svg"
import './Carousel.css'
import { useState } from "react"

function Carousel() {
    const numOfElements = 10
    const carouselArray = Array(numOfElements).fill(null).map((_, index) => index)
    console.log(carouselArray)

    const [scrollLeft, setScrollLeft] = useState(0);

    return (
        <div className="carousel">
            <section>
                {carouselArray.map((index) => (
                    <CarouselElement key={index} />
                ))}
            </section>
            
            <div>
                <img src={carouselRightLogo} onClick={() => {
                    setScrollLeft(scrollLeft + 240)
                    document.querySelector(".carousel section").scrollBy({
                        left: 240,
                        behavior: 'smooth'
                    })}}/>
            </div>    
        </div>
    )
}

export default Carousel