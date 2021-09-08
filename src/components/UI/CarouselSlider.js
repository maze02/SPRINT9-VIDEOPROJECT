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
