import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from './partials/header';
import ProductTable from "./Product/ProductTable";
import axios from "axios";
import {API_URL, CLOUDINARY_URL} from "../../config";
import NumberFormat from "react-number-format";
import { confirmAlert } from "react-confirm-alert";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";

function Users () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const history = useHistory();

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {
        if(!loading) {
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
                        let listProducts = res.data.listProduct.map((val) => {
                            const createDate = (new Date(val.publish_date)).toLocaleDateString('en-US', DATE_OPTIONS);
                            const endDate = (new Date(val.end_date)).toLocaleDateString('en-US', DATE_OPTIONS);
                            const imgLink = val.anh.length > 0 ? `${CLOUDINARY_URL}/product/${val.anh}` : '/no-img.png';
                            return {
                                "Id": val.id_sp,
                                "image": <img src={imgLink} width="160"/>,
                                "name": val.ten_sp,
                                "price": <span><NumberFormat value={val.gia_hien_tai} displayType={'text'} thousandSeparator={true} /></span>,
                                "saler": val.ho_ten,
                                "category": val.ten_danh_muc,
                                "start_date": createDate ? createDate : '',
                                "end_date": endDate ? endDate : '',
                                "actions": <div>
                                    <a href={`/admin/product/${val.id_sp}`} className="btn btn-sm btn-outline-dark mt-1 mw-70px"><BsFillEyeFill/> Chi ti???t</a>
                                    <button onClick={() => deleteProduct(val.id_sp)} className="btn btn-sm btn-danger mt-1 mw-70px"><BsFillTrashFill/> Delete</button>
                                </div>
                            }
                        });
                        setData(listProducts);
                        setLoading(true);
                    });
            } else {
                history.push('/');
            }
        }
    }, []);

    useEffect(async () => {
        if (data.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data]);

    const deleteProduct = (productId) => {
        confirmAlert({
            title: "B???n ch???c ch??a?",
            message: 'B???n s??? kh??ng ho??n t??c l???i ???????c thao t??c n??y',
            buttons: [
                {
                    label: "V??ng, Ch???c r???i",
                    onClick: () => {
                        let user = JSON.parse(localStorage.user);
                        axios
                            .delete(`${API_URL}/api/admin/quan-ly-san-pham/delete-product/?id_sp=` + productId,{
                                headers: {
                                    "x-access-token": user.token
                                }
                            })
                            .then((res) => {
                                alert(res.data.message);
                                window.location.reload();
                            })
                            .catch((err) => {
                                alert("C?? L???i X???y Ra");
                                console.log(err);
                            });
                    }
                },
                {
                    label: "Kh??ng, tho??t!",
                }
            ]
        });
    }

    return (
        <>
            <Header title={'Qu???n l?? s???n ph???m'} hideSearch={true}/>
            <div className="container py-4 px-0 admin-content">
                {loading ?
                    <ProductTable userData={data}/>
                    :
                    <div>Loading...</div>
                }
            </div>
        </>
    );
};

export default Users;
