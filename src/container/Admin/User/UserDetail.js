import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Header from "../partials/header";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";
import { ShowModal } from "../User/UserUpdateInfo";

const User = (props) => {
    const { location } = props;
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const handleUpdate = (dataUpdated) => {
        setData({...data, ...dataUpdated});
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
            <div className="mt-4 mx-5 admin-content">
                <div className="text-end pb-2">
                    <a href="/admin/users" className="btn btn-sm btn-outline-dark"><FaArrowLeft /> Trở về</a>
                </div>
                {loading ?
                    <Card>
                        <Card.Header as="h5">
                            {data.id_quyen_han === 1 ? <Badge bg="secondary">Level 1</Badge> : <Badge bg="warning">Level 2</Badge>} <strong className="px-2">{data.ho_ten}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <div className="row">
                                    <div className="col-8 text-black">
                                        ID: {data.id_nguoi_dung}
                                    </div>
                                    <div className="col-4 text-right">
                                        <ShowModal data={data} onUpdatedInfo={handleUpdate} />
                                    </div>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Họ tên:</span> {data.ho_ten} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Email:</span> {data.email} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Ngày sinh:</span> {data.ngay_sinh ? (new Date(data.ngay_sinh)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Địa chỉ:</span> {data.dia_chi} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Ngày hết hạn:</span> {data.expired ? (new Date(data.expired)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Điểm đánh giá dương:</span> {data.diem_danhgia_duong} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Điểm đánh giá âm:</span> {data.diem_danhgia_am} <br />
                                <span className="bold w-150px d-block d-sm-inline-block detail-title">Điểm đánh giá:</span> <span className="text-danger">{(data.diem_danhgia_duong && data.diem_danhgia_am) ? Number((data.diem_danhgia_duong / (data.diem_danhgia_duong + data.diem_danhgia_am) * 100).toFixed(2)) : ''}</span> <br />
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