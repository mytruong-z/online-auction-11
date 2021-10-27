import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Card, Form, Row, Col } from "react-bootstrap";
import "./seller.css";
import { useHistory } from "react-router";
import { API_URL, CLOUDINARY_URL } from "../../config";
import { DataGrid } from "@material-ui/data-grid";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Product() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [showImagesDetails, setShowImagesDetails] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProductConfirm, setShowDeleteProductConfirm] =
    useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [chooseCategory, setChooseCategory] = useState("");
  const history = useHistory();

  const [details, setDetails] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    productID: 0,
    status: 1
  });
  const [images, setImages] = useState(null);
  const [imagesFormData, setImagesFormData] = useState(null);
  const [hostId, setHostId] = useState(0);
  const [hostToken, setHostToken] = useState("");
  const [deletingProductID, setDeletingProductID] = useState(null);

  const dateObj = new Date();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const sDataDef = `${dateObj.getFullYear()}-${month}-${day}`;

  const [formData, setFormData] = useState({
    ten: "",
    gia_dat: 0,
    gia_mua_ngay: 0,
    buoc_gia: 0,
    mo_ta: "",
    id_danh_muc: 1,
    end_date: sDataDef,
    images: "",
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
    ten: "",
    gia_dat: 0,
    gia_mua_ngay: 0,
    buoc_gia: 0,
    mo_ta: "",
    id_danh_muc: "",
    end_date: "",
    images: ""
  });

  const [showFormUpdateProductErrorMessage, setFormUpdateProductErrorMessage] =
    useState({
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
    const userId = JSON.parse(localStorage.getItem("user")).user.id_nguoi_dung;
    const userToken = JSON.parse(localStorage.getItem("user")).token;
    if (userId >= 0 && userToken !== "") {
      setHostId(userId);
      setHostToken(userToken);
    } else {
      history.push("/");
    }
  }, []);

  const getProducts = (hostId) => {
    axios(`${API_URL}/api/nguoi-ban/danh-sach-san-pham`, {
      headers: {
        "x-access-token": hostToken
      }
    }).then((res) => {
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    });
  };

  const getCategories = () => {
    axios.get(`${API_URL}/api/danh-muc/danh-sach-danh-muc`).then((res) => {
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      }
    });
  };

  useEffect(() => {
    if (hostId !== 0) {
      getProducts(hostId);
      getCategories();
    //   setFormData({
    //     ...formData,
    //     hostID: hostId
    //   });
    }
  }, []);

  const handleImageSelectorOnChange = (e) => {
    var files = e.target.files;
    //console.log(files);
    setImagesFormData(files);
    setFormData({ ...formData, images: files });
  };

  

  const submitProduct = () => {
    setFormErrorMessage({
      ten: formData.ten === "" ? true : false,
      gia_dat: formData.gia_dat === "" ? true : false,
      gia_mua_ngay: formData.gia_mua_ngay == "" ? true : false,
      buoc_gia: formData.buoc_gia === "" ? true : false,
      mo_ta: formData.mo_ta === "" ? true : false,
      id_danh_muc: formData.id_danh_muc === "" ? true : false,
      end_date: formData.end_date === "" ? true : false,
      images: formData.images === "" ? true : false
    });

    console.log(formData);

    for (var i in formData) {
      if (formData[i] === "" || formData[i] === 0) {
        return;
      }
    }

    axios
      .post(`${API_URL}/api/nguoi-ban/them-san-pham`, formData, {
        headers: {
          "x-access-token": hostToken
        }
      })
      .then(function (response) {
        setShowNew(false);
        getProducts(hostId);
        alert("Thêm sản phẩm thành công");
      })
      .catch(function (error) {
        // alert.error(error);
        alert("Thêm sản phẩm không thành công");
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

  const onDeleteProduct = async () => {
    if (deletingProductID != null) {
      await axios
        .delete(`${API_URL}/api/nguoi-ban/xoa-san-pham/${deletingProductID}`)
        .then((res) => {
          alert("Xóa sản phẩm thành công");
          setShowDeleteProductConfirm(false);
        })
        .catch((e) => {
          alert("Xóa sản phẩm không thành công");
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
        description: item?.post[0]?.description
      };
    }

    newPostUpdate.productID = item.id;
    newPostUpdate.status = 1;
    console.log("post update: ", newPostUpdate);
    setPostDetails(newPostUpdate);
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
    { field: "id", headerName: "ID" },

    {
      field: "ten",
      headerName: "Tên Sản Phẩm",
      editable: false,
      width: 200
    },
    {
      field: "gia_dat",
      headerName: "Giá Đặt",
      editable: false,
      width: 200
    },
    {
      field: "gia_mua_ngay",
      headerName: "Giá Mua Ngay",
      editable: false,
      width: 200
    },
    {
      field: "buoc_gia",
      headerName: "Bước Giá",
      editable: false,
      width: 200
    },
    {
      field: "mo_ta",
      headerName: "Mô Tả",
      editable: false,
      width: 200
    },
    {
      field: "id_danh_muc",
      headerName: "Danh Mục",
      editable: false,
      width: 200
    },
    {
      field: "end_date",
      headerName: "Ngày Kết Thúc",
      editable: false,
      width: 200
    },
    {
      field: "Hành Động",
      headerName: "",
      sortable: false,
      option: false,
      renderCell: (params) => (
        <strong>
          <button
            className="btn btn-sm btn-primary m-1"
            onClick={(e) => onShowDetails(params.value)}
          >
            Chi tiết
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
          ten: item?.ten_sp,
          gia_dat: item?.gia_dat,
          gia_mua_ngay: item?.gia_mua_ngay,
          buoc_gia: item?.buoc_gia,
          mo_ta: item?.mo_ta,
          id_danh_muc: item?.id_danh_muc,
          end_date: item?.end_date
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
          <button onClick={onShowNew} className="btn btn-sm btn-success">
            Thêm
          </button>
        </Card.Header>
        <Card.Body>
          <div style={{ height: "650px", width: "100%" }}>
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
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideNewModal}>
            Đóng
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => submitProduct()}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Product;
