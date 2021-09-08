import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//for above just deleted ~ in import and it worked

import Slider from "react-slick";

const CarouselSlick = ({ children }) => {
  const settings = {
    arrows: false,
    infinite: false,
    centerPadding: "70px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default CarouselSlick;
