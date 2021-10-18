import { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import "./product.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router";
import { API_URL } from "../../config";
import ProductItem from "../../components/ProductItem";
import Slider from "react-slick";
import { Divider } from "antd";
import ShowMoreText from "react-show-more-text";

const ProductDetails = (props) => {
  const [loveStyle, setLoveStyle] = useState(`gray`);
  const { name } = useParams();

  const [product, setProduct] = useState(null);
  const [mota, setMoTa] = useState("");
  const [namSPCungLoai, setNamSanPhamCungLoai] = useState([]);
  const [token, setToken] = useState("");
  const history = useHistory();
  const settingSlide = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  useEffect(() => {
    let user = null;
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
      setToken(user.token);
    }

    axios.get(`${API_URL}/api/san-pham/details/${name}`).then((res) => {
      setProduct(res.data);
      setMoTa(res.data.mo_ta);

      axios
        .get(
          `${API_URL}/api/tai-khoan/yeu-thich/kiem-tra-san-pham?san_pham=${res.data.id_sp}`,
          {
            headers: {
              "x-access-token": user.token
            }
          }
        )
        .then((rs) => {
          if (rs.data.isLiked === true) {
            setLoveStyle(`red`);
          }
        });
      // callback hell
      axios
        .get(
          `${API_URL}/api/san-pham/5-san-pham-cung-danh-muc?danh_muc=${res.data.danh_muc.id}&size=5`
        )
        .then((r) => {
          setNamSanPhamCungLoai(r.data);
        })
        .catch((err) => console.log(err));
    });
  }, [name]);

  const handleLove = (e) => {
    e.preventDefault();
    if (loveStyle === `gray`) {
      axios
        .get(
          `${API_URL}/api/tai-khoan/yeu-thich/them-san-pham?san_pham=${product.id_sp}`,
          {
            headers: {
              "x-access-token": token
            }
          }
        )
        .then((r) => {
          alert("Thêm Sản Phẩm Yêu Thích Thành Công");
        })
        .catch((err) => {
          alert("thêm sản phẩm yêu thích thất bại");
        });
      setLoveStyle(`red`);
    } else {
      axios
        .delete(
          `${API_URL}/api/tai-khoan/yeu-thich/xoa-san-pham?san_pham=${product.id_sp}`,
          {
            headers: {
              "x-access-token": token
            }
          }
        )
        .then((r) => {
          alert("Xóa Sản Phẩm Yêu Thích Thành Công");
        })
        .catch((err) => {
          alert("Xóa sản phẩm yêu thích thất bại");
        });
      setLoveStyle(`gray`);
    }
  };
  return (
    <>
      {product === null ? (
        ""
      ) : (
        <div className="container">
          <div className="section-title m-4">
            <span className="caption d-block small">Thông Tin Sản Phẩm</span>
            <h1 style={{ textTransform: "uppercase" }}>{product.ten_sp}</h1>
            <span className="caption d-block small">
              Danh Mục:{" "}
              <Link
                to={`/danh-muc/${product.danh_muc.id}/${product.danh_muc.ten}`}
              >
                {product.danh_muc.ten}
              </Link>
            </span>
            <span className="caption d-block small">
              Tên:
              <Link to={`/nguoi-dung/thong-tin/${product.nguoi_ban.id}`}>
                {product.nguoi_ban.ho_ten}
              </Link>
            </span>
          </div>

          <div className="rom-box">
            <div className="row">
              <div className="room-slide-img col-6">
                <ImageSlider images={product.anh_phu} />
                <br />
                <br />
                <br />
                <div className="danh-gia"></div>
              </div>
              <div className="col-6 mt-5">
                <div className="d-flex">
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
                  <h5 style={{ textTransform: "uppercase" }}>
                    &nbsp;Đánh Giá Từ Chuyên Gia
                  </h5>
                </div>
                <span>
                  <a href="#" target="_blank">
                    {product.ten_sp}
                  </a>
                  &nbsp;đánh dấu bước tiến mới của&nbsp;
                  <a href="https://thegioididong.com/samsung" target="_blank">
                    {product.danh_muc.ten}
                  </a>
                  &nbsp;trong phân khúc&nbsp;
                </span>
                <Divider />
                <div className="d-flex">
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
                  <h5 style={{ textTransform: "uppercase" }}>
                    &nbsp;Giá Sản Phẩm
                  </h5>
                </div>

                <p className="gia-dat">
                  Giá Hiện Tại: {product.gia_hien_tai} $
                </p>
                <p className="gia-goc">
                  Giá Mua Ngay: {product.gia_mua_ngay} $
                </p>
                <p>
                  Giá Đặt Thấp Nhất: {product.gia_hien_tai + product.buoc_gia} $
                </p>
                <Divider />

                {token != null ? (
                  <>
                    <div className="d-flex">
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
                      <h5 style={{ textTransform: "uppercase" }}>
                        &nbsp;Theo Dõi Sản Phẩm
                      </h5>
                    </div>
                    <div className="loved-section">
                      <button
                        class="btn btn-outline-danger"
                        onClick={(e) => handleLove(e)}
                      >
                        <i
                          className="fa fa-heart"
                          style={{ color: `${loveStyle}` }}
                          aria-hidden="true"
                        ></i>
                      </button>

                      <span> Hoặc </span>

                      <button class="btn btn-outline-primary">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                      </button>

                      <button class="btn btn-outline-success m-3">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                      </button>

                      <button class="btn btn-outline-secondary">
                        <i class="fa fa-telegram" aria-hidden="true"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <Divider />

                <a
                  onClick={(e) => history.push("/")}
                  className="btn-buynow jsBuy"
                >
                  ĐÂÚ GIÁ NGAY
                </a>
                <div className="row mt-2">
                  <div className="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      className="btn btn-ins pay-taichinh  "
                    >
                      MUA NGAY
                      <span>Mua với giá cao nhất</span>
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      className="btn btn-ins pay-taichinh  "
                    >
                      LỊCH SỬ RA GIÁ
                      <span>Tham khảo giá sản phẩm</span>
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      className="btn btn-ins pay-taichinh  "
                    >
                      TỪ CHỐI RA GIÁ
                      <span>Hủy bỏ người đứng đầu</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex">
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
            <h5 style={{ textTransform: "uppercase" }}>
              &nbsp;Mô Tả Chi Tiết
              <i
                class="fa fa-pencil-square-o"
                data-toggle="modal"
                data-target="#modelId"
                aria-hidden="true"
              ></i>
            </h5>

            <div
              class="modal fade"
              id="modelId"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Sửa Mô Tả Sản Phẩm</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Mô Tả
                      </label>
                      <div style={{ color: "gray" }}>
                        <ShowMoreText
                          /* Default options */
                          lines={3}
                          more="Show more"
                          less="Show less"
                          className="content-css"
                          anchorClass="my-anchor-css-class"
                          expanded={false}
                          truncatedEndingComponent={"... "}
                        >
                          {mota}
                        </ShowMoreText>
                      </div>
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="nhập thông tin thêm vào"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button type="button" class="btn btn-primary">
                      Lưu Thông Tin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ShowMoreText
            /* Default options */
            lines={3}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="my-anchor-css-class"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            {mota}
          </ShowMoreText>
        </div>
      )}

      <div className="container d-flex mt-5">
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
        <h5 style={{ textTransform: "uppercase" }}>
          &nbsp;5 Sản Phẩm Cùng Danh Mục
        </h5>
      </div>

      <div className="container w-75">
        <div className="row room-items">
          <Slider {...settingSlide}>
            {namSPCungLoai.map((item, i) => {
              let img = "no-img.png";
              if (typeof item.anh !== "undefined" && item.anh.length) {
                if (typeof item.anh !== "undefined") {
                  img = item.anh;
                }
              }
              return <ProductItem key={i} i={i} item={item} img={img} />;
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
