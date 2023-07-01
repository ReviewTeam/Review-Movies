import CarouselElement from "../CarouselElement/CarouselElement"
import carouselRightLogo from "../../assets/logos/carouselRightLogo.svg"
import './Carousel.css'
import { useState } from "react"

function Carousel() {
    const numOfElements = 15
    const carouselArray = Array(numOfElements).fill(null).map((_, index) => index)
    console.log(carouselArray)

    const [scrollLeft, setScrollLeft] = useState(0);

    return (
        <div className="carousel">
            <div id="leftScroll">
                <img src={carouselRightLogo} onClick={() => {
                    // let currentElement = $('.carousel section')
                    if(document.querySelector('.carousel section').scrollLeft > 0)
                        $('.carousel section').animate({scrollLeft: '-=480'}, 500)
                 }}/>
            </div>

            <section>
                {carouselArray.map((index) => (
                    <CarouselElement key={index} />
                ))}
            </section>
            
            <div id="rightScroll">
                <img src={carouselRightLogo} onClick={() => {
                    let element = document.querySelector('.carousel section')
                    console.log("Scroll left:", element.scrollLeft)
                    console.log("Scroll width: ", element.getBoundingClientRect().width)
                    if(element.scrollLeft < element.getBoundingClientRect().width) {
                        $('.carousel section').animate({scrollLeft: '+=480'}, 500);
                    }
                 }}/>
            </div>    
        </div>
    )
}

export default Carousel