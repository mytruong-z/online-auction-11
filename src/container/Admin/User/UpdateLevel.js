import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../../config";
import { BsChevronDoubleUp } from "react-icons/bs";

export function UpdateLevel({ data, onUpdatedInfo }) {
    const [dataDetail, setDataDetail] = useState(data);
    const [style, setStyle] = useState({color:'green', display: 'none'});
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [isChange, setChange] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        setValidated(true);
        let userToken = JSON.parse(localStorage.user);
        const user = {
            id_nguoi_dung: data.id_nguoi_dung,
            id_quyen_han: data.id_quyen_han,
        }
        axios.put(`${API_URL}/api/admin/quan-ly-nguoi-dung/update-user-level/`, user, {
            headers: {
                'x-access-token': userToken.token
            },
        })
            .then((res) => {
                if(res.data.success === true){
                    setStyle({color: 'green', display: 'inline'});
                    setMessage(res.data.message);
                    setDataDetail({...dataDetail, ...res.data.user});
                }
                else{
                    setStyle({color: 'red', display: 'inline'});
                    setMessage(res.data.message);
                }
            }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if(show === false){
            onUpdatedInfo(dataDetail);
            setMessage('');
            setStyle({color:'green', display: 'none'});
            setValidated(false);
        }
        else if(show === true){
            setDataDetail(dataDetail);
        }
    },[show, dataDetail]);

    useEffect(() => {
        if(isChange === true){
            setDataDetail(data);
            setChange(false);
        }
        else{
            setChange(true);
        }
    }, [data]);

    return (
        <>
            { dataDetail.id_quyen_han === 2 ?
                <button className="btn btn-sm btn-secondary text-white mt-1 mx-1"><BsChevronDoubleUp/> Nâng cấp</button>
                :
                <button onClick={handleShow} className="btn btn-sm btn-warning text-white mt-1 mx-1"><BsChevronDoubleUp/> Nâng cấp</button>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="col-12">
                        <h4 className="d-flex justify-content-center">Chỉnh sửa thông tin cá nhân</h4>
                        <span className="d-flex justify-content-center" style={{color: style.color, display: style.display}}>{message}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Cấp bậc người dùng</Form.Label>
                            <Form.Select type="text" name="id_quyen_han" placeholder="Cấp danh mục" defaultValue={dataDetail.id_quyen_han} onChange={(ev) => setDataDetail({ ...dataDetail, id_quyen_han: ev.target.value })} required >
                                <option value="1">Level 1</option>
                                <option value="2">Level 2</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Vui lòng chọn cấp bậc
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Cập Nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
