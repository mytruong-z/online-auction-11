import "./user.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { selectRole } from "../../selector/roleSelector";
import { API_URL } from "../../config";
import { Form, Button } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

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
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [birthDay, setBirthDay] = useState(null)
  const [token, setToken ] = useState("");
  useEffect(() => {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      setToken(user.token)
      axios
        .get(`${API_URL}/api/tai-khoan/details`, {
          headers: {
            "x-access-token": user.token
          }
        })
        .then((res) => {
          setUserLogin(res.data);
          setFullName(res.data.ho_ten)
          setBirthDay(res.data.ngay_sinh)
        });
    } else {
      history.push("/");
    }
  }, [history]);

  const handleChangeInfo = e => {
    e.preventDefault()
    //// call axios
    const sendData = {
      ho_ten:  fullName,
      ngay_sinh: birthDay
    }
    axios.patch(`${API_URL}/api/tai-khoan/cap-nhat`, sendData, {
      headers: {
        "x-access-token": token
      }
    }).then(res => {}).catch(err => alert("Có Gì Đó Lỗi Xảy Ra"))
  }

  return (
    <div class="container">
      <div class="section-title m-4">
        <span class="caption d-block small">Trang Người Dùng</span>
        <h2>Thông tin cá nhân</h2>
      </div>
      {userLogin != null ? (
        <div class="page-content page-container" id="page-content">
          <div class="padding">
            <div class="justify-content-center">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div className="col-sm-2 user-point">
                    <p>+{userLogin.diem_danhgia_duong}</p>
                    <p>-{userLogin.diem_danhgia_am}</p>
                  </div>
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <img
                          src={process.env.PUBLIC_URL + "/user.png"}
                          class="rounded-circle"
                          alt="user"
                          style={{ width: "12rem" }}
                        />
                      </div>
                      <h6 class="f-w-600">{fullName}</h6>
                      <h7 class="">{userLogin.dia_chi}</h7>
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Thông tin cá nhân
                      </h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">{userLogin.email}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Ngày Sinh</p>
                          <h6 class="text-muted f-w-400">
                            {new Date(birthDay).toLocaleDateString(
                              "en-US"
                            )}
                          </h6>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Yêu Cầu Trở Thành Seller
                      </h6>
                      <div class="row">
                        <p class="m-b-10 f-w-600">Quyền Hạn Hiện Tại</p>
                        <h6 class="text-muted f-w-400">
                          {selectRole(userLogin.id_quyen_han).name}
                        </h6>
                        <div class="d-inline p-2">
                          {userLogin.id_quyen_han === 2 ||
                          userLogin.id_quyen_han === 3 ? (
                            ""
                          ) : (
                            <button class="btn btn-danger mr-1">
                              Trở Thành Seller
                            </button>
                          )}

                          <button
                            type="button"
                            class="btn btn-success m-1"
                            data-toggle="modal"
                            data-target="#modelId"
                          >
                            Sửa Thông Tin Cá Nhân
                          </button>

                          <div
                            class="modal fade"
                            id="modelId"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">
                                    Cập Nhật Thông Tin
                                  </h5>
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
                                  <div class="container">
                                    
                                    <div class="login">
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
                                            onChange={e => setFullName(e.target.value)}
                                          />
                                        </Form.Group>

                                        <Form.Group
                                          className="mb-3"
                                          controlId="formBasicName"
                                        >
                                          <Form.Label>
                                            Nhập Ngày Sinh
                                          </Form.Label>
                                          <Datetime value={ birthDay } onChange={(date) => { setBirthDay(date) } } />;
                                        </Form.Group>
                                      </Form>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal">
                                    Đóng
                                  </button>
                                  <button type="button" class="btn btn-primary"
                                  data-dismiss="modal"
                                  onClick={e => handleChangeInfo(e)}>
                                    Lưu Thông Tin
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/nguoi-dung/doi-mat-khau"
                            class="btn btn-primary m-1"
                          >
                            Đổi Mật Khẩu
                          </Link>
                        </div>
                      </div>
                      <ul class="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
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
      ;
    </div>
  );
};
export default UserDetails;
