import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL, CAPTCHA_SITE_KEY } from "../../config/index";
import ReCAPTCHA from "react-google-recaptcha";
import { addNotificationData } from "../../model/notificationModel";
import axios from "axios";

function Register() {
  const [ho_ten, setHoTen] = useState("");
  const [dia_chi, setDiaChi] = useState("");
  const [email, setEmail] = useState("");
  const [mat_khau, setMatKhau] = useState("");
  const [isShowCode, setShowCode] = useState(false);
  const [otp, setCode] = useState("");
  const history = useHistory();

  const recaptchaRef = React.createRef();

  const register = (e) => {
    e.preventDefault();
    let item = { ho_ten, dia_chi, email, mat_khau };
    if (ho_ten !== "" && dia_chi !== "" && email !== "" && mat_khau !== "") {
      axios
        .post(`${API_URL}/dang-ki`, item)
        .then((response) => {
          alert("Đăng kí thành công. Hãy kiểm tra mã OTP");
          setShowCode(true);
        })
        .catch((error) => {
          alert("email đã được đăng kí");
        });
    } else {
      alert("Vui lòng kiểm tra lại thông tin");
    }
  };

  const confirmOTP = (e) => {
    e.preventDefault()
    let item = { otp };
    if (otp !== "") {
      axios
        .post(`${API_URL}/dang-ki/activation`, item)
        .then((res) => {
          alert("Đăng kí thành công");
          console.log(res.data);
          addNotificationData(res.data.user.id_nguoi_dung,"Chào Mừng Bạn Đã Đến Với Online Auction",1);
          history.push("/login");
        })
        .catch((error) => {
          alert("Sai mã OTP");
        });
    } else {
      alert("Vui lòng nhập mã OTP");
    }
  }

  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  };

  return (
    <div className="Login">
      {isShowCode ? (
        <Form className="mt-5">
          <h3>Xác Nhận</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nhập Mã OTP</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setCode(e.target.value)}
              placeholder="OTP"
            />
          </Form.Group>
          <Button onClick={(e) => confirmOTP(e)} variant="primary">
            Đăng kí
          </Button>
        </Form>
      ) : (
        <Form className="mt-5">
          <h3>Đăng Ký</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Họ Tên</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setHoTen(e.target.value)}
              placeholder="Nhập Họ Tên"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setDiaChi(e.target.value)}
              placeholder="Địa chỉ"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật Khẩu</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </Form.Group>

          <div className="captcha-custom">
            <ReCAPTCHA
              size="invisible"
              ref={recaptchaRef}
              sitekey={CAPTCHA_SITE_KEY}
              onChange={onSubmit}
            />
          </div>

          <Button onClick={(e) => register(e)} variant="primary">
            Đăng kí
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Register;
