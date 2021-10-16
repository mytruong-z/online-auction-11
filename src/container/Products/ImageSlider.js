import React from "react";
import Slider from "react-slick";
import {Image} from 'react-bootstrap';
import { CLOUDINARY_URL } from "../../config/index";

export default function ImageSlick(props) {
    const {images} = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
            {
                images.map((item, index) => {
                    return (
                    <div class="row">
                        <div key={index} className="room-box-img">
                            <Image src={`${CLOUDINARY_URL}/product/${item.ten}`} className="img-responsive img-fluid"/>
                        </div>
                    </div>
                        
                    )
                })
            }
        </Slider>
    );
}