import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Divider } from "antd";
import "antd/dist/antd.css";
import "./user.css";
import axios from "axios";
import { API_URL } from "../../config";
import { CLOUDINARY_URL } from "../../config/index";

const UserProductWon = (props) => {
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
  let [data, setData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
    }

    axios
      .get(`${API_URL}/api/tai-khoan/san-pham/da-thang`, {
        headers: {
          "x-access-token": userLocal.token
        }
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="userLoved">
      <Divider orientation="left">Danh Sách Sản Phẩm Đã Thắng</Divider>
      <List
        size="large"
        header={<div>Xem Danh Sách Sản Phẩm Đã Thắng Của Tôi</div>}
        footer={<div>Hết</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/san-pham/${item.path}`}>{item.ten}</Link>}
              description={
                <>
                  <span class="fw-bold">Giá Được Mua: </span>
                  <span>{item.gia_mua} USD</span>
                  <br />
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserProductWon;
