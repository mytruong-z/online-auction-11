import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import {Badge} from 'react-bootstrap';
import Header from './partials/header';
import UserTable from './User/UserTable';
import axios from "axios";
import {API_URL} from "../../config";
import {confirmAlert} from "react-confirm-alert";

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const history = useHistory();

    const DATE_OPTIONS = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    useEffect(async () => {
        if (!loading) {
            if (localStorage.user) {
                let user = JSON.parse(localStorage.user);
                setToken(user.token);
                axios
                    .get(`${API_URL}/api/admin/quan-ly-nguoi-dung/list-user/`, {
                        headers: {
                            'x-access-token': user.token
                        }
                    })
                    .then((res) => {
                        let listUsers = res.data.listUser.filter(val => val.id_quyen_han != 3).map((val) => {
                            const point = Number((val.diem_danhgia_duong / (val.diem_danhgia_duong + val.diem_danhgia_am) * 100).toFixed(2));
                            const createDate = (new Date(val.expired)).toLocaleDateString('en-US', DATE_OPTIONS);
                            return {
                                "Id": val.id_nguoi_dung,
                                "name": val.ho_ten,
                                "email": val.email,
                                "point": point ? point : <Badge bg="secondary">Không khả dụng</Badge>,
                                "expired": createDate ? createDate : <Badge bg="secondary">Không khả dụng</Badge>,
                                "actions": <div>
                                    <a href={`/admin/user/${val.id_nguoi_dung}`} className="btn btn-sm btn-dark">Chi
                                        tiết</a>
                                    <button onClick={() => deleteUser(val.id_nguoi_dung)}
                                            className="btn btn-sm btn-danger mx-1">Delete
                                    </button>
                                </div>
                            }
                        });
                        setData(listUsers);
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

    const deleteUser = (userId) => {
        confirmAlert({
            title: "Bạn chắc chưa?",
            message: 'Bạn sẽ không hoàn tác lại được thao tác này',
            buttons: [
                {
                    label: "Vâng, Chắc rồi",
                    onClick: () => {
                        let user = JSON.parse(localStorage.user);
                        axios
                            .delete(`${API_URL}/api/admin/quan-ly-nguoi-dung/delete-user/?id_nguoi_dung=` + userId,{
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

    return (
        <>
            <Header title={'Quản lý người dùng'} hideSearch={true}/>
            <div className="container py-4 px-0">
                {loading ?
                    <UserTable userData={data}/>
                    :
                    <div>Loading...</div>
                }
            </div>
        </>
    );
};

export default Users;
