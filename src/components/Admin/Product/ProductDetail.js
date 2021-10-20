import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import {Badge, Image} from 'react-bootstrap';
import Header from "../partials/header";
import {API_URL, CLOUDINARY_URL} from "../../../config";
import NumberFormat from "react-number-format";
import axios from "axios";
import {FaArrowLeft} from "react-icons/fa";

const Posts = (props) => {
    const {location} = props;
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const history = useHistory();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {
        if(!loading && id > 0) {
            if (localStorage.user) {
                let user = JSON.parse(localStorage.user);
                setToken(user.token);
                axios
                    .get(`${API_URL}/api/admin/quan-ly-san-pham/get-list-product`, {
                        headers: {
                            'x-access-token': user.token
                        }
                    })
                    .then((res) => {
                        let productItem = res.data.listProduct.filter(val => val.id_sp == id).map((val) => {
                            const createDate = (new Date(val.publish_date)).toLocaleDateString('en-US', DATE_OPTIONS);
                            const endDate = (new Date(val.end_date)).toLocaleDateString('en-US', DATE_OPTIONS);
                            const imgLink = val.anh.length > 0 ? `${CLOUDINARY_URL}/product/${val.anh}` : '/no-img.png';
                            return {
                                "Id": val.id_sp,
                                "image": <img src={imgLink} width="160"/>,
                                "name": val.ten_sp,
                                "oderPrice": <span><NumberFormat value={val.gia_dat} displayType={'text'} thousandSeparator={true} /></span>,
                                "buyPrice": <span><NumberFormat value={val.gia_mua_ngay} displayType={'text'} thousandSeparator={true} /></span>,
                                "price": <span><NumberFormat value={val.gia_hien_tai} displayType={'text'} thousandSeparator={true} /></span>,
                                "priceStep": val.buoc_gia,
                                "email": val.email,
                                "saler": val.ho_ten,
                                "category": val.ten_danh_muc,
                                "start_date": createDate ? createDate : '',
                                "end_date": endDate ? endDate : '',
                                "des": val.mo_ta,
                                "isLocked": val.isLocked,
                            }
                        });
                        setProduct(productItem[0]);
                        setLoading(true);
                    });
            } else {
                history.push('/');
            }
        }
        console.log(product);
    }, []);

    useEffect(async () => {
        if (product != null) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [product])

    return (
        <>
            <Header title={'Chi tiết bài viết'} hideSearch={true}/>
            <div className="mb-4 mx-5">
                <div className="text-end pb-2">
                    <a href="/admin/products" className="btn btn-sm btn-outline-dark"><FaArrowLeft/> Trở về</a>
                </div>
                {
                    loading ?
                        <div className="room-box">
                            <div className="room-box-img">
                                { product.image }
                            </div>
                            <h2>
                                { product.name }
                            </h2>
                            <p>
                                <span className="bold">Giá đặt: </span><span className="text-black">{ product.oderPrice }</span>
                            </p>
                            <p>
                                <span className="bold">Giá mua ngay: </span><span className="text-black">{ product.buyPrice }</span>
                            </p>
                            <p>
                                <span className="bold">Giá hiện tại: </span><span className="text-black">{ product.price }</span>
                            </p>
                            <p>
                                <span className="bold">Bước giá: </span><span className="text-black">{ product.priceStep }</span>
                            </p>
                            <p>
                                <span className="bold">Email: </span><span className="text-black">{ product.email }</span>
                            </p>
                            <p>
                                <span className="bold">Người bán: </span><span className="text-black">{ product.saler }</span>
                            </p>
                            <p>
                                <span className="bold">Danh mục: </span><span className="text-black">{ product.category }</span>
                            </p>
                            <p>
                                <span className="bold">Thời gian mở bán: </span><span className="text-black">{ product.start_date }</span>
                            </p>
                            <p>
                                <span className="bold">Thời gian kết thúc: </span><span className="text-black">{ product.end_date }</span>
                            </p>
                            <p>
                                <span className="bold">Mô tả: </span><span className="text-black">{ product.des }</span>
                            </p>
                            <p>
                                <span className="bold">Tráng thái: </span><span className="text-black">{ product.isLocked }</span>
                            </p>
                        </div>
                        : 'Đang tải dữ liệu...'
                }

            </div>
        </>

    );
};

export default Posts;