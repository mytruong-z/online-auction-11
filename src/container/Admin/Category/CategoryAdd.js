import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../../config";
import {FaPlus} from "react-icons/fa";

export function ShowModal() {
    const [dataDetail, setDataDetail] = useState({
        id_danh_muc: '',
        ten: '',
        cap_danh_muc: 0,
    });
    const [style, setStyle] = useState({color:'green', display: 'none'});
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = () => {
        setValidated(true);
        let userToken = JSON.parse(localStorage.user);
        const user = {
            ten: dataDetail.ten,
            cap_danh_muc: dataDetail.cap_danh_muc,
        }
        axios.post(`${API_URL}/api/admin/quan-ly-danh-muc/add-category/`, user, {
            headers: {
                'x-access-token': userToken.token
            },
        })
            .then((res) => {
                if(res.data.success === true){
                    setStyle({color: 'green', display: 'inline'});
                    setMessage(res.data.message);
                    setDataDetail({...dataDetail, ...res.data.user});
                    document.getElementById("add-category").reset();
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
            setMessage('');
            setStyle({color:'green', display: 'none'});
            setValidated(false);
        }
        else if(show === true){
            setDataDetail(dataDetail);
        }
    },[show, dataDetail]);

    return (
        <>
            <div className="px-3">
                <button className="btn btn-sm btn-outline-danger" onClick={handleShow}><FaPlus /> Th??m m???i</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="col-12">
                        <h4 className="d-flex justify-content-center">Th??m th??ng tin danh m???c</h4>
                        <span className="d-flex justify-content-center" style={{color: style.color, display: style.display}}>{message}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated} id='add-category'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>T??n danh m???c</Form.Label>
                            <Form.Control type="text" name="ten" placeholder="T??n danh m???c" defaultValue={dataDetail.ten} onChange={(ev) => setDataDetail({ ...dataDetail, ten: ev.target.value })} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p t??n danh m???c
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>C???p danh m???c</Form.Label>
                            <Form.Select type="text" name="cap_danh_muc" placeholder="C???p danh m???c" defaultValue={dataDetail.cap_danh_muc} onChange={(ev) => setDataDetail({ ...dataDetail, cap_danh_muc: ev.target.value })} required >
                                <option value="0">??i???n tho???i</option>
                                <option value="1">M??y t??nh</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p c???p danh m???c
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        ????ng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Th??m
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
