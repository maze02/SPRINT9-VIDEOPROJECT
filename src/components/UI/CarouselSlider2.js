//npm install @brainhubeu/react-carousel
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
const CarouselSlider2 = ({ items, itemNumber }) => {
  return (
    <Carousel
      arrows
      infinite
      slidesPerPage={itemNumber}
      animationSpeed={200}
      centered
      offset={1}
      itemWidth={208}
      slides={items}
      draggable={true}
    />
  );
};

export default CarouselSlider2;

/*
//npm install @brainhubeu/react-carousel
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
const CarouselSlider2 = ({ items, itemNumber }) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const observer = new IntersectionObserver(callbackFunction, options);
  observer.observe(elementToObserve);
  return (
    <Carousel
      arrows
      slidesPerPage={itemNumber}
      infinite
      animationSpeed={200}
      centered
      offset={-30}
      itemWidth={250}
      slides={items}
      draggable={true}
    />
  );
};

export default CarouselSlider2;


*/
