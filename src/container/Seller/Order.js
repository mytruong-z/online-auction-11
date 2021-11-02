import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { addNotificationData } from "../../model/notificationModel";

const Order = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
    }
    axios
      .get(`${API_URL}/api/nguoi-ban/don-hang/thong-ke-don-hang`, {
        headers: {
          "x-access-token": userLocal.token
        }
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);
  const renderTrangThai = (status, ten) => {
    let style = "text-secondary";
    if (status === 2) {
      style = "text-success";
    }
    if (status === 3) {
      style = "text-danger";
    }
    return <span class={`fw-bold ${style}`}>{ten}</span>;
  };

  const handleGiao = (e, id, id_nguoi_mua) => {
    e.preventDefault();

    const sendData = {
      id_nguoi_mua: id_nguoi_mua,
      id_sp: id
    };

    axios
      .post(`${API_URL}/api/nguoi-ban/don-hang/chap-nhan-don-hang`, sendData, {
        headers: {
          "x-access-token": token
        }
      })
      .then((res) => {

        // @realtime // giao hàng
        addNotificationData(id_nguoi_mua, `SP #<a href="/san-pham/${id}">${id}</a> Sẽ được giao tới tay bạn trong 48h`,1)

        alert('Giao Thành Công')
        let idx = data.findIndex((dh) => dh.id_sp === id);
        data[idx].status = 2;
        data[idx].ten_trang_thai = "Giao Thành Công";
        setData([...data]);
      })
      .catch((err) => {});
  };

  const handleHuy = (e, id, id_nguoi_mua) => {
    e.preventDefault();
    const sendData = {
      id_nguoi_mua: id_nguoi_mua,
      id_sp: id
    };
    axios
      .post(`${API_URL}/api/nguoi-ban/don-hang/huy-don-hang`, sendData, {
        headers: {
          "x-access-token": token
        }
      })
      .then((res) => {
        addNotificationData(id_nguoi_mua, `SP #<a href="/san-pham/${id}">${id}</a> Đã Được Người Bán Hủy Vì Một Số Lý Do, Xin Thông Cảm`,2)

        alert('Hủy Đơn Hàng')
        let idx = data.findIndex((dh) => dh.id_sp === id);
        data[idx].status = 3;
        data[idx].ten_trang_thai = "Hủy Đơn Hàng";
        setData([...data]);
      })
      .catch((err) => {});
  };

  const renderButton = (status, id_sp, id_nguoi_dung) => {
    if (status === 1) {
      return (
        <>
          <button
            class="btn btn-success btn-action"
            onClick={(e) => handleGiao(e, id_sp, id_nguoi_dung)}
          >
            Giao
          </button>
          <button
            class="btn btn-danger btn-action"
            onClick={(e) => handleHuy(e, id_sp, id_nguoi_dung)}
          >
            Hủy
          </button>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="section-title m-4">
        <span className="caption d-block small">Trang Người Dùng</span>
        <h2>Thông tin đơn hàng</h2>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Tên Người Mua</th>
            <th>Giá Mua</th>
            <th>Ngày Đặt Hàng</th>
            <th>Trạng Thái</th>
            <th>Tác Vụ</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 &&
            data.map((don_hang) => {
              return (
                <tr>
                  <td>
                    <Link to={`/san-pham/${don_hang.path}`}>
                      {don_hang.ten}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/nguoi-dung/thong-tin/${don_hang.id_nguoi_dung}`}
                    >
                      {don_hang.ho_ten}
                    </Link>
                  </td>
                  <td>{don_hang.gia_mua} $</td>
                  <td>
                    {new Date(don_hang.ngay_dat_hang).toLocaleString("en-US")}
                  </td>
                  <td>
                    {renderTrangThai(don_hang.status, don_hang.ten_trang_thai)}
                  </td>
                  <td>
                    {renderButton(
                      don_hang.status,
                      don_hang.id_sp,
                      don_hang.id_nguoi_dung
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
