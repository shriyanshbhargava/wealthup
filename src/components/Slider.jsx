import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderCaroussel = (props) => {

  var settings = {
    dots: false,
    arrows: props.showarrows === null ? true : props.showarrows,
    infinite: props.infinite === null ? true : props.infinite,
    // speed: 500,
    slidesToShow: props.maxslides || 6,
    swipeToSlide:true,
    // slidesToScroll: 4,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: props.maxslides -1 || 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: props.maxslides-2 || 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:props.maxslides-2|| 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: props.maxslides-3 || 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {props.children}
    </Slider>
  )
}

export default SliderCaroussel