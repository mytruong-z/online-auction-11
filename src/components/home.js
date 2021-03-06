import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useHistory} from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../config";
import ProductItem from "./ProductItem";

function Home() {
  const history = useHistory();
  const [SPCaoDenThap, setSPCaoDenThap] = useState([]);
  const [SPNhieuRaGia, setSPNhieuRaGia] = useState([]);
  const [SPSapKetThuc, setSPSapKetThuc] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchFor, setSearchFor] = useState(1);

  const [idLogin, setIdLogin] = useState(null);
  const [token, setToken] =  useState(null)
  const [yeuthichs, setYeuThichs] = useState([])
  const settingSlide = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setIdLogin(userLocal.user.id_nguoi_dung);
      setToken(userLocal.token);


      axios.get(`${API_URL}/api/tai-khoan/yeu-thich/xem-danh-sach/thu-gon`,{
        headers: {
          "x-access-token": userLocal.token
        }
      }).then(res => {
        let rs = res.data.map(yt => yt.id_san_pham)
        setYeuThichs(rs)
      }).catch(err => {

      })
    }

    axios
      .get(`${API_URL}/api/san-pham/5-san-pham-gia-cao-nhat`)
      .then((res) => setSPCaoDenThap(res.data));

    axios
      .get(`${API_URL}/api/san-pham/5-san-pham-gan-ket-thuc`)
      .then((res) => setSPSapKetThuc(res.data));

    axios
      .get(`${API_URL}/api/san-pham/5-san-pham-nhieu-luot-ra-gia`)
      .then((res) => setSPNhieuRaGia(res.data));
  }, []);

  const mapSanPham = (sp, title) => {
    return (
      <div className="container w-75">
        <div className="d-flex p-2">
          <svg
            className="bd-placeholder-img rounded mr-5"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <h5 style={{ textTransform: "uppercase" }}>&nbsp;{title}</h5>
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
              return <ProductItem isLoved={yeuthichs.indexOf(item.id_sp)} tokenLogin={token} idLogin={idLogin} i={i} item={item} img={img} />
            })}
          </Slider>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="text-center">
        <img src="/images/aution_banner.png" alt="banner" />
      </div>

      <section className="search-sec">
        <div className="container">
          <form action="#" method="post" noValidate="novalidate">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6 col-12 p-0">
                    <input
                      type="text"
                      className="form-control search-slt"
                      placeholder="T??m ki???m S???n Ph???m"
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-3 col-12 p-0">
                    <select className="form-control search-slt" id="province" onChange={e => setSearchFor(e.target.value)} >
                      <option value="1" selected>T??n S???n Ph???m</option>
                      <option value="2">Theo T??n Danh M???c</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-12 p-0">
                    <button
                      type="button"
                      className="btn bg-gradient btn-danger wrn-btn"
                      onClick={e => {
                          e.preventDefault();
                          history.push(`/tim-kiem/${searchFor}/${searchName}`)
                      }} >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {mapSanPham(SPCaoDenThap, "5 S???n Ph???m Gi?? Cao Nh???t")}
      {mapSanPham(SPNhieuRaGia, "5 Nhi???u L?????t Ra Gi?? Nh???t")}
      {mapSanPham(SPSapKetThuc, "5 S???p K???t Th??c")}
    </>
  );
}

export default Home;
