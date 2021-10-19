import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

const UserAcceptList = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  let [topDat, setTopDat] = useState(null);
  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
    }
    axios
      .get(`${API_URL}/api/dau-gia/danh-sach-cho`, {
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
            <th>Tên Người Đặt</th>
            <th>Giá Đặt</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Tác Vụ</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 &&
            data.map((dau_gia) => {
              return (
                <tr>
                  <td>
                    <Link to={`/san-pham/${dau_gia.path}`}>
                      {dau_gia.ten_sp}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/nguoi-dung/thong-tin/${dau_gia.id_nguoi_dau_gia}`}>
                      {dau_gia.ho_ten}
                    </Link>
                  </td>
                  <td>{dau_gia.gia_mua} $</td>
                  <td>{new Date(dau_gia.ngay_dat).toLocaleString("en-US")}</td>
                  
                  <td>
                    <span class="fw-bold text-warning">Đang Chờ</span>
                  </td>
                  <td>
                  <>
          <button class="btn btn-success btn-action">Chấp Nhận</button>
          <button class="btn btn-danger btn-action">Hủy</button>
        </>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserAcceptList;
