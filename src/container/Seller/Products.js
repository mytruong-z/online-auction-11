import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Form, Row, Col } from 'react-bootstrap';
import './seller.css';
import { useHistory } from 'react-router';
import { API_URL, CLOUDINARY_URL } from '../../config';
import { DataGrid } from '@material-ui/data-grid';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Product () {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showPostDetails, setShowPostDetails] = useState(false);
    const [showImagesDetails, setShowImagesDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    const [showDeleteProductConfirm, setShowDeleteProductConfirm] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [chooseCategory, setChooseCategory] = useState('');
    const history = useHistory();

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
    const [hostToken, setHostToken] = useState('');
    const [deletingProductID, setDeletingProductID] = useState(null);

    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const sDataDef = `${dateObj.getFullYear()}-${month}-${day}`;

    const [formData, setFormData] = useState({
        ten: '',
        gia_dat: 0,
        gia_mua_ngay: 0,
        buoc_gia: 0,
        mo_ta: '',
        id_danh_muc: 1,
        end_date: sDataDef,
        images: '',
        hostID: 0
    });

    const [showFormErrorMessage, setFormErrorMessage] = useState({
        ten: false,
        gia_dat: false,
        gia_mua_ngay: false,
        buoc_gia: false,
        mo_ta: false,
        id_danh_muc: false,
        end_date: false,
        images: false
    });

    const [formUpdateProductData, setFormUpdateProductData] = useState({
        id: 0,
        ten: '',
        gia_dat: 0,
        gia_mua_ngay: 0,
        buoc_gia: 0,
        mo_ta: '',
        id_danh_muc: '',
        end_date: '',
        images: ''
    });

    const [showFormUpdateProductErrorMessage, setFormUpdateProductErrorMessage] = useState({
        ten: false,
        gia_dat: false,
        gia_mua_ngay: false,
        buoc_gia: false,
        end_date: false,
        id_danh_muc: false,
        mo_ta: false
    });
    const imageBaseUrl = `${CLOUDINARY_URL}/product/`;

    useEffect(() => {
        // get host id
        const userId = JSON.parse(localStorage.getItem('user')).user.id_nguoi_dung;
        const userToken = JSON.parse(localStorage.getItem('user')).token;
        if (userId >= 0 && userToken !== '') {
            setHostId(userId);
            setHostToken(userToken);
        } else {
            history.push('/');
        }
    }, []);

    const getProducts = (hostId) => {
        axios(
            `${API_URL}/product/search/${hostId}`, //tìm sản phẩm theo host
        ).then((res) => {
            if (Array.isArray(res.data)) {
                setData(res.data);
            } else {
                setData([]);
            }
        });
    };

    const getCategories = () => {
        axios(
            `${API_URL}/api/danh-muc/danh-sach-danh-muc`, //tìm sản phẩm theo host
        ).then((res) => {
            if (Array.isArray(res.data)) {
                setCategories(res.data);
            }
        });
    };

    useEffect(() => {
        if (hostId !== 0) {
            getProducts(hostId);
            getCategories();
            // update hostid in form data
            setFormData({
                ...formData,
                hostID: hostId
            });
        }
    }, [hostId]);

    const handleImageSelectorOnChange = (e) => {
        var files = e.target.files;
        //console.log(files);
        setImagesFormData(files);
        setFormData({...formData, images: files});
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

    const submitProduct = () => {
        setFormErrorMessage({
            ten: (formData.ten == '') ? true : false,
            gia_dat: (formData.gia_dat == '') ? true : false,
            gia_mua_ngay: (formData.gia_mua_ngay == '') ? true : false,
            buoc_gia: (formData.buoc_gia == '') ? true : false,
            mo_ta: (formData.mo_ta == '') ? true : false,
            id_danh_muc: (formData.id_danh_muc == '') ? true : false,
            end_date: (formData.end_date == '') ? true : false,
            images: (formData.images == '') ? true : false,
        });

        for (var i in formData) {
            if (formData[i] === '' || formData[i] === 0) {
                return;
            }
        }

        axios.post(`${API_URL}/api/nguoi-ban/them-san-pham`, formData, {
            headers: {
                'x-access-token': hostToken
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
            ten: (formUpdateProductData.ten == '') ? true : false,
            gia_dat: (formUpdateProductData.gia_dat == '') ? true : false,
            gia_mua_ngay: (formUpdateProductData.gia_mua_ngay == '') ? true : false,
            buoc_gia: (formUpdateProductData.buoc_gia == '') ? true : false,
            mo_ta: (formUpdateProductData.mo_ta == '') ? true : false,
            id_danh_muc: (formUpdateProductData.id_danh_muc == '') ? true : false
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
            ten: false,
            gia_dat: false,
            gia_mua_ngay: false,
            buoc_gia: false,
            mo_ta: false,
            id_danh_muc: false,
            end_date: false,
            images: false
        });
    };

    const setFormUpdateProductErrorMessageToFalse = () => {
        setFormUpdateProductErrorMessage({
            ten: false,
            gia_dat: false,
            gia_mua_ngay: false,
            buoc_gia: false,
            end_date: false,
            mo_ta: false,
            id_danh_muc: false
        });
    };

    const onShowDetails = (item) => {
        setShowDetails(true);
        setDetails(item);
    };

    const onShowUpdateProduct = (item) => {
        var dataCopied = {
            ...formUpdateProductData,
            'ten': item.ten,
            'id': item.id,
            'gia_dat': item.gia_dat,
            'gia_mua_ngay': item.gia_mua_ngay,
            'buoc_gia': item.buoc_gia,
            'mo_ta': item.mo_ta,
            'id_danh_muc': item.id_danh_muc,
            'end_date': item.end_date,
            'images': item.images
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
            field: 'ten',
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
            field: 'mo_ta',
            headerName: 'Mô Tả',
            editable: false,
            width: 200
        },
        {
            field: 'id_danh_muc',
            headerName: 'Danh Mục',
            editable: false,
            width: 200
        },
        {
            field: 'end_date',
            headerName: 'Ngày Kết Thúc',
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
                    ten: item?.ten,
                    gia_dat: item?.gia_dat,
                    gia_mua_ngay: item?.gia_mua_ngay,
                    buoc_gia: item?.buoc_gia,
                    mo_ta: item?.mo_ta,
                    id_danh_muc: item?.id_danh_muc,
                    end_date: item?.end_date,
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
                            <Form.Control disabled type="text" value={details?.ten}/>
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
                            <Form.Control disabled as="textarea" rows={8} value={details?.mo_ta}/>
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
                            setFormData({...formData, ten: e.target.value});
                            setFormErrorMessageToFalse();
                        }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormErrorMessage.ten ? 'block' : 'none'}}>
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

                    <Col className="mb-3" controlid="">
                        <Form.Label>Danh mục</Form.Label>
                        <select className="form-control search-slt" id="cat" onChange={e => {
                            setChooseCategory(e.target.value);
                            setFormData({...formData, id_danh_muc: Number(e.target.value)});
                        }}>
                            {
                                categories.map((item, index) => {
                                    return (<option value={item.id_danh_muc}
                                                    selected={chooseCategory === item.id_danh_muc}>{item.ten}</option>);
                                })
                            }
                        </select>
                    </Col>

                    <Col className="mb-3" controlid="">
                        <Form.Label>Ngày Kết Thúc</Form.Label>
                        <DatePicker selected={endDate} onChange={(date) => {
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const sData = `${date.getFullYear()}-${month}-${day}`;
                            setEndDate(date);
                            setFormData({...formData, end_date: sData});
                        }}/>
                    </Col>

                    {/* <Form.Group className="mb-3">
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
                    </Form.Group>*/}
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Chọn hình ảnh (3 ảnh)</Form.Label>
                        <Form.Control type="file" multiple onChange={(e) => handleImageSelectorOnChange(e)}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Mô tả</Form.Label>
                        <Editor
                            editorState={formData.mo_ta}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e) => {
                                setFormData({...formData, mo_ta: e});
                                setFormErrorMessageToFalse();
                            }}
                        />
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormErrorMessage.mo_ta ? 'block' : 'none'}}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideNewModal}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary" onClick={() => submitProduct()}>
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
                        <Form.Control type="text" placeholder="Nhập địa chỉ" value={formUpdateProductData?.ten}
                                      onChange={(e) => {
                                          setFormUpdateProductData({
                                              ...formUpdateProductData,
                                              ten: e.target.value
                                          });
                                          setFormErrorMessageToFalse();
                                      }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormUpdateProductErrorMessage.ten ? 'block' : 'none'}}>
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
                        <Row>
                            <Col className="mb-3" controlid="">
                                <Form.Label>Ngày Kết Thúc</Form.Label>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
                            </Col>
                        </Row>
                    </Row>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác"
                                      value={formUpdateProductData?.mo_ta} onChange={(e) => {
                            setFormUpdateProductData({...formUpdateProductData, mo_ta: e.target.value});
                            setFormUpdateProductErrorMessageToFalse();
                        }}/>
                        <Form.Text className="text-muted text-danger"
                                   style={{display: showFormUpdateProductErrorMessage.mo_ta ? 'block' : 'none'}}>
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