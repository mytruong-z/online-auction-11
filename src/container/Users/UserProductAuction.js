import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Divider } from "antd";
import "antd/dist/antd.css";
import "./user.css";
import axios from "axios";
import { API_URL } from '../../config';
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
  let [data, setData] = useState([])
  const [token, setToken] = useState("");
  const [userLogin, setUserLogin] = useState(null)
  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
      setUserLogin(userLocal)
      
      axios.get(`${API_URL}/api/dau-gia/san-pham/dang-tham-gia`,{
        headers: {
            "x-access-token": userLocal.token
          }
      }).then(res => {
          setData(res.data)
      })
    }

    
  },[])
  
  return (
    <div className="userLoved">
      <Divider orientation="left">Danh Sách Sản Phẩm Đang Đấu Giá</Divider>
      <List
        size="large"
        header={<div>Xem Danh Sách Sản Phẩm Đang Đấu Giá Của Tôi</div>}
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
              { console.log(item.ten_sp + " " + item.dau_gia.cao_nhat + " " + userLogin.user.id_nguoi_dung) }
              {item.dau_gia.cao_nhat === userLogin.user.id_nguoi_dung ? (
                <span class="text-success">Giữ Top</span>
              ) : (
                <span class="text-danger">Mất Top</span>
              )}
              
            </span>

            
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserProductWon;
