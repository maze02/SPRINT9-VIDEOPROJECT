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
