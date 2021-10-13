import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../../config/index';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push('/');
        }
    }, []);

    async function login () {
        console.warn(email, password);
        let item = {email, password};
        await fetch(`${API_URL}/api/login`, {
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
            const result = await response.json();
            if (result.status === 0) {
                alert('Tài Khoản chưa được kích hoạt, Vui lòng vào Email kích hoạt');
            }
            else {
                localStorage.setItem('user', JSON.stringify(result));
                console.log(result);
                history.push('/');
            }
        }).catch(function (error) {
            alert('Sai email hoặc password');
        });

    }

    return (
        <div className="Login">
            <Form className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Nhập mật khẩu"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Nhớ mật khẩu"/>
                </Form.Group>
                <Button onClick={login} variant="primary">
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;