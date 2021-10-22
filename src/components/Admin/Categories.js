import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from './partials/header';
import CategoryTable from "./Category/CategoryTable";
import axios from "axios";
import {API_URL} from "../../config";
import {FaPlus} from "react-icons/fa";

function Users () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(async () => {
        if(!loading) {
            if (localStorage.user) {
                let user = JSON.parse(localStorage.user);
                setToken(user.token);
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
                                "level": val.cap_danh_muc,
                                "actions": <div>
                                    <button onClick={() => updateCategory(val.id_danh_muc)} className="btn btn-sm btn-info text-white mt-1">Cập nhật</button>
                                    <button onClick={() => deleteCategory(val.id_danh_muc)} className="btn btn-sm btn-danger mx-1 mt-1">Delete</button>
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
        console.log('delete:' + categoryId);
    }

    const updateCategory = (categoryId) => {
        console.log('update:' + categoryId);
    }

    return (
        <>
            <Header title={'Quản lý danh mục'} hideSearch={true}/>
            <div className="container py-4 px-0">
                <div className="px-3">
                    <button className="btn btn-sm btn-outline-danger"><FaPlus /> Thêm mới</button>
                </div>
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
