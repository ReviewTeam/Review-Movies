import CarouselElement from "../CarouselElement/CarouselElement"

function Carousel() {
    const numOfElements = 6
    const carouselArray = Array(numOfElements).fill(null).map((_, index) => index)

    return (
        <div>
            {carouselArray.map((index) => {
                <CarouselElement key={index} />
            })}
        </div>
    )
}

export default Carousel