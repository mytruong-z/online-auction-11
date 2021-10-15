import React from 'react';
import Header from "../partials/header";

const Bill = (props) => {
    const {match} = props;
    const id = match.params.id;

    return (
        <>
            <Header title={'Chi tiết hoá đơn'} hideSearch={true}/>
            <div>
                Không tìm thấy thông tin.
            </div>
        </>

    );
};

export default Bill;