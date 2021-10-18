import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Form, Row, Col } from 'react-bootstrap';
import './seller.css';
import { API_URL, CLOUDINARY_URL } from '../../config';
import { DataGrid } from '@material-ui/data-grid';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

function Product () {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showPostDetails, setShowPostDetails] = useState(false);
    const [showImagesDetails, setShowImagesDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    const [showDeleteProductConfirm, setShowDeleteProductConfirm] = useState(false);

    const [details, setDetails] = useState(null);
    const [postDetails, setPostDetails] = useState({
        title: '',
        description: '',
        productID: 0,
        status: 1
    });
    const [images, setImages] = useState(null);
    const [imagesFormData, setImagesFormData] = useState(null);
    const [hostId, setHostId] = useState(0);
    const [deletingProductID, setDeletingProductID] = useState(null);

    const [formData, setFormData] = useState({
        ten_san_pham: '',
        gia_dat: 0,
        gia_mua_ngay: 0,
        buoc_gia: 0,
        addition_infor: '',
        city: '',
        hostID: 0
    });

    const [showFormErrorMessage, setFormErrorMessage] = useState({
        ten_san_pham: false,
        gia_dat: false,
        gia_mua_ngay: false,
        buoc_gia: false,
        addition_infor: false,
        city: false
    });

    const [formUpdateProductData, setFormUpdateProductData] = useState({
        id: 0,
        ten_san_pham: '',
        gia_dat: 0,
        gia_mua_ngay: 0,
        buoc_gia: 0,
        addition_infor: '',
        city: ''
    });

    const [showFormUpdateProductErrorMessage, setFormUpdateProductErrorMessage] = useState({
        ten_san_pham: false,
        gia_dat: false,
        gia_mua_ngay: false,
        buoc_gia: false,
        addition_infor: false
    });
    const imageBaseUrl = `${CLOUDINARY_URL}/product/`;

    useEffect(() => {
        // get host id
        setHostId(JSON.parse(localStorage.getItem('user')).id);
    }, []);

    const getProducts = (hostId) => {
        axios(
            `${API_URL}product/search/${hostId}`, //tìm sản phẩm theo host
        ).then((res) => {
            if (Array.isArray(res.data)) {
                console.log(res);
                setData(res.data);
            } else {
                setData([]);
            }
        });
    };

    useEffect(() => {
        if (hostId != 0) {
            getProducts(hostId);
            // update hostid in form data
            setFormData({
                ...formData,
                hostID: hostId
            });
        }
    }, [hostId]);

    const handleImageSelectorOnChange = (e) => {
        var files = e.target.files;
        var formData = imagesFormData;
        if (!formData) {
            formData = new FormData();
        }
        formData.delete('productID');
        formData.append('productID', images.productID);
        for (var i = 0; i < files.length; i++) {
            formData.append(`images`, files[i]);
        }
        setImagesFormData(formData);
    };

    const onDeleteImages = (index) => {
        images.image.splice(index, 1);
        var newImagesData = {};
        newImagesData.image = images.image;
        newImagesData.productID = images.productID;
        setImages(newImagesData);
        var formData = imagesFormData;
        if (!formData) {
            formData = new FormData();
        }
        var listImages = '';
        newImagesData.image.map(item => {
            listImages = listImages + ',' + item.name;
        });
        formData.delete('updatedImages');
        formData.delete('productID');
        formData.append('productID', newImagesData.productID);
        formData.append('updatedImages', listImages.substring(1));
        setImagesFormData(formData);
    };

    const handleSubmitImages = async () => {
        if (imagesFormData) {
            await axios({
                method: 'POST',
                url: `${API_URL}/product/uploadImage`,
                data: imagesFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowImagesDetails(false);
            // alert.success("");
            alert('Lưu ảnh thành công');
            getProducts(hostId);
        } else {
            setShowImagesDetails(false);
            alert('Lưu ảnh không thành công, vui lòng thử lại');
        }
        setImagesFormData(null);
    };

    const submitProduct = async () => {
        await setFormErrorMessage({
            ten_san_pham: (formData.ten_san_pham == '') ? true : false,
            gia_dat: (formData.gia_dat == '') ? true : false,
            gia_mua_ngay: (formData.gia_mua_ngay == '') ? true : false,
            buoc_gia: (formData.buoc_gia == '') ? true : false,
            addition_infor: (formData.addition_infor == '') ? true : false,
            city: (formData.city == '') ? true : false,
        });

        for (var i in formData) {
            if (formData[i] === '' || formData[i] === 0) {
                return;
            }
        }

        axios.post(`${API_URL}/api/nguoi-ban/them-san-pham`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                setShowNew(false);
                getProducts(hostId);
                alert('Thêm sản phẩm thành công');
            })
            .catch(function (error) {
                // alert.error(error);
                alert('Thêm sản phẩm không thành công');
            });
    };

    const submitUpdateProduct = async () => {
        await setFormUpdateProductErrorMessage({
            ten_san_pham: (formUpdateProductData.ten_san_pham == '') ? true : false,
            gia_dat: (formUpdateProductData.gia_dat == '') ? true : false,
            gia_mua_ngay: (formUpdateProductData.gia_mua_ngay == '') ? true : false,
            buoc_gia: (formUpdateProductData.buoc_gia == '') ? true : false,
            addition_infor: (formUpdateProductData.addition_infor == '') ? true : false,
        });

        console.log(formUpdateProductData);

        for (var i in formUpdateProductData) {
            if (formUpdateProductData[i] === '' || formUpdateProductData[i] === 0) {
                console.log(i);
                console.log(formUpdateProductData[i]);
                return;
            }
        }

        axios.post(`${API_URL}/api/nguoi-ban/sua-san-pham`, formUpdateProductData, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function (response) {
                setShowUpdateProduct(false);
                getProducts(hostId);
                alert('Sửa sản phẩm thành công');
            })
            .catch(function (error) {
                // alert.error("Sửa không thành công");
                setShowUpdateProduct(false);
                alert('Sửa không thành công');
            }).finally(() => {
            setShowUpdateProduct(false);
        });
    };

    const setFormErrorMessageToFalse = () => {
        setFormUpdateProductErrorMessage({
            ten_san_pham: false,
            gia_dat: false,
            gia_mua_ngay: false,
            buoc_gia: false,
            addition_infor: false,
            city: false
        });
    };

    const setFormUpdateProductErrorMessageToFalse = () => {
        setFormUpdateProductErrorMessage({
            ten_san_pham: false,
            gia_dat: false,
            gia_mua_ngay: false,
            buoc_gia: false,
            addition_infor: false
        });
    };

    const onShowDetails = (item) => {
        setShowDetails(true);
        setDetails(item);
    };

    const onShowUpdateProduct = (item) => {
        var dataCopied = {
            ...formUpdateProductData,
            'ten_san_pham': item.ten_san_pham,
            'id': item.id,
            'gia_dat': item.gia_dat,
            'gia_mua_ngay': item.gia_mua_ngay,
            'buoc_gia': item.buoc_gia,
            'addition_infor': item.addition_infor,
            'city': item.city
        };

        console.log('update product data: ', dataCopied);

        setFormUpdateProductData(dataCopied);
        setShowUpdateProduct(true);
    };

    const onShowDeleteProductConfirm = (data) => {
        console.log(data);
        setDeletingProductID(data?.id);
        setShowDeleteProductConfirm(true);
    };

    const onDeleteProduct = async () => {
        if (deletingProductID != null) {
            await axios.delete(
                `${API_URL}/api/nguoi-ban/xoa-san-pham/${deletingProductID}`,
            ).then((res) => {
                alert('Xóa sản phẩm thành công');
                setShowDeleteProductConfirm(false);
            }).catch((e) => {
                alert('Xóa sản phẩm không thành công');
                setShowDeleteProductConfirm(false);
            });

            getProducts(hostId);
        }
    };

    const onShowPostDetails = (item) => {
        setShowPostDetails(true);
        var newPostUpdate = postDetails;

        if (item?.post?.length > 0) {
            newPostUpdate = {
                title: item?.post[0]?.title,
                description: item?.post[0]?.description,
            };
        }

        newPostUpdate.productID = item.id;
        newPostUpdate.status = 1;
        console.log('post update: ', newPostUpdate);
        setPostDetails(newPostUpdate);
    };

    const onUpdatePost = async () => {
        console.log(postDetails);

        if (postDetails.title == '' && postDetails.description == '') {
            return;
        }

        await axios.post(`${API_URL}post/add`, postDetails, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function (response) {
                getProducts(hostId);
                alert('Sửa bài đăng thành công');
            })
            .catch(function (error) {
                alert('Sửa bài đăng không thành công');
            });

        setShowPostDetails(false);

        setPostDetails({
            title: '',
            description: '',
            productID: 0,
            status: 1
        });
    };

    const onShowImagesDetails = (item) => {
        setShowImagesDetails(true);

        const imagesData = {
            image: item.image,
            productID: item.id
        };

        setImages(imagesData);
    };

    const hideImagesDetailsModal = () => {
        setImagesFormData(null);
        setShowImagesDetails(false);
    };

    const onShowNew = (item) => {
        setShowNew(true);
    };

    const hideDetailsModal = () => {
        setShowDetails(false);
    };

    const hidePostDetailsModal = () => {
        setShowPostDetails(false);
    };

    const hideNewModal = () => {
        setShowNew(false);
    };

    const hideUpdateProduct = () => {
        setShowUpdateProduct(false);
    };

    const hideDeleteProductConfirm = () => {
        setShowDeleteProductConfirm(false);
    };

    const columns = [
        {field: 'id', headerName: 'ID'},
        {
            field: 'post',
            headerName: 'Bài đăng',
            editable: false,
            sortable: false,
            width: 120,
            renderCell: (params) => (
                <strong>
                    <a className="m-1" onClick={(e) => onShowPostDetails(params.value)}>Xem chi tiết</a>
                </strong>
            ),
        },
        {
            field: 'post_status',
            headerName: 'Trạng thái',
            editable: false,
            sortable: true,
            width: 200,
            renderCell: (params) => (
                <strong>
                    {params.value?.status?.name == 'active' ?
                        <Tooltip title="Đã duyệt" aria-label="add">
                            <DoneOutlineIcon style={{fill: 'green'}}/>
                        </Tooltip>
                        :
                        <Tooltip title="Chưa duyệt" aria-label="add">
                            <DoneOutlineIcon/>
                        </Tooltip>
                    }
                </strong>
            ),
        },
        {
            field: 'image',
            headerName: 'Hình ảnh',
            editable: false,
            sortable: true,
            width: 150,
            renderCell: (params) => {
                const imageUrl = (params?.value?.image?.length > 0) ? `${imageBaseUrl}${params?.value?.image[0]?.name}` : '/assets/images/products/no-img.png';
                return <Tooltip title="Click để xem" aria-label="add">
                    <img onClick={(e) => onShowImagesDetails(params.value)} className="room-image mw-100" src={imageUrl}
                         alt=""/>
                </Tooltip>;

            },
        },
        {
            field: 'ten_san_pham',
            headerName: 'Tên Sản Phẩm',
            editable: false,
            width: 200
        },
        {
            field: 'gia_dat',
            headerName: 'Giá Đặt',
            editable: false,
            width: 200
        },
        {
            field: 'gia_mua_ngay',
            headerName: 'Giá Mua Ngay',
            editable: false,
            width: 200
        },
        {
            field: 'buoc_gia',
            headerName: 'Bước Giá',
            editable: false,
            width: 200
        },
        {
            field: 'addition_infor',
            headerName: 'Khác',
            editable: false,
            width: 200
        },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            option: false,
            renderCell: (params) => (
                <strong>
                    <button className="btn btn-sm btn-primary m-1" onClick={(e) => onShowDetails(params.value)}>Chi
                        tiết
                    </button>
                    <button className="btn btn-sm btn-secondary m-1"
                            onClick={(e) => onShowUpdateProduct(params.value)}>Chỉnh sửa
                    </button>
                    <button className="btn btn-sm btn-danger m-1"
                            onClick={(e) => onShowDeleteProductConfirm(params.value)}>Xóa
                    </button>
                </strong>
            ),
            width: 300
        }
    ];

    useEffect(() => {
        var renderRows = [];
        if (data) {
            data.map((item, index) => {
                renderRows.push({
                    id: index + 1,
                    ten_san_pham: item?.ten_san_pham,
                    gia_dat: item?.gia_dat,
                    gia_mua_ngay: item?.gia_mua_ngay,
                    buoc_gia: item?.buoc_gia,
                    addition_infor: item?.addition_infor,
                    action: item,
                    post: item,
                    post_status: item?.post[0],
                    image: item
                });
            });

            setRows(renderRows);
        }
    }, [data]);

    return (
        <div className="wrapper m-auto pt-3 room-container">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="bold">Danh sách sản phẩm</div>
                    <button onClick={onShowNew} className="btn btn-sm btn-success">Thêm</button>
                </Card.Header>
                <Card.Body>
                    <div style={{height: '650px', width: '100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                        />
                    </div>
                </Card.Body>
            </Card>

            <Modal
                className="details_modal"
                show={showDetails}
                onHide={hideDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control disabled type="text" value={details?.ten_san_pham}/>
                        </Form.Group>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Tỉnh thành</Form.Label>
                                <Form.Control disabled type="text" value={details?.city}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Giá Đặt</Form.Label>
                                <Form.Control disabled type="text" value={details?.gia_dat}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Giá Mua Ngay</Form.Label>
                                <Form.Control disabled type="text" value={details?.gia_mua_ngay}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Giá Mua Ngay</Form.Label>
                                <Form.Control disabled type="text" value={details?.buoc_gia}/>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Chi tiết</Form.Label>
                            <Form.Control disabled as="textarea" rows={8} value={details?.addition_infor}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideDetailsModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="post_details_modal"
                show={showPostDetails}
                onHide={hidePostDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" value={postDetails?.title}
                                          onChange={(e) => setPostDetails({...postDetails, title: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Chi tiết</Form.Label>
                            <Form.Control as="textarea" rows={8} value={postDetails?.description}
                                          onChange={(e) => setPostDetails({
                                              ...postDetails,
                                              description: e.target.value
                                          })}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hidePostDetailsModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={onUpdatePost}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="delete_room_confirm_model"
                show={showDeleteProductConfirm}
                onHide={hideDeleteProductConfirm}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có chắc muốn xóa bài đăng này</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideDeleteProductConfirm}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={onDeleteProduct}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="images_details_modal"
                show={showImagesDetails}
                onHide={hideImagesDetailsModal}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hình ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <div className="images-container">
                                {images?.image?.map((item, index) => {
                                    return <div key={index} className="image-container">
                                        <CloseIcon onClick={(e) => onDeleteImages(index)} className="delete_image_icon"
                                                   style={{fill: 'white'}}/>
                                        <img key={index} className="room-image-detail"
                                             src={`${imageBaseUrl}${item?.name}`} alt=""/>
                                    </div>;
                                })}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Chọn hình ảnh</Form.Label>
                            <Form.Control type="file" multiple onChange={(e) => handleImageSelectorOnChange(e)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideImagesDetailsModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmitImages}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="new_modal"
                show={showNew}
                onHide={hideNewModal}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlid="">
                        <Form.Label>Tên Sản Phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Nhập Tên Sản Phẩm" onChange={(e) => {
                            setFormData({...formData, ten_san_pham: e.target.value});
                            setFormErrorMessageToFalse();
                        }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormErrorMessage.ten_san_pham ? 'block' : 'none'}}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá Đặt</Form.Label>
                            <Form.Control type="number" placeholder="Nhập giá đặt" onChange={(e) => {
                                setFormData({...formData, gia_dat: parseInt(e.target.value)});
                                setFormErrorMessageToFalse();
                            }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormErrorMessage.gia_dat ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá Mua Ngay</Form.Label>
                            <Form.Control type="number" placeholder="Nhập giá mua ngay" onChange={(e) => {
                                setFormData({...formData, gia_mua_ngay: parseInt(e.target.value)});
                                setFormErrorMessageToFalse();
                            }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormErrorMessage.gia_mua_ngay ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Bước Giá</Form.Label>
                            <Form.Control type="number" placeholder="Nhập bước giá" onChange={(e) => {
                                setFormData({...formData, buoc_gia: parseInt(e.target.value)});
                                setFormErrorMessageToFalse();
                            }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormErrorMessage.buoc_gia ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlid="">
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập mô tả" onChange={(e) => {
                            setFormData({...formData, addition_infor: e.target.value});
                            setFormErrorMessageToFalse();
                        }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormErrorMessage.addition_infor ? 'block' : 'none'}}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideNewModal}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitProduct}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="new_modal"
                show={showUpdateProduct}
                onHide={hideUpdateProduct}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlid="">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" value={formUpdateProductData?.ten_san_pham}
                                      onChange={(e) => {
                                          setFormUpdateProductData({
                                              ...formUpdateProductData,
                                              ten_san_pham: e.target.value
                                          });
                                          setFormErrorMessageToFalse();
                                      }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormUpdateProductErrorMessage.ten_san_pham ? 'block' : 'none'}}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá Đặt</Form.Label>
                            <Form.Control type="number" placeholder="Nhập giá đặt"
                                          value={formUpdateProductData?.gia_dat}
                                          onChange={(e) => {
                                              setFormUpdateProductData({
                                                  ...formUpdateProductData,
                                                  gia_dat: parseInt(e.target.value)
                                              });
                                              setFormUpdateProductErrorMessageToFalse();
                                          }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormUpdateProductErrorMessage.gia_dat ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá Mua Ngay</Form.Label>
                            <Form.Control type="number" placeholder="Nhập Giá Mua Ngay"
                                          value={formUpdateProductData?.gia_mua_ngay}
                                          onChange={(e) => {
                                              setFormUpdateProductData({
                                                  ...formUpdateProductData,
                                                  gia_mua_ngay: parseInt(e.target.value)
                                              });
                                              setFormUpdateProductErrorMessageToFalse();
                                          }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormUpdateProductErrorMessage.gia_mua_ngay ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>

                        <Col className="mb-3" controlid="">
                            <Form.Label>Bước Giá</Form.Label>
                            <Form.Control type="number" placeholder="Nhập bước giá"
                                          value={formUpdateProductData?.buoc_gia}
                                          onChange={(e) => {
                                              setFormUpdateProductData({
                                                  ...formUpdateProductData,
                                                  buoc_gia: parseInt(e.target.value)
                                              });
                                              setFormUpdateProductErrorMessageToFalse();
                                          }}/>
                            <Form.Text className="text-muted text-danger"
                                       style={{display: showFormUpdateProductErrorMessage.buoc_gia ? 'block' : 'none'}}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác"
                                      value={formUpdateProductData?.addition_infor} onChange={(e) => {
                            setFormUpdateProductData({...formUpdateProductData, addition_infor: e.target.value});
                            setFormUpdateProductErrorMessageToFalse();
                        }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormUpdateProductErrorMessage.addition_infor ? 'block' : 'none'}}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideUpdateProduct}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitUpdateProduct}>
                        Sửa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Product;