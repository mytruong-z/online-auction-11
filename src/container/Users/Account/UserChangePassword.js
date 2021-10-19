import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { API_URL } from '../../../config';
import { Link } from 'react-router-dom';

const UserChangePassword = (props) => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const history = useHistory();

    useEffect(() => {}, []);
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (oldPass === '') {
            alert('Mật Khẩu Cũ Không Được Để Trống');
        }
        if (newPass === '') {
            alert('Mật Khẩu Mới Không Được Để Trống');
        }

        if (localStorage.user && oldPass !== "" && newPass !== "") {
            let user = JSON.parse(localStorage.user);

            const sendData = {
                mat_khau_cu: oldPass,
                mat_khau_moi: newPass
            };

            axios
                .post(`${API_URL}/api/tai-khoan/doi-mat-khau`, sendData, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
                .then(() => {
                    localStorage.removeItem('user');
                    alert('Mật Khẩu Đã Cập Nhật Thành Công. Vui Lòng Đăng Nhập Lại!');
                    history.push({
                        pathname: '/',
                        search: '',
                        state: {logout: true}
                    });
                }).catch(err => {
                switch (err.response.data.messeage) {
                    case 'old password is wrong':
                        alert('Mật Khẩu Cũ Không Chính Xác');
                        break;

                    default:
                        alert('Có Gì Đó Xảy Ra , Vui Lòng thử Lại');
                        break;
                }
            });
        }

    };
    return (
        <div className="container">
            <div className="section-title m-4">
                <span className="caption d-block small">Trang Người Dùng</span>
                <h2>Đổi Mật Khẩu</h2>
            </div>
            <div className="Login">
                <Form className="mt-5">
                    <h3>Đổi Mật Khẩu</h3>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nhập Mật Khẩu Cũ</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Mật Khẩu Cũ"
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nhập Mật Khẩu Mới</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Mật Khẩu Mới"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </Form.Group>

                    <Button onClick={(e) => handleChangePassword(e)}>Đổi mật khẩu</Button>
                </Form>
            </div>
        </div>
    );
};

export default UserChangePassword;
