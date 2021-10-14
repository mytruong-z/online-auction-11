import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { pathSplitting } from '../utils/pathSplit';
import { API_URL } from '../config';
//@LoanNgo, You can rely on this variable to check the login status: localStorage;

const Menu = () => {
    const [listDMPC, setListDMPC] = useState([]);
    const [listDMDT, setListDMDT] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`${API_URL}/danh-muc/danh-sach-danh-muc-theo-cap?cap=0`)
            .then((res) => setListDMDT(res.data));

        axios
            .get(`${API_URL}/danh-muc/danh-sach-danh-muc-theo-cap?cap=1`)
            .then((res) => setListDMPC(res.data));
    }, []);
    return (
        <div className="bg-light shadow">
            <Nav
                defaultActiveKey="/home"
                as="ul"
                className="container justify-content-between"
            >
                <div className="logo">
                    <a href="/">
                        <img
                            src="/aution_logo.png"
                            width="100"
                            className="p-2"
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="d-flex">
                    <li className="my-li align-items-center d-grid nav-item px-2">
                        <Link to="/" className="text-pink">
                            Trang Chủ
                        </Link>
                    </li>

                    <li className="my-li align-items-center d-grid nav-item px-2">
                        <Link to="/register" className="text-pink">
                            Đăng Ký
                        </Link>
                    </li>

                    <li className="my-li align-items-center d-grid nav-item px-2">
                        <Link to="/login" className="text-pink">
                            Đăng Nhập
                        </Link>
                    </li>

                    <li className="my-li align-items-center d-grid nav-item">
                        <div className="cate-dropdown ">
                            <li
                                className="nav-link text-left cateBtn"
                                onClick={(e) => history.push('/danh-sach-san-pham')}
                            >
                                Danh Mục
                                <i className="fa fa-caret-down"/>
                            </li>
                            <div className="cate-content">
                                <div className="row">
                                    <div className="col-4">
                                        <h5>Máy Tính</h5>
                                        <ul>
                                            {listDMPC.length !== 0 &&
                                            listDMPC.map((pc) => {
                                                return (
                                                    <>
                                                        <li>
                                                            <Link
                                                                to={`/danh-muc/${
                                                                    pc.id_danh_muc
                                                                    }/${pathSplitting(pc.ten)}`}
                                                            >
                                                                {pc.ten}
                                                            </Link>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <h5>Điện thoại</h5>
                                        <ul>
                                            {listDMDT.length !== 0 &&
                                            listDMDT.map((dt) => {
                                                return (
                                                    <>
                                                        <li>
                                                            <Link
                                                                to={`/danh-muc/${
                                                                    dt.id_danh_muc
                                                                    }/${pathSplitting(dt.ten)}`}
                                                            >
                                                                {dt.ten}
                                                            </Link>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className="col-4">
                                        <img
                                            src={process.env.PUBLIC_URL + '/tech.png'}
                                            alt="pic"
                                            width="300"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown show">
                            <div
                                class="nav-link text-left dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src="/user.png"
                                    alt="accountIMG"
                                    class="rounded-circle"
                                    width="40"
                                />
                            </div>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link class="dropdown-item" to="/nguoi-dung/thong-tin">
                                    <i class="fa fa-user"></i> T.T Bản Thân
                                </Link>
                                <Link class="dropdown-item" to="/nguoi-dung/yeu-thich">
                                    <i class="fa fa-heart"></i> Danh Mục Yêu Thích
                                </Link>
                                <Link class="dropdown-item" to="/nguoi-dung/lich-su-dau-gia">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i> Lịch Sử
                                    đấu giá
                                </Link>
                                {/* <Link class="dropdown-item">
                  <i class="fa fa-lock" aria-hidden="true"></i> Thay Đổi Mật
                  Khẩu
                </Link>
                <Link class="dropdown-item">
                  <i class="fa fa-exclamation-triangle"></i> Phản Hồi Lỗi
                </Link> */}
                                <div class="dropdown-divider"></div>
                                <Link class="dropdown-item text-danger">
                                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    Đăng Xuất
                                </Link>
                            </div>
                        </div>
                    </li>
                </div>
            </Nav>
        </div>
    );
};

export default Menu;
