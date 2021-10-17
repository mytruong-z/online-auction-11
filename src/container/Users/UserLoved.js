import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import {  Button } from 'react-bootstrap'
import "antd/dist/antd.css";
import "./user.css";
import { API_URL } from '../../config';
import axios from 'axios';
import { CLOUDINARY_URL } from "../../config/index";

const UserLoved = (props) => {
  
  // const data = [
  //   {
  //     id_sp: 24,
  //     anh: "https://res.cloudinary.com/onlineauction/image/upload/iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png",
  //     ten_sp: "Điện Thoại IPhone 12 Promax",
  //     gia_dat: 4500
  //   }
  // ];
  let [data, setData] = useState([]);
  const [token, setToken] = useState("");


  useEffect(() => {let user = null;
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
      setToken(user.token);
    }
    axios.get(`${API_URL}/api/tai-khoan/yeu-thich/xem-danh-sach`,{  headers: {
      "x-access-token": user.token
    }}).then(res => {
      setData(res.data)
    })
  },[])

  const handleBoYeuThich = (e, id) => {
    e.preventDefault();


    axios.delete(`${API_URL}/api/tai-khoan/yeu-thich/xoa-san-pham?san_pham=${id}`, {  headers: {
      "x-access-token": token
    }}).then(res => {
      alert('Xóa Sản Phẩm Yêu Thích Thành Công')
    }).catch(err => {
      alert('xóa sản phẩm yêu thích thất bại')
    })

    data = data.filter(el => el.id_sp !== id)
    setData(data)
  }

  return (
    <div className="userLoved">
      <div class="section-title m-4">
        <span class="caption d-block small">Trang Người Dùng</span>
        <h2>Danh Sách Yêu Thích</h2>
      </div>
      <List
        size="large"
        header={<div>Xem Danh Sách Yêu Thích Của Tôi</div>}
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
              title={<Link to={`/san-pham/${item.path}`} >{item.ten_sp}</Link>}
              description={`${item.gia_dat} USD`}
             
            />

            <Button variant="danger" pill onClick={e => handleBoYeuThich(e, item.id_sp)}>
                  &times;
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserLoved;
