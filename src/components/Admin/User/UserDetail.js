import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Header from "../partials/header";
import {FaArrowLeft} from "react-icons/fa";
import axios from "axios";
import {API_URL} from "../../../config";

const User = (props) => {
    const {location} = props;
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {
        if(!loading && id > 0) {
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
            <Header title={'Chi tiết người dùng'} hideSearch={true}/>
            <div className="mt-4 mx-5">
                <div className="text-end pb-2">
                    <a href="/admin/users" className="btn btn-sm btn-outline-dark"><FaArrowLeft/> Trở về</a>
                </div>
                { loading ?
                    <Card>
                        <Card.Header as="h5">
                            {data.id_quyen_han === 1 ? <Badge bg="secondary">Level 1</Badge> : <Badge bg="dark">Level 2</Badge>} <strong>{data.ho_ten}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>ID: {data.id_nguoi_dung}</Card.Title>
                            <Card.Text>
                                <span className="bold w-150px d-block d-sm-inline-block">Email:</span> {data.email} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Ngày sinh:</span> {data.ngay_sinh ? (new Date(data.ngay_sinh)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Địa chỉ:</span> {data.dia_chi} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Ngày hết hạn:</span> {data.expired ? (new Date(data.expired)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá dương:</span> {data.diem_danhgia_duong} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá âm:</span> {data.diem_danhgia_am} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Điểm đánh giá:</span> { (data.diem_danhgia_duong && data.diem_danhgia_am ) ? Number((data.diem_danhgia_duong /(data.diem_danhgia_duong + data.diem_danhgia_am) * 100).toFixed(2)) : ''} <br/>
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