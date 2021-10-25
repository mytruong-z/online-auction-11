import { CLOUDINARY_URL } from "../config";
import { Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import lodash from 'lodash'
const ProductItem = (props) => {
  const { i, item, img, tokenLogin } = props;
  
  const [loveStyle, setLoveStyle] = useState(`gray`);
  const [soLuong, setSoLuong] = useState(0);
  const [caoNhat, setCaoNhat] = useState(null);
  const [idLogin, setIdLogin] = useState(null);

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setIdLogin(userLocal.user.id_nguoi_dung);
    }
    axios
      .get(`${API_URL}/api/san-pham/dau-gia/so-luong?id_sp=${item.id_sp}`)
      .then((res) => {
        setSoLuong(res.data.count);
      });

    axios
      .get(`${API_URL}/api/san-pham/dau-gia/cao-nhat?id_sp=${item.id_sp}`)
      .then((res) => {
        if(res.data !== null || res.data !== "") setCaoNhat(res.data);
      });
    if (tokenLogin !== null && idLogin !== null) {
      axios
        .get(
          `${API_URL}/api/tai-khoan/yeu-thich/kiem-tra-san-pham?san_pham=${item.id_sp}`,
          {
            headers: {
              "x-access-token": tokenLogin
            }
          }
        )
        .then((rs) => {
          if (rs.data.isLiked === true) {
            setLoveStyle(`red`);
          }
        });
    }
  }, [idLogin, item.id_sp, tokenLogin]);

  const handleTimeLeft = (end) => {
    moment.locale("vi");

    let end_date = moment(end);
    let timeLeft = end_date.fromNow();
    return timeLeft;
  };

  const handleLove = (e) => {
    e.preventDefault();
    if (tokenLogin == null) {
      alert("Có Lỗi Xảy Ra Vui Lòng Thử Lại");
    } else {
      if (loveStyle === `gray`) {
        axios
          .get(
            `${API_URL}/api/tai-khoan/yeu-thich/them-san-pham?san_pham=${item.id_sp}`,
            {
              headers: {
                "x-access-token": tokenLogin
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
            `${API_URL}/api/tai-khoan/yeu-thich/xoa-san-pham?san_pham=${item.id_sp}`,
            {
              headers: {
                "x-access-token": tokenLogin
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
    }
  };
  return (
    <>
      <div key={i} className="col-lg-4 col-12 d-grid pb-5">
        <Card style={{ width: "22rem", height: "35rem" }}>
          <Card.Img variant="top" src={`${CLOUDINARY_URL}/product/${img}`} />
          <Card.Body>
            <Card.Title>{item.ten_sp}</Card.Title>
            <Card.Text>
              Giá:
              <span className="fw-bold">
                <NumberFormat
                  value={item.gia_hien_tai}
                  displayType={"text"}
                  thousandSeparator={true}
                />{" "}
                (USD)
              </span>{" "}
              | Giá Mua Ngay: {item.gia_mua_ngay} $
              <br />
              Người Bán:{" "}
              <Link to={`/nguoi-dung/thong-tin/${item.nguoi_ban.id}`}>
                <span className="fw-bold">
                  {item.nguoi_ban.ho_ten} (+{item.nguoi_ban.diem_duong} | -
                  {item.nguoi_ban.diem_am} )
                </span>{" "}
              </Link>
              <br />
              {item.isMoi ? (
                <>
                  <img src={process.env.PUBLIC_URL + "/new.gif"} alt="new" />{" "}
                  <span>{item.relative_publish_date}</span>
                </>
              ) : (
                <span>
                  Đăng Lúc:{" "}
                  {new Date(item.publish_date).toLocaleString("vi-VN")}
                </span>
              )}
              <br />
              Thởi Gian Còn Lại:{" "}
              {item.relative_end_date !== null
                ? item.relative_end_date
                : new Date(item.end_date).toLocaleString("vi-VN")}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link
              to={`/san-pham/${item.path}`}
              className="cs-btn-detail btn btn-default text-white mb-2"
            >
              Chi tiết
            </Link>
            {idLogin === null ? (
              ""
            ) : (
              <i
                onClick={(e) => handleLove(e)}
                className="fa fa-heart float-right text-medium"
                style={{ color: `${loveStyle}` }}
                aria-hidden="true"
              ></i>
            )}

            <p>
              Người ra giá cao nhất:{" "}
              {(caoNhat === null || caoNhat === undefined || lodash.isEmpty(caoNhat)) ? (
                "Chưa Có Người Đấu Giá"
              ) : (
                <Link to={`/nguoi-dung/thong-tin/${caoNhat.id_nguoi_dung}`}>
                  {caoNhat.ho_ten} (+{caoNhat.diem_danhgia_duong}|-
                  {caoNhat.diem_danhgia_am})
                </Link>
              )}
              <br />
              Số Lượt Đấu Giá: {soLuong}
            </p>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default ProductItem;
