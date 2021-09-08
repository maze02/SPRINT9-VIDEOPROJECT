import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CarouselSlider = ({ children }) => {
  const options = {
    items: 5,
    margin: 100,
    autoWidth: false,
    responsiveClass: true,
    // responsiveClass: false,
    nav: true,
    autoplay: false,
    navText: ["", ""],
    smartSpeed: 1000,
    stagePadding: 100,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        margin: 220,
        items: 2,
      },
      600: {
        margin: 10,
        items: 3,
      },

      700: {
        margin: 10,
        items: 4,
      },
      1707: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };
  return (
    <OwlCarousel className="slider-items owl-carousel" {...options}>
      {children}
    </OwlCarousel>
  );
};

export default CarouselSlider;

/*references:
https://stackoverflow.com/questions/25304439/show-part-of-next-and-previous-items-with-owl-carousel-2-0
*/
/*
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// Import Swiper styles
//import "swiper/css";
import "swiper/swiper.css";

const FilmListSwipe = () => {
  return (
    <>
      <h3>
        Slider5 is visible when you slide to 2,3, or 4, and slider5 has
        "swiper-slide-visible" className
      </h3>{" "}
      <br />
      <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default FilmListSwipe;
*/
