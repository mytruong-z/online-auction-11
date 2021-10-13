import React, { useEffect, useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import Slider from "react-slick";

import axios from "axios";
import { API_URL, CLOUDINARY_URL } from "../config";
import ProductItem from "./ProductItem";
function Home() {
  const [SPCaoDenThap, setSPCaoDenThap] = useState([]);
  const [SPNhieuRaGia, setSPNhieuRaGia] = useState([]);
  const [SPSapKetThuc, setSPSapKetThuc] = useState([]);

  const settingSlide = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/san-pham/5-san-pham-gia-cao-nhat`)
      .then((res) => setSPCaoDenThap(res.data));

    axios
      .get(`${API_URL}/san-pham/5-san-pham-gan-ket-thuc`)
      .then((res) => setSPSapKetThuc(res.data));

    axios
      .get(`${API_URL}/san-pham/5-san-pham-nhieu-luot-ra-gia`)
      .then((res) => setSPNhieuRaGia(res.data));
      
  }, []);

  const mapSanPham = (sp, title) => {
    return (
      <div className="container w-75">
        <div class="d-flex p-2">
          <svg
            class="bd-placeholder-img rounded mr-5"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <h5 style={{ textTransform: "uppercase" }}>{title}</h5>
        </div>

        <div className="row room-items">
          <Slider {...settingSlide}>
            {sp.map((item, i) => {
              let img = "no-img.png";
              if (typeof item.anh !== "undefined" && item.anh.length) {
                if (typeof item.anh !== "undefined") {
                  img = item.anh;
                }
              }
              return <ProductItem i={i} item={item} img={img} />;
            })}
          </Slider>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="search-sec">
        <div className="container">
          <form action="#" method="post" noValidate="novalidate">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-9 col-12 p-0">
                    <input
                      type="text"
                      className="form-control search-slt"
                      placeholder="Tìm kiếm"
                    />
                  </div>

                  <div className="col-lg-3 col-12 p-0">
                    <button
                      type="button"
                      className="btn bg-gradient btn-danger wrn-btn"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {mapSanPham(SPCaoDenThap, "5 Sản Phẩm Giá Cao Nhất")}
      {mapSanPham(SPNhieuRaGia, "5 Nhiều Lượt Ra Giá Nhất")}
      {mapSanPham(SPSapKetThuc, "5 Sắp Kết Thúc")}
    </>
  );
}

export default Home;
