import React from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import { Badge, Button } from 'react-bootstrap'
import "antd/dist/antd.css";
import "./user.css";

const UserLoved = (props) => {
  
  const data = [
    {
      id_sp: 24,
      anh: "https://res.cloudinary.com/onlineauction/image/upload/iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png",
      ten_sp: "Điện Thoại IPhone 12 Promax",
      gia_dat: 4500
    }
  ];

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
                  src={`https://res.cloudinary.com/onlineauction/image/upload/product/iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png`}
                  alt=""
                />
              }
              title={<Link >{item.ten_sp}</Link>}
              description={`${item.gia_dat} USD`}
             
            />

            <Button variant="danger" pill>
                  &times;
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserLoved;
