import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from "./partials/header";
import BillTable from "./Bill/BillTable";
import Alert from "../common/alert";

function ListBills() {
    const [bills, setBills] = useState([]);
    const [noPayment, setNoPayment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingBill, setLoadingBill] = useState(false);

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const billColumn = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Người dùng',
            accessor: 'name',
        },
        {
            Header: 'Pay Id',
            accessor: 'user_pay_id',
        },
        {
            Header: 'Paid Date',
            accessor: 'paid_date',
        },
        {
            Header: 'Dịch vụ',
            accessor: 'sub_name',
        }
    ];

    const paymentColumn = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'ID người dùng',
            accessor: 'userID',
        },
        {
            Header: 'Mã thanh toán',
            accessor: 'unique_key',
        },
        {
            Header: 'Mã gói',
            accessor: 'subscription_id',
        },
        {
            Header: 'Ngày tạo',
            accessor: 'created_at',
        },
        {
            Header: 'Thao tác',
            accessor: 'actions',
        }
    ];

    useEffect(async () => {

    }, []);

    return (
        <>
            <Header title={'Danh sách hoá đơn'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Đã thanh toán</Tab>
                    <Tab>Chưa thanh toán</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-4 px-0">
                        { loadingBill ?
                            <BillTable userData={bills} column={billColumn} />
                            :
                            <div>Không có dữ liệu</div>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-4 px-0">
                        { loading ?
                            <BillTable userData={noPayment} column={paymentColumn} />
                            :
                            <div>Không có dữ liệu</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert = {setAlertStatus}
            />
        </>
    )
};

export default ListBills;