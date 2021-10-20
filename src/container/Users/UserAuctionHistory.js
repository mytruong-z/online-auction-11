import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Divider } from "antd";
import "antd/dist/antd.css";
import "./user.css";
import axios from "axios";
import { API_URL } from '../../config';
import { CLOUDINARY_URL } from "../../config/index";

const UserHistory = (props) => {
  /*
        {
            "ten_sp": "Điện Thoại IPhone 12 Promax",
            "dau_gia": {
                "gia_khoi_diem": 6000,
                "gia_mua": 4500
            },
            "status": {
                "id": 1,
                "ten": "Kích Hoạt"
            },
            "ngay_dat": "2021-10-01T12:56:39.000Z"
        }  
    */
  let [data, setData] = useState([])
  const [token, setToken] = useState("");

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
    }

    axios.get(`${API_URL}/api/tai-khoan/lich-su-dau-gia`,{
        headers: {
            "x-access-token": userLocal.token
          }
    }).then(res => {
        setData(res.data)
    })
  },[])

  return (
    <div className="userLoved">
      <Divider orientation="left">Lịch sử đấu giá</Divider>
      <List
        size="large"
        header={<div>Xem Danh Sách Lịch Sử Đấu Giá Của Tôi</div>}
        footer={<div>Hết</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  style={{ width: "5rem" }}
                  src={`${CLOUDINARY_URL}/product/${item.anh}`}
                  alt=""
                />
              }
              title={<Link to={`/san-pham/${item.path}`}>{item.ten_sp}</Link>}
              description={
                <>
                  <span class="fw-bold">Giá Đặt: </span>{" "}
                  <span>{item.dau_gia.gia_khoi_diem} USD</span>
                  <br />
                  <span class="fw-bold">Giá Được Mua: </span>
                  <span>{item.dau_gia.gia_mua} USD</span>
                  <br />
                </>
              }
            />

            <span pill style={{ fontWeight: 700, fontSize: 20 }}>
              {item.status.id === 1 ? (
                <span class="text-success">Thành Công</span>
              ) : (
                ""
              )}
              {item.status.id === 2 ? (
                <span class="text-danger">Thất Bại</span>
              ) : (
                ""
              )}
              {item.status.id === 3 ? (
                <span class="text-warning">Chờ Xác Nhận</span>
              ) : (
                ""
              )}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserHistory;
