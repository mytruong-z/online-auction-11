import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./user.css";
import { API_URL } from "../../config";
import axios from "axios";
import { CLOUDINARY_URL } from "../../config/index";

const RateForUser = (props) => {
  const [token, setToken] = useState("");
  const [lstDanhGia, setLstDanhGia] = useState([]);
  useEffect(() => {
    let user = null;
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
      setToken(user.token);
    }

    axios
      .get(`${API_URL}/api/tai-khoan/danh-gia-ve-toi`, {
        headers: {
          "x-access-token": user.token
        }
      })
      .then((res) => {
        setLstDanhGia(res.data);
      });
  }, []);

  return (
    <div className="userLoved">
      <div class="section-title m-4">
        <span class="caption d-block small">Trang Người Dùng</span>
        <h2>Nhận Xét Của Tôi</h2>
      </div>
      <List
        size="large"
        header={<div>Xem Danh Sách Nhận Xét Của Tôi</div>}
        footer={<div>Hết</div>}
        bordered
        dataSource={lstDanhGia}
        renderItem={(item) => (
          <List.Item>
            <div style={{ marginTop: 10, marginRight: 8 }}>
              <p>+{item.nguoi_danh_gia.diem_duong}</p>
              <p>-{item.nguoi_danh_gia.diem_am}</p>
            </div>
            <List.Item.Meta
              avatar={
                <img
                  style={{ width: "3rem" }}
                  src={process.env.PUBLIC_URL + "/user.png"}
                  alt=""
                />
              }
              title={<Link to={`/`}>{item.nguoi_danh_gia.ho_ten}</Link>}
              description={`${item.nhan_xet}`}
            />

            <span pill style={{ fontWeight: 700, fontSize: 30 }}>
              {item.diem}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RateForUser;
