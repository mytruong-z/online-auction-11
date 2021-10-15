import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router';

const UserUpdateInfo = props => {
    return (
        <div class="container">
        <div class="section-title m-4">
          <span class="caption d-block small">Trang Người Dùng</span>
          <h2>Cập Nhật Thông Tin</h2>
        </div>
        <div class="login">
          <Form className="mt-5">
            <h3>Đổi Mật Khẩu</h3>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nhập Họ Tên</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập Họ Tên"
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nhập Ngày Sinh</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập Ngày Sinh"
              />
            </Form.Group>
  
            <Button >
              Cập Nhật Thông Tin
            </Button>
          </Form>
        </div>
      </div>
    );
}

export default UserUpdateInfo