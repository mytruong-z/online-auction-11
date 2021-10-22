import "../user.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { selectRole } from "../../../selector/roleSelector";
import { API_URL } from "../../../config";
import { Form } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

/*
    {
    "id_nguoi_dung": 1,
    "email": "nijigi1129@rebation.com",
    "ho_ten": "John Henry",
    "ngay_sinh": "2019-07-03T10:00:00.000Z",
    "dia_chi": "123 hung vuong",
    "id_quyen_han": 2,
    "diem_danhgia_duong": 3,
    "diem_danhgia_am": 4,
    "expired": "2021-09-08T03:15:51.000Z"
    }
*/

const UserDetails = (props) => {
  const { idNguoiDung } = useParams();

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  let [diemDuong, setDiemDuong] = useState(0);
  let [diemAm, setDiemAm] = useState(0);

  const [token, setToken] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);

  const [isDuong, setIsDuong] = useState(true);
  const [nhanXet, setNhanXet] = useState("");
  let [tobeSeller , setToBeSeller] = useState(false)
  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
      if (parseInt(userLocal.user.id_nguoi_dung) === parseInt(idNguoiDung))
        setIsUserLogin(true);
    } 

    axios.get(`${API_URL}/api/tai-khoan/yeu-cau-nang-cap/tim-kiem?quyen_han=2`,{
      headers: {
        "x-access-token": userLocal.token
      }
    }).then(res => {
      if(res.data.isUpRole){
        setToBeSeller(true)
      }else{
        setToBeSeller(false)
      }
    })

    axios
      .get(`${API_URL}/api/tai-khoan/details?id=${idNguoiDung}`)
      .then((res) => {
        setUser(res.data);
        setFullName(res.data.ho_ten);
        setBirthDay(res.data.ngay_sinh);
        setDiemAm(res.data.diem_danhgia_am);
        setDiemDuong(res.data.diem_danhgia_duong);
      })
      .catch((err) => alert("Người Dùng Không Tồn Tại"));
  }, [idNguoiDung]);

  const handleToBeSeller = e => {
    e.preventDefault()

    axios.get(`${API_URL}/api/tai-khoan/yeu-cau-nang-cap/yeu-cau?quyen_han=2`, {
      headers: {
        "x-access-token": token
      }
    }).then(res => {
      alert('Thành Công, Bạn Có Thể Đơi Tới 7 Ngày Để Trở thành Seller')
      setToBeSeller(true)
    }).catch(err => {
      alert('Có Lỗi Xảy Ra Vui Lòng Thử Lại')
    })
  }

  const handleChangeInfo = (e) => {
    e.preventDefault();
    //// call axios
    const sendData = {
      ho_ten: fullName,
      ngay_sinh: birthDay
    };
    axios
      .patch(`${API_URL}/api/tai-khoan/cap-nhat`, sendData, {
        headers: {
          "x-access-token": token
        }
      })
      .then((res) => {})
      .catch((err) => alert("Có Gì Đó Lỗi Xảy Ra"));
  };

  const handleNhanXet = (e) => {
    e.preventDefault();

    const dataSend = {
      nhan_xet: nhanXet
    };

    if (isDuong) {
      axios
        .post(
          `${API_URL}/api/tai-khoan/nang-diem-danh-gia?target=${idNguoiDung}`,
          dataSend,
          {
            headers: {
              "x-access-token": token
            }
          }
        )
        .then((res) => {
          diemDuong += 1;
          setDiemDuong(diemDuong);
          alert("Nhận Xét Thành Công, Đã Nâng Điểm Người Dùng");
        })
        .catch((err) => alert("Có Lỗi Xảy Ra, Vui Lòng Thử Lại"));
    } else {
      axios
        .post(
          `${API_URL}/api/tai-khoan/ha-diem-danh-gia?target=${idNguoiDung}`,
          dataSend,
          {
            headers: {
              "x-access-token": token
            }
          }
        )
        .then((res) => {
          diemAm -= 1;
          setDiemAm(diemAm);
          alert("Nhận Xét Thành Công, Đã Hạ Điểm Người Dùng");
        })
        .catch((err) => {
          console.log(err.response.data);
          alert("Có Lỗi Xảy Ra, Vui Lòng Thử Lại");
        });
    }
  };

  return (
    <div className="container">
      <div className="section-title m-4">
        <span className="caption d-block small">Trang Người Dùng</span>
        <h2>Thông tin cá nhân</h2>
      </div>
      {user != null ? (
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="justify-content-center">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-1 user-point">
                    <p>+{diemDuong}</p>
                    <p>-{diemAm}</p>
                  </div>
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src={process.env.PUBLIC_URL + "/user.png"}
                          className="rounded-circle"
                          alt="user"
                          style={{ width: "12rem" }}
                        />
                      </div>
                      <h6 className="f-w-600">{fullName}</h6>
                      <h7 className="">{user.dia_chi}</h7>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="card-block">
                      <h5 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Thông tin cá nhân
                      </h5>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Ngày Sinh</p>
                          <h6 className="text-muted f-w-400">
                            {new Date(birthDay).toLocaleDateString("en-US")}
                          </h6>
                        </div>
                      </div>
                      <h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Quyền Hạn
                      </h5>
                      <div className="row">
                        <p className="m-b-10 f-w-600">Quyền Hạn Hiện Tại</p>
                        <h6 className="text-muted f-w-400">
                          {selectRole(user.id_quyen_han).name}
                        </h6>
                        <div className="d-inline p-2">
                          {user.id_quyen_han === 2 ||
                          user.id_quyen_han === 3 ||
                          isUserLogin === false ? (
                            ""
                          ) : tobeSeller === true ? (
                            <button className="btn btn-success mr-1">
                              <i className="fa fa-check" aria-hidden="true"></i> Đã
                              Gởi Yêu Cầu
                            </button>
                          ) : (
                            <button onClick={e => handleToBeSeller(e)} className="btn btn-danger mr-1">
                              Trở Thành Seller
                            </button>
                          )}
                        </div>
                      </div>
                      <h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Chức Năng
                      </h5>
                      {isUserLogin === false ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#modalNhanXet"
                          >
                            Ghi Nhận Xét
                          </button>

                          <div
                              className="modal fade"
                            id="modalNhanXet"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Thêm Nhận Xét</h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="form-group">
                                    <div className="mb-3">
                                      <label
                                        for="exampleInputPassword1"
                                        class="form-label"
                                      >
                                        Nhận Xét
                                      </label>
                                      <textarea
                                        class="form-control"
                                        onChange={(e) =>
                                          setNhanXet(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="form-label">
                                      Cho Điểm Người Dùng
                                    </label>
                                    <div>
                                      <input
                                        type="radio"
                                        class="btn-check form-control"
                                        name="options-outlined"
                                        id="success-outlined"
                                        autocomplete="off"
                                        checked
                                        onClick={(e) => setIsDuong(true)}
                                      />
                                      <label
                                        class="btn btn-outline-success"
                                        style={{ marginRight: 20 }}
                                        for="success-outlined"
                                      >
                                        +1 Điểm
                                      </label>

                                      <input
                                        type="radio"
                                        class="btn-check"
                                        name="options-outlined"
                                        id="danger-outlined"
                                        autocomplete="off"
                                        onClick={(e) => setIsDuong(false)}
                                      />
                                      <label
                                        class="btn btn-outline-danger mr-2"
                                        for="danger-outlined"
                                      >
                                        -1 Điểm
                                      </label>
                                    </div>
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
                                    class="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={(e) => handleNhanXet(e)}
                                  >
                                    Nhận Xét
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-inline ">
                            <button
                              type="button"
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target="#modalSuaThongTin"
                            >
                              Sửa Thông Tin Cá Nhân
                            </button>

                            <div
                              className="modal fade"
                              id="modalSuaThongTin"
                              tabIndex="-1"
                              role="dialog"
                              aria-labelledby="modelTitleId"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Cập Nhật Thông Tin
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="container">
                                      <div className="login">
                                        <Form className="mt-5">
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicName"
                                          >
                                            <Form.Label>Nhập Họ Tên</Form.Label>
                                            <Form.Control
                                              required
                                              type="text"
                                              placeholder="Nhập Họ Tên"
                                              value={fullName}
                                              onChange={(e) =>
                                                setFullName(e.target.value)
                                              }
                                            />
                                          </Form.Group>

                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicName"
                                          >
                                            <Form.Label>
                                              Nhập Ngày Sinh
                                            </Form.Label>
                                            <Datetime
                                              value={birthDay}
                                              onChange={(date) => {
                                                setBirthDay(date);
                                              }}
                                            />
                                          </Form.Group>
                                        </Form>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Đóng
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      data-dismiss="modal"
                                      onClick={(e) => handleChangeInfo(e)}
                                    >
                                      Lưu Thông Tin
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Link
                              to="/nguoi-dung/doi-mat-khau"
                              className="btn btn-primary m-1"
                            >
                              Đổi Mật Khẩu
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default UserDetails;
