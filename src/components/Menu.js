import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { pathSplitting } from '../utils/pathSplit';
import { API_URL } from '../config';
//@LoanNgo, You can rely on this variable to check the login status: localStorage;

const Menu = (props) => {
    const [listDMPC, setListDMPC] = useState([]);
    const [listDMDT, setListDMDT] = useState([]);
    const [userLogin, setUserLogin] = useState(null);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        axios
            .get(`${API_URL}/api/danh-muc/danh-sach-danh-muc-theo-cap?cap=0`)
            .then((res) => setListDMDT(res.data));

        axios
            .get(`${API_URL}/api/danh-muc/danh-sach-danh-muc-theo-cap?cap=1`)
            .then((res) => setListDMPC(res.data));

        if (location.state !== undefined) {
            if (location.state.logout !== undefined) setUserLogin(null);
        }

        if (userLogin == null) {
            if (localStorage.getItem('user') != null) {
                setUserLogin(JSON.parse(localStorage.getItem('user')));
            }
        }
    }, [userLogin, localStorage.user]);
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

                    <li key={0} className="my-li align-items-center d-grid nav-item px-2">
                        <Link to="/" className="text-pink">
                            Trang Chủ
                        </Link>
                    </li>

                    <li key={1} className="my-li align-items-center d-grid nav-item">
                        <div className="cate-dropdown ">
                            <span
                                className="nav-link text-left cateBtn"
                                onClick={(e) => history.push('/danh-sach-san-pham')}
                            >
                                Danh Mục
                                <i className="fa fa-caret-down"/>
                            </span>
                            <div className="cate-content">
                                <div className="row">
                                    <div className="col-4">
                                        <h5>Máy Tính</h5>
                                        <ul>
                                            {listDMPC.length !== 0 &&
                                            listDMPC.map((pc, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>
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
                                            listDMDT.map((dt, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>
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


                    {(userLogin) ?
                        <>
                            <li key={0} className="my-li align-items-center d-grid nav-item px-2">
                                <i className="fa fa-bell-o" aria-hidden="true"/>
                            </li>
                            <li key={1}>
                                <div className="dropdown show">
                                    <div
                                        className="nav-link text-left dropdown-toggle"
                                        role="button"
                                        id="dropdownMenuLink"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <img
                                            src="/user.png"
                                            alt="accountIMG"
                                            class="rounded-circle"
                                            width="40"/>
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

                                        {userLogin.user.id_quyen_han === 2 ? <><Link class="dropdown-item"
                                                                                     to="/nguoi-ban/danh-sach-chap-thuan">
                                            <i class="fa fa-list" aria-hidden="true"></i> Danh Sách Chấp Thuận
                                        </Link>
                                            <Link class="dropdown-item" to="/nguoi-ban/don-hang">
                                                <i class="fa fa-paragraph" aria-hidden="true"></i> Quản Lí Đơn Hàng
                                            </Link>
                                        </> : ''}
                                        <Link class="dropdown-item" to="/nguoi-dung/doi-mat-khau">
                                            <i class="fa fa-unlock" aria-hidden="true"></i> Đổi Mật Khẩu
                                        </Link>
                                        <div class="dropdown-divider"></div>
                                        <Link class="dropdown-item text-danger" onClick={e => {
                                            e.preventDefault();
                                            setUserLogin(null);
                                            localStorage.removeItem('user');
                                            history.push('/');
                                        }}>
                                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                                            Đăng Xuất
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </> : <>
                            <li key={2} className="my-li align-items-center d-grid nav-item px-2">
                                <Link to="/login" className="text-pink">
                                    Đăng Nhập
                                </Link>
                            </li>
                            <li key={3} className="my-li align-items-center d-grid nav-item px-2">
                                <Link to="/register" className="text-pink">
                                    Đăng Ký
                                </Link>
                            </li>
                        </>}


                </div>
            </Nav>
        </div>
    );
};

export default Menu;
