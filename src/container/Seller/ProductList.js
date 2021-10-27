import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./seller.css";
import { useHistory } from "react-router";
import { API_URL, CLOUDINARY_URL } from "../../config";
import { Button, Modal, Card, Form, Row, Col } from "react-bootstrap";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import axios from "axios";
var FormData = require("form-data");
const ProductList = (props) => {
  /// state init

  const [products, setProduct] = useState([]);
  const [hostToken, setHostToken] = useState("");
  const history = useHistory();
  const [danhMucs, setDanhMucs] = useState([]);


  const handleAdd = (e) => {
    e.preventDefault();
    axios.get(`${API_URL}/api/danh-muc/danh-sach-danh-muc`).then((res) => {
      if (Array.isArray(res.data)) {
        setDanhMucs(res.data);
      }
    });
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).user.id_nguoi_dung;
    const userToken = JSON.parse(localStorage.getItem("user")).token;
    if (userId >= 0 && userToken !== "") {
      setHostToken(userToken);
    } else {
      history.push("/");
    }

    axios
      .get(`${API_URL}/api/nguoi-ban/danh-sach-san-pham`, {
        headers: {
          "x-access-token": userToken
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProduct(res.data);
        } else {
          setProduct([]);
        }
      });
  }, []);

  //// state add product
  const [tenSP, setTenSP] = useState("");
  const [giaDat, setGiaDat] = useState(0);
  const [giaMua, setGiaMua] = useState(0);
  const [buocGia, setBuocGia] = useState(0);
  const [idDM, setIdDM] = useState(null);
  const [endDate, setEndDate] = useState(Date.now());
  const [images, setImages] = useState(null);
  const [moTa, setMoTa] = useState(null);
  const [chooseCategory, setChooseCategory] = useState(0);

  const handleSaveProduct = (e) => {
    e.preventDefault();

    let arrDM = idDM.split("-")
    var sendData = new FormData();
    Array.from(images).forEach((file) => sendData.append("images", file));
    sendData.append("ten", tenSP);
    sendData.append("gia_dat", giaDat);
    sendData.append("gia_mua_ngay", giaMua);
    sendData.append("buoc_gia", buocGia);
    sendData.append("end_date", endDate);
    sendData.append(
      "mo_ta",
      draftToHtml(convertToRaw(moTa.getCurrentContent()))
    );
    sendData.append("id_danh_muc", arrDM[0]);

    axios({
      method: "post",
      url: `${API_URL}/api/nguoi-ban/them-san-pham`,
      data: sendData,
      headers: {
        "x-access-token": hostToken,
        enctype: "multipart/form-data",
        "Cache-Control": "sno-cache",
        Pragma: "no-cache"
      }
    }).then(function (res) {
        //handle success
        alert("Thêm Sản Phẩm Thành Công");
        let product = res.data.product
        product.danh_muc.ten = arrDM[1]
        products.push(res.data.product)
        setProduct(products)
      }).catch(function (err) {
        alert("Thêm Sản Phẩm Thất Bại");
      });
  };

  /// state add cate

  const [tenDanhMuc, setTenDanhMuc] = useState(null);
  const [capDanhMuc, setCapDanhMuc] = useState(0);

  const handleChangeDanhMuc = e => {
    setCapDanhMuc(e.target.value)
  }

  const handleThemDanhMuc = (e) => {
    e.preventDefault()

    const sendData = {
      ten: tenDanhMuc,
      cap_danh_muc: capDanhMuc
    }

    axios.post(`${API_URL}/api/nguoi-ban/them-danh-muc`,sendData,{
      headers: {
        "x-access-token": hostToken,
      }
    }).then(res => {
      alert('Thêm Danh Mục Thành Công')
    }).catch(err => {
      alert('Thêm danh mục thất bại')
    })
    
  };

  return products.length === 0 ? (
    "Trống"
  ) : (
    <>
      <button
        type="button"
        class="float-right mt-3 btn btn-sm btn-primary m-1"
        data-toggle="modal"
        data-target="#modalThemDM">
        Thêm Danh Mục
      </button>

      <div
        class="modal fade"
        id="modalThemDM"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm Danh Mục</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="">Tên Danh Mục</label>
                <input
                  type="text"
                  class="form-control"
                  value={tenDanhMuc}
                  onChange={e => setTenDanhMuc(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="">Cấp Danh Mục</label>
                  <div class="form-check">
                    <label class="form-check-label m-4">
                      <input
                        type="radio"
                        class="form-check-input"
                        value="0"
                        checked={capDanhMuc === "0"}
                        name="gr1"
                        onChange={e => handleChangeDanhMuc(e)}
                      />
                      Điện Thoại
                    </label>
                    <label class="form-check-label m-4">
                      <input
                        type="radio"
                        class="form-check-input"
                        value="1"
                        checked={capDanhMuc === "1"}
                        name="gr1"
                        onChange={e => handleChangeDanhMuc(e)}
                      />
                      Máy Tính
                    </label>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                data-dismiss="modal">
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-dismiss="modal"
                onClick={(e) => handleThemDanhMuc(e)}>
                Lưu Danh Mục
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="float-right mt-3 btn btn-sm btn-success m-1"
        data-toggle="modal"
        data-target="#modalThemSP"
        onClick={(e) => handleAdd(e)}
      >
        Thêm Sản Phẩm
      </button>

      <div
        class="modal fade"
        id="modalThemSP"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm Sản Phẩm</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <Form.Group className="mb-3" controlid="">
                <Form.Label>Tên Sản Phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Tên Sản Phẩm"
                  value={tenSP}
                  onChange={(e) => setTenSP(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col className="mb-3" controlid="">
                  <Form.Label>Giá Đặt</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá đặt"
                    value={giaDat}
                    onChange={(e) => setGiaDat(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col className="mb-3" controlid="">
                  <Form.Label>Giá Mua Ngay</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá mua ngay"
                    value={giaMua}
                    onChange={(e) => setGiaMua(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-3" controlid="">
                  <Form.Label>Bước Giá</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập bước giá"
                    value={buocGia}
                    onChange={(e) => setBuocGia(e.target.value)}
                  />
                </Col>
              </Row>

              <Col className="mb-3" controlid="">
                <Form.Label>Danh mục</Form.Label>
                <select
                  className="form-control search-slt"
                  value={idDM}
                  onChange={(e) => setIdDM(e.target.value)}
                >
                  <option value={null} selected>
                    Chọn Danh Mục
                  </option>
                  {danhMucs.map((item, index) => {
                    return (
                      <option
                        value={`${item.id_danh_muc} - ${item.ten}`}
                        selected={chooseCategory === item.id_danh_muc}>
                        {item.ten}
                      </option>
                    );
                  })}
                </select>
              </Col>

              <Col className="mb-3" controlid="">
                <Form.Label>Ngày Kết Thúc</Form.Label>
                <DatePicker
                  onChange={(date) => {
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const sData = `${date.getFullYear()}-${month}-${day}`;
                    setEndDate(sData);
                  }}
                />
              </Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Chọn hình ảnh (3 ảnh)</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mô tả</Form.Label>
                <Editor
                  editorState={moTa}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(e) => {
                    setMoTa(e);
                  }}
                />
              </Form.Group>

              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name=""
                    id=""
                    value="checkedValue"
                  />
                  Thêm 10 Phút
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-primary"
                onClick={(e) => handleSaveProduct(e)}
              >
                Lưu Sản Phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá Đặt</th>
            <th>Bước Giá</th>
            <th>Giá Mua</th>
            <th>Mô Tả</th>
            <th>Danh Mục</th>
            <th>Ngày Kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            return (
              <tr>
                <td scope="row">{idx}</td>
                <td>{product.ten_sp}</td>
                <td>{product.gia_dat}</td>
                <td>{product.buoc_gia}</td>
                <td>{product.gia_mua_ngay}</td>
                <td>{product.mo_ta}</td>
                <td>{product.danh_muc.ten}</td>
                <td>{product.end_date}</td>
                <td>
                  <strong>
                    <button className="btn btn-sm btn-primary m-1" onClick={e => {
                      history.push()
                    }}>
                      Chi tiết
                    </button>
                  </strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default ProductList;
