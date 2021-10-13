import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../../config/index';

function Register () {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cardId, setCardId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function register () {
        console.warn(name, phone, cardId, email, password);
        let item = {name, phone, cardId, email, password};
        await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(async function (response) {
            history.push('/login');
            alert('Đăng kí thành công');
        }).catch(function (error) {
            alert('email đã được đăng kí');
        });

    }

    return (
        <div className="Login">
            <Form className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Họ Tên</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Nhập Họ Tên"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Điện thoại</Form.Label>
                    <Form.Control type="number" onChange={(e) => setPhone(e.target.value)}
                                  placeholder="Nhập số điện thoại"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCardId">
                    <Form.Label>Chứng minh nhân dân</Form.Label>
                    <Form.Control type="number" onChange={(e) => setCardId(e.target.value)}
                                  placeholder="Nhập số chứng minh nhân dân"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Nhập mật khẩu"/>
                </Form.Group>
                <Button onClick={() => { if (window.confirm('Bạn muốn tiếp tục không')) register();}} variant="primary">
                    Đăng kí
                </Button>
            </Form>
        </div>
    );
}

export default Register;