import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Header from './partials/header';
import ProductTable from "./Product/ProductTable";

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
            <Header title={'Quản lý sản phẩm'} hideSearch={true}/>
            <div className="container py-4 px-0">
                <ProductTable userData={data}/>
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
