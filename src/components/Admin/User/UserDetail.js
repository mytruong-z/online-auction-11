import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import Header from "../partials/header";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";

const User = (props) => {
    const { location } = props;
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    function ShowModal({ data }) {
        const [dataDetail, setDataDetail] = useState(data);
        const [style, setStyle] = useState({color:'green', display: 'none'});
        const [message, setMessage] = useState('');
        const [validated, setValidated] = useState(false);
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleSubmit = () => {
            setValidated(true);
            let userToken = JSON.parse(localStorage.user);
            const user = {
                id_nguoi_dung: dataDetail.id_nguoi_dung,
                ho_ten: dataDetail.ho_ten,
                email: dataDetail.email,
                dia_chi: dataDetail.dia_chi,
                ngay_sinh: dataDetail.ngay_sinh,
            }
            axios.put(`${API_URL}/api/admin/quan-ly-nguoi-dung//update-user-infor/`, user, {
                headers: {
                    'x-access-token': userToken.token
                },
            })
            .then((res) => {
                if(res.data.success === true){
                    setStyle({color: 'green', display: 'inline'});
                    setMessage(res.data.message);
                    setDataDetail({...dataDetail, ...res.data.user});
                }
                else{
                    setStyle({color: 'red', display: 'inline'});
                    setMessage(res.data.message);
                }
            });
        };

        useEffect(() => {
            if(show === false){
                setData(dataDetail);
            }
        },[show, dataDetail]);

        return (
            <>
                <Button variant="primary" className="mt-3" onClick={handleShow}>
                    Chỉnh sửa
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="col-12">
                            <h4 className="d-flex justify-content-center">Chỉnh sửa thông tin cá nhân</h4>
                            <span className="d-flex justify-content-center" style={{color: style.color, display: style.display}}>{message}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form validated={validated}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Họ Tên</Form.Label>
                                <Form.Control type="text" name="ho_ten" placeholder="Họ Tên" defaultValue={dataDetail.ho_ten} onChange={(ev) => setDataDetail({ ...dataDetail, ho_ten: ev.target.value })} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập họ tên
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Ngày Sinh</Form.Label>
                                <Form.Control type="text" name="ngay_sinh" placeholder="ngày/tháng/năm" defaultValue={dataDetail.ngay_sinh ? (new Date(dataDetail.ngay_sinh)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} onChange={(ev) => setDataDetail({ ...dataDetail, ngay_sinh: ev.target.value })} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập ngày sinh
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Địa Chỉ</Form.Label>
                                <Form.Control type="text" name="dia_chi" placeholder="Địa Chỉ" defaultValue={dataDetail.dia_chi} onChange={(ev) => setDataDetail({ ...dataDetail, dia_chi: ev.target.value })} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập địa chỉ
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Email" defaultValue={dataDetail.email} onChange={(ev) => setDataDetail({ ...dataDetail, email: ev.target.value })} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập email
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Cập Nhật
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    useEffect(async () => {
        if (!loading && id > 0) {
            if (localStorage.user) {
                let user = JSON.parse(localStorage.user);
                setToken(user.token);
                axios
                    .get(`${API_URL}/api/admin/quan-ly-nguoi-dung/detail-user?id_nguoi_dung=` + id, {
                        headers: {
                            'x-access-token': user.token
                        }
                    })
                    .then((res) => {
                        setData(res.data.userDetail);
                        setLoading(true);
                    });
            } else {
                history.push('/');
            }
        }
    }, []);

    useEffect(async () => {
        if (data) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    return (
        <>
            <Header title={'Chi tiết người dùng'} hideSearch={true} />
            <div className="mt-4 mx-5">
                <div className="text-end pb-2">
                    <a href="/admin/users" className="btn btn-sm btn-outline-dark"><FaArrowLeft /> Trở về</a>
                </div>
                {loading ?
                    <Card>
                        <Card.Header as="h5">
                            {data.id_quyen_han === 1 ? <Badge bg="secondary">Level 1</Badge> : <Badge bg="dark">Level 2</Badge>} <strong>{data.ho_ten}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>ID: {data.id_nguoi_dung}</Card.Title>
                            <Card.Text>
                                <span className="bold w-150px d-block d-sm-inline-block">Họ tên:</span> {data.ho_ten} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Email:</span> {data.email} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Ngày sinh:</span> {data.ngay_sinh ? (new Date(data.ngay_sinh)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Địa chỉ:</span> {data.dia_chi} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Ngày hết hạn:</span> {data.expired ? (new Date(data.expired)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá dương:</span> {data.diem_danhgia_duong} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá âm:</span> {data.diem_danhgia_am} <br />
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá:</span> {(data.diem_danhgia_duong && data.diem_danhgia_am) ? Number((data.diem_danhgia_duong / (data.diem_danhgia_duong + data.diem_danhgia_am) * 100).toFixed(2)) : ''} <br />
                                <ShowModal data={data} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    :
                    <div>Đang tải dữ liệu...</div>
                }
            </div>
        </>

    );
};

export default User;