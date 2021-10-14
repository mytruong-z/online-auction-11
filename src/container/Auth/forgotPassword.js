import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../../config';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [mat_khau, setNewPassWord] = useState('');
    const [screen, setScreen] = useState(1);
    const history = useHistory();

    const request = () => {
        let item = {email};
        fetch(`${API_URL}/quen-mat-khau`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.ok) {
                alert('Yêu cầu tạo lại mã đã được gửi. Vui lòng kiểm tra Email!');
                setScreen(2);
                return response;
            } else {
                alert('Tài khoản không tồn tại vui lòng kiểm tra lại');
            }
        }).catch(function (error) {
            alert('Tài khoản không tồn tại vui lòng kiểm tra lại');
        });
    };

    const confirmCode = () => {
        let item = {otp, mat_khau};
        fetch(`${API_URL}/quen-mat-khau/activation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                alert('Thay đổi mật khẩu không thành công. Vui lòng thử lại!');
            } else {
                history.push('/login');
                return response;
            }
        }).catch(function (error) {
            alert('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
        });
    };

    return (
        <div className="Login">
            <Form className="mt-5">
                {
                    screen === 1 ?
                        <div>
                            <div className="form-title">
                                <h3>Tạo Mới Mật Khẩu</h3>
                            </div>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Email</Form.Label>
                                <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}
                                              placeholder="Nhập email"/>
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={() => request()}
                                    variant="primary">
                                Gửi yêu cầu
                            </Button>
                        </div> : ''
                }

                {
                    screen === 2 ?
                        <div>
                            <div className="form-title">
                                <h3>Tạo Mới Mật Khẩu</h3>
                            </div>
                            < Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Mã xác nhận</Form.Label>
                                <Form.Control required type="number" onChange={(e) => setOTP(e.target.value)}
                                              placeholder="Nhập mã xác nhận"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật Khẩu Mới</Form.Label>
                                <Form.Control type="password" onChange={(e) => setNewPassWord(e.target.value)}
                                              placeholder="Nhập mật khẩu"/>
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={confirmCode} variant="primary">
                                Xác Nhận
                            </Button>
                        </div> : ''
                }
            </Form>
        </div>
    );
};

export default ForgotPassword;