import React from 'react';
import {Link} from 'react-router-dom'
import { List, Divider, Avatar } from 'antd';
import 'antd/dist/antd.css';
import './user.css'

const UserHistory = props => {
    /*
        
    */
    const data = [
        {
            "id_sp": 24,
            "anh": "https://res.cloudinary.com/onlineauction/image/upload/iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png",
            "ten_sp": "Điện Thoại IPhone 12 Promax",
            "gia_dat": 4500,
        }
    ]

    return (
        <div className="userLoved">
            <Divider orientation="left">Danh sách Yêu Thích</Divider>
            <List
                size="large"
                header={<div>Xem Danh Sách Yêu Thích Của Tôi</div>}
                footer={<div>Hết</div>}
                bordered
                dataSource={data}
                renderItem={item => 
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.anh}/>}
                            title={<Link to="">{item.ten_sp}</Link>}
                            description={`${item.gia_dat} USD`}
                        />
                    </List.Item>
                }
            />
        </div>
    );
}

export default UserHistory;