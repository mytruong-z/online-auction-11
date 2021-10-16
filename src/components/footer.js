import React, { Component } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiOutlineMail, AiFillPhone } from 'react-icons/ai';

class Footer extends Component {
    render () {
        return (
            <div className="container-fluid pb-0 mb-0 justify-content-center text-light bg-dark">
                <footer>
                    <div className="row mt-5 justify-content-center py-5">
                        <div className="col-11">
                            <div className="row ">
                                <div className="col-lg-4 col-12 my-auto mx-auto a">
                                    <h3 className="text-muted mb-md-0 mb-5 bold-text">Online Auction</h3>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <h6 className="mb-3 mb-lg-4 bold-text text-muted"><b>MENU</b></h6>
                                    <ul className="list-unstyled">
                                        <li key={0} className="pb-1"><a href="/" className="text-decoration-none text-white">Trang
                                            Chủ</a></li>
                                        <li key={1} className="pb-1"><a href="/login"
                                                                className="text-decoration-none text-white">Đăng
                                            Nhập</a></li>
                                        <li key={2} className="pb-1"><a href="/register"
                                                                className="text-decoration-none text-white">Đăng ký</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ĐỊA CHỈ</b></h6>
                                    <p className="mb-1">227 Đ. Nguyễn Văn Cừ, Phường 4</p>
                                    <p>Quận 5, Thành phố Hồ Chí Minh</p>
                                </div>
                            </div>
                            <div className="row ">
                                <div
                                    className="col-lg-4 col-12 my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                    <p className="social text-muted mb-0 pb-0 bold-text">
                                        <span className="mx-2">
                                            <AiFillFacebook/>
                                        </span>
                                        <span className="mx-2">
                                            <AiFillInstagram/>
                                        </span>
                                        <span className="mx-2">
                                            <AiFillTwitterSquare/>
                                        </span>
                                    </p>
                                    <small className="rights"><span>&#174;</span> HCMUS Students All Rights Reserved.
                                    </small>
                                </div>
                                <div className="col-lg-4 col-12 order-1 align-self-end ">
                                    <h6 className="mt-55 mt-2 text-muted bold-text"><b>HỖ TRỢ</b></h6>
                                    <small>
                                        <span><AiOutlineMail/></span> contact@student.hcmus.edu.vn
                                    </small>
                                </div>
                                <div className="col-lg-4 col-12 order-2 align-self-end mt-3 ">
                                    <h6 className="text-muted bold-text"><b>HOTLINE</b></h6>
                                    <small>
                                        <span><AiFillPhone/></span> +89 123 4567 321
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
};

export default Footer;