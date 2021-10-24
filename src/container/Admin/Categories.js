import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from './partials/header';
import CategoryTable from "./Category/CategoryTable";
import axios from "axios";
import {API_URL} from "../../config";
import {FaPlus} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { ShowModal } from "../Admin/Category/CategoryAdd";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

function Users () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        if(!loading) {
            if (localStorage.user) {
                let user = JSON.parse(localStorage.user);
                axios
                    .get(`${API_URL}/api/admin/quan-ly-danh-muc/list-category/`, {
                        headers: {
                            'x-access-token': user.token
                        }
                    })
                    .then((res) => {
                        let listCategories = res.data.listCategory.map((val) => {
                            return {
                                "Id": val.id_danh_muc,
                                "name": val.ten,
                                "level": val.cap_danh_muc === 0 ? 'Điện thoại': 'Máy tính',
                                "actions": <div>
                                    {/*<button onClick={() => updateCategory(val.id_danh_muc)} className="btn btn-sm btn-info text-white mt-1"><BsPencilSquare/> Cập nhật</button>*/}
                                    <button onClick={() => deleteCategory(val.id_danh_muc)} className="btn btn-sm btn-danger mx-1 mt-1"><BsFillTrashFill/> Delete</button>
                                </div>
                            }
                        });
                        setData(listCategories);
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

    const deleteCategory = (categoryId) => {
        confirmAlert({
            title: "Bạn chắc chưa?",
            message: 'Bạn sẽ không hoàn tác lại được thao tác này',
            buttons: [
                {
                    label: "Vâng, Chắc rồi",
                    onClick: () => {
                        let user = JSON.parse(localStorage.user);
                        axios
                            .delete(`${API_URL}/api/admin/quan-ly-danh-muc/delete-category/?id=` + categoryId,{
                                headers: {
                                    "x-access-token": user.token
                                }
                            })
                            .then((res) => {
                                alert(res.data.message);
                                window.location.reload();
                            })
                            .catch((err) => {
                                alert("Có Lỗi Xảy Ra");
                                console.log(err);
                            });
                    }
                },
                {
                    label: "Không, thoát!",
                }
            ]
        });
    }

    const updateCategory = (categoryId) => {
        console.log('update:' + categoryId);
    }

    return (
        <>
            <Header title={'Quản lý danh mục'} hideSearch={true}/>
            <div className="container py-4 px-0 admin-content">
                <ShowModal/>
                {loading ?
                    <CategoryTable userData={data}/>
                    :
                    <div>Loading...</div>
                }
            </div>
        </>
    );
};

export default Users;
