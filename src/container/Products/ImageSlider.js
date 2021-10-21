import React from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import { CLOUDINARY_URL } from "../../config/index";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function ImageSlick(props) {
  const { images } = props;
  // const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  // };
  return (
    // <Slider {...settings}>
    //     {
    //         images.map((item, index) => {
    //             return (
    //             <div key={index} className="row">
    //                 <div className="room-box-img">
    //                     <Image src={`${CLOUDINARY_URL}/product/${item.ten}`} className="img-responsive img-fluid"/>
    //                 </div>
    //             </div>

    //             )
    //         })
    //     }
    // </Slider>

    <Carousel autoPlay interval="1000" infiniteLoop>
      {images.map((item, index) => {
        return (
          <div>
            <img
              src={`${CLOUDINARY_URL}/product/${item.ten}`}
              className="img-responsive img-fluid"
              alt={item.ten}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
