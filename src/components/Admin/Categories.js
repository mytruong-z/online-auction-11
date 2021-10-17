import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Header from './partials/header';
import CategoryTable from "./Category/CategoryTable";

function Users () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <Header title={'Quản lý danh mục'} hideSearch={true}/>
            <div className="container py-4 px-0">
                <CategoryTable userData={data}/>
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
