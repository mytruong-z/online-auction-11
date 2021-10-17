import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Badge } from 'react-bootstrap';
import Header from './partials/header';
import UserTable from './User/UserTable';

function Users () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(async () => {

    }, []);

    useEffect(async () => {
        if (data.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data]);

    return (
        <>
            <Header title={'Quản lý người dùng'} hideSearch={true}/>
            <div className="container py-4 px-0">
                <UserTable userData={data}/>
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
