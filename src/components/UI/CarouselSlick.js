import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//for above just deleted ~ in import and it worked

//import React, { Component } from "react";
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
/*
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
*/
