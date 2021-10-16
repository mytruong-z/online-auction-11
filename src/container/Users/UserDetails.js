import './user.css';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { selectRole } from '../../selector/roleSelector';
import { API_URL } from '../../config';
import { Form, Button } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

/*
    {
    "id_nguoi_dung": 1,
    "email": "nijigi1129@rebation.com",
    "ho_ten": "John Henry",
    "ngay_sinh": "2019-07-03T10:00:00.000Z",
    "dia_chi": "123 hung vuong",
    "id_quyen_han": 2,
    "diem_danhgia_duong": 3,
    "diem_danhgia_am": 4,
    "expired": "2021-09-08T03:15:51.000Z"
    }
*/

const UserDetails = (props) => {
    const history = useHistory();
    const [userLogin, setUserLogin] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [birthDay, setBirthDay] = useState(null);
    const [token, setToken] = useState('');
    useEffect(() => {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user);
            setToken(user.token);
            axios
                .get(`${API_URL}/api/tai-khoan/details`, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
                .then((res) => {
                    setUserLogin(res.data);
                    setFullName(res.data.ho_ten);
                    setBirthDay(res.data.ngay_sinh);
                });
        } else {
            history.push('/');
        }
    }, [history]);

    const handleChangeInfo = e => {
        e.preventDefault();
        //// call axios
        const sendData = {
            ho_ten: fullName,
            ngay_sinh: birthDay
        };
        axios.patch(`${API_URL}/api/tai-khoan/cap-nhat`, sendData, {
            headers: {
                'x-access-token': token
            }
        }).then(res => {}).catch(err => alert('Có Gì Đó Lỗi Xảy Ra'));
    };

    return (
        <div className="container">
            <div className="section-title m-4">
                <span className="caption d-block small">Trang Người Dùng</span>
                <h2>Thông tin cá nhân</h2>
            </div>
            {userLogin != null ? (
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="justify-content-center">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-1 user-point">
                                        <p>+{userLogin.diem_danhgia_duong}</p>
                                        <p>-{userLogin.diem_danhgia_am}</p>
                                    </div>
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img
                                                    src={process.env.PUBLIC_URL + '/user.png'}
                                                    className="rounded-circle"
                                                    alt="user"
                                                    style={{width: '12rem'}}
                                                />
                                            </div>
                                            <h6 className="f-w-600">{fullName}</h6>
                                            <h7 className="">{userLogin.dia_chi}</h7>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="card-block">
                                            <h5 className="m-b-20 p-b-5 b-b-default f-w-600">
                                                Thông tin cá nhân
                                            </h5>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{userLogin.email}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Ngày Sinh</p>
                                                    <h6 className="text-muted f-w-400">
                                                        {new Date(birthDay).toLocaleDateString(
                                                            'en-US'
                                                        )}
                                                    </h6>
                                                </div>
                                            </div>
                                            <h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                Quyền Hạn
                                            </h5>
                                            <div className="row">
                                                <p className="m-b-10 f-w-600">Quyền Hạn Hiện Tại</p>
                                                <h6 className="text-muted f-w-400">
                                                    {selectRole(userLogin.id_quyen_han).name}
                                                </h6>
                                                <div class="d-inline p-2">
                                                    {userLogin.id_quyen_han === 2 ||
                                                    userLogin.id_quyen_han === 3 ? (
                                                        ''
                                                    ) : (
                                                        <button className="btn btn-danger mr-1">
                                                            Trở Thành Seller
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                Cập Nhật Thông Tin
                                            </h5>

                                            <div className="d-inline ">
                                                <button
                                                    type="button"
                                                    className="btn btn-success "
                                                    data-toggle="modal"
                                                    data-target="#modelId"
                                                >
                                                    Sửa Thông Tin Cá Nhân
                                                </button>

                                                <div
                                                    className="modal fade"
                                                    id="modelId"
                                                    tabIndex="-1"
                                                    role="dialog"
                                                    aria-labelledby="modelTitleId"
                                                    aria-hidden="true"
                                                >
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">
                                                                    Cập Nhật Thông Tin
                                                                </h5>
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                >
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container">
                                                                    <div className="login">
                                                                        <Form className="mt-5">
                                                                            <Form.Group
                                                                                className="mb-3"
                                                                                controlId="formBasicName"
                                                                            >
                                                                                <Form.Label>Nhập Họ Tên</Form.Label>
                                                                                <Form.Control
                                                                                    required
                                                                                    type="text"
                                                                                    placeholder="Nhập Họ Tên"
                                                                                    value={fullName}
                                                                                    onChange={e => setFullName(e.target.value)}
                                                                                />
                                                                            </Form.Group>

                                                                            <Form.Group
                                                                                className="mb-3"
                                                                                controlId="formBasicName"
                                                                            >
                                                                                <Form.Label>
                                                                                    Nhập Ngày Sinh
                                                                                </Form.Label>
                                                                                <Datetime value={birthDay}
                                                                                          onChange={(date) => { setBirthDay(date); }}/>
                                                                            </Form.Group>
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary"
                                                                    data-dismiss="modal">
                                                                    Đóng
                                                                </button>
                                                                <button type="button" className="btn btn-success"
                                                                        data-dismiss="modal"
                                                                        onClick={e => handleChangeInfo(e)}>
                                                                    Lưu Thông Tin
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link
                                                    to="/nguoi-dung/doi-mat-khau"
                                                    className="btn btn-primary m-1"
                                                >
                                                    Đổi Mật Khẩu
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
export default UserDetails;
