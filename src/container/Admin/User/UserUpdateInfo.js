import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from "axios";
import { API_URL } from "../../../config";
import { BsPencilSquare } from "react-icons/bs";

export function ShowModal({ data, onUpdatedInfo }) {
    const [dataDetail, setDataDetail] = useState(data);
    const [style, setStyle] = useState({color:'green', display: 'none'});
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [isChange, setChange] = useState(true);

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleSubmit = () => {
        setValidated(true);
        let userToken = JSON.parse(localStorage.user);
        const user = {
            id_nguoi_dung: data.id_nguoi_dung,
            ho_ten: dataDetail.ho_ten,
            email: dataDetail.email,
            dia_chi: dataDetail.dia_chi,
            ngay_sinh: dataDetail.ngay_sinh,
        }
        axios.put(`${API_URL}/api/admin/quan-ly-nguoi-dung/update-user-infor/`, user, {
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
            <button onClick={handleShow} className="btn btn-sm btn-info text-white mt-1"><BsPencilSquare/> C???p nh???t</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="col-12">
                        <h4 className="d-flex justify-content-center">Ch???nh s???a th??ng tin c?? nh??n</h4>
                        <span className="d-flex justify-content-center" style={{color: style.color, display: style.display}}>{message}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>H??? T??n</Form.Label>
                            <Form.Control type="text" name="ho_ten" placeholder="H??? T??n" defaultValue={dataDetail.ho_ten} onChange={(ev) => setDataDetail({ ...dataDetail, ho_ten: ev.target.value })} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p h??? t??n
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Ng??y Sinh</Form.Label>
                            <Form.Control type="text" name="ngay_sinh" placeholder="ng??y/th??ng/n??m" defaultValue={dataDetail.ngay_sinh ? (new Date(dataDetail.ngay_sinh)).toLocaleDateString('en-US', DATE_OPTIONS) : ''} onChange={(ev) => setDataDetail({ ...dataDetail, ngay_sinh: ev.target.value })} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p ng??y sinh
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>?????a Ch???</Form.Label>
                            <Form.Control type="text" name="dia_chi" placeholder="?????a Ch???" defaultValue={dataDetail.dia_chi} onChange={(ev) => setDataDetail({ ...dataDetail, dia_chi: ev.target.value })} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p ?????a ch???
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Email" defaultValue={dataDetail.email} onChange={(ev) => setDataDetail({ ...dataDetail, email: ev.target.value })} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p email
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        ????ng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        C???p Nh???t
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
