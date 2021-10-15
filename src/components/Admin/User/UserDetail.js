import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Header from "../partials/header";
import {FaArrowLeft} from "react-icons/fa";

const User = (props) => {
    const {match} = props;
    const id = match.params.id;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {

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
            <div className="mt-4">
                <div className="text-end pb-2">
                    <a href="/admin/users" className="btn btn-sm btn-outline-dark"><FaArrowLeft/> Trở về</a>
                </div>
                { loading ?
                    <Card>
                        <Card.Header as="h5">
                            {data.role === 1 ? <Badge bg="dark">Admin</Badge> : <Badge bg="secondary">User</Badge>} <strong>{data.name}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>ID: {data.Id}</Card.Title>
                            <Card.Text>
                                <span className="bold w-150px d-block d-sm-inline-block">Email:</span> {data.email} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Số điện thoại:</span> {data.phone} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Ngày tạo tài khoản:</span> {(new Date(data.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)} <br/>
                                { data.activate_status ?
                                    <>
                                        <span className="bold w-150px d-block d-sm-inline-block">Ngày hết hạn:</span> {data.expired_date} <br/>
                                    </> : ''
                                }
                                <span className="bold w-150px d-block d-sm-inline-block">Trạng thái:</span> {data.activate_status ? <Badge bg="success">Đã kích hoạt</Badge> : <Badge bg="secondary">Chưa kích hoạt</Badge>} <br/>
                                <span className="bold w-150px d-block d-sm-inline-block">Mã thẻ:</span> {data.cardId} <br/>
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