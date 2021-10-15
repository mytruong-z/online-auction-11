import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router';

const UserChangePassword = (props) => {
    
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const history = useHistory();
    useEffect(() => {},[])
    const handleChangePassword = (e) =>{
        e.preventDefault();
        let state = true
        if(oldPass === "") {
             state = false
             alert("Mật Khẩu Cũ Không Được Bằng Rỗng") }
        if(newPass === "") { 
            state = false
            alert("Mật Khẩu Mới Không Được Bằng Rỗng") 
        }
        if(state === true){
            history.push("/")
        }
    }
return (
    <div class="container">
      <div class="section-title m-4">
        <span class="caption d-block small">Trang Người Dùng</span>
        <h2>Đổi Mật Khẩu</h2>
      </div>
      <div class="login">
        <Form className="mt-5">
          <h3>Đổi Mật Khẩu</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nhập Mật Khẩu Cũ</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Mật Khẩu Cũ"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nhập Mật Khẩu Mới</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Mật Khẩu Mới"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
            />
          </Form.Group>

          <Button onClick={e => handleChangePassword(e)}>
            Đổi mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserChangePassword;
