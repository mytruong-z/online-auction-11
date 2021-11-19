import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { pathSplitting } from "../utils/pathSplit";
import { API_URL, SUCCESS, DANGER, PENDING } from "../config";

//@LoanNgo, You can rely on this variable to check the login status: localStorage;
//// firebase

import { addNotificationData, writeUnRead } from "../model/notificationModel";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactHtmlParser from "react-html-parser";
import ShowMoreText from "react-show-more-text";

const Menu = (props) => {
  const [listDMPC, setListDMPC] = useState([]);
  const [listDMDT, setListDMDT] = useState([]);
  const [userLogin, setUserLogin] = useState(null);
  const [adminPage, setAdminPage] = useState(false);
  const [numNoti, setNumNoti] = useState(0)
  const history = useHistory();
  const location = useLocation();

  //// firebase realtime
  const [noiDungTB, setNoiDungTB] = useState([]);

  const handleLogOut = (e) => {
    e.preventDefault();
    setUserLogin(null);
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    let userLocal = null;
    axios
      .get(`${API_URL}/api/danh-muc/danh-sach-danh-muc-theo-cap?cap=0`)
      .then((res) => setListDMDT(res.data));

    axios
      .get(`${API_URL}/api/danh-muc/danh-sach-danh-muc-theo-cap?cap=1`)
      .then((res) => setListDMPC(res.data));

    if (location.state !== undefined) {
      if (location.state.logout !== undefined) setUserLogin(null);
    }

    if (userLogin == null) {
      if (localStorage.getItem("user") != null) {
        userLocal = JSON.parse(localStorage.getItem("user"));
        setUserLogin(userLocal);

        //// query
        const db = getDatabase();

        console.log(userLocal.user.id_nguoi_dung)
        const starCountRef = ref(db, "notification/" + userLocal.user.id_nguoi_dung);
        onValue(starCountRef, (snapshot) => {
          const val = snapshot.val();
          // Object.keys(val).map((key, index) => {
          //   console.log(val[key].content)
          // });
          setNumNoti(val["unRead"])
          setNoiDungTB(val["noti-item"]);
        });
      }
    }
    if (userLogin && userLogin.user.id_quyen_han === 3) {
      setAdminPage(true);
    }
  }, [userLogin, location.state]);
  const handleMarkDone = e=> {
    e.preventDefault()
    writeUnRead(userLogin.user.id_nguoi_dung, 0)
  }
  const handleAddDataToFirebase = (e) => {
    e.preventDefault();
    console.log("Send Firebase");
    addNotificationData(0, "Good Bye Ya", 1);
  };
  const renderNoti = () => {
    return (<><button
      className="btn"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i
        className="fa fa-bell-o"
        style={{ fontSize: 22 }}
        aria-hidden="true"
      />
      <nav class="num-noti">{numNoti}</nav> {/* nếu >99 = 99+ */}
    </button>

    {/*  Notification */}

    <div
      class="dropdown-menu noti-menu"
      aria-labelledby="notificationBtn">
      <div>Thông Báo</div>

      { noiDungTB !== null && Object.keys(noiDungTB).map((key, index) => {
        return (
          <>
            <a className="row dropdown-item noti-item">
              <div class="col-3">
                <img className="img-fluid" src="/user.png" />
              </div>
              <div class="col-9">
                {noiDungTB[key].type === SUCCESS.id ? (
                  <>
                    <span className="text-success">
                      {SUCCESS.name}
                    </span>
                    <p class="noti-content">
                    <ShowMoreText
          /* Default options */
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {ReactHtmlParser(noiDungTB[key].content)}
        </ShowMoreText>
                    </p>
                  </>
                ) : (
                  ""
                )}
                {noiDungTB[key].type === DANGER.id ? (
                  <>
                    <span className="text-danger">
                      {DANGER.name}
                    </span>
                    <p class="noti-content">
                    <ShowMoreText
          /* Default options */
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {ReactHtmlParser(noiDungTB[key].content)}
        </ShowMoreText>
                    </p>
                  </>
                ) : (
                  ""
                )}
                {noiDungTB[key].type === PENDING.id ? (
                  <>
                    <span className="text-warning">
                      {PENDING.name}
                    </span>
                    <p class="noti-content">
                    <ShowMoreText
          /* Default options */
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {ReactHtmlParser(noiDungTB[key].content)}
        </ShowMoreText>
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </a>
          </>
        );
      })}
     
      <button type="button" class="btn btn-outline-primary btn-action mt-2 ml-2 mr-2 float-right" onClick={e => handleMarkDone(e)}><i class="fa fa-check" aria-hidden="true"></i>Mark as Read</button>
    </div></>)
  }
  // import { getDatabase, ref, child, get } from "firebase/database";
  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  // const handleGetDataToFirebase = e => {
  //   e.preventDefault()
  //   const db = getDatabase();
  //   const starCountRef = ref(db, 'notification/' + 0 );
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //   });
  // }

  return (
    <div className="bg-light shadow">
      <ToastContainer />
      <Nav
        defaultActiveKey="/home"
        as="ul"
        className="container justify-content-between"
      >
        <div className="logo">
          <a href="/">
            <img
              src="/aution_logo.png"
              width="100"
              className="p-2"
              ooo
              alt="logo"
            />
          </a>
          <i class="fa fa-odnoklassnikio" aria-hidden="true"></i>
        </div>

        {/* test button write */}
        {/* <button onClick={(e) => handleAddDataToFirebase(e)}>Thêm Firebase</button> */}
        {/* test button read */}
        {/* <button onClick={e => handleGetDataToFirebase(e)}>đọc Firebase</button> */}

        <div className="d-flex">
          {!adminPage ? (
            <>
              <li
                key={0}
                className="my-li align-items-center d-grid nav-item px-2"
              >
                <Link to="/" className="text-pink">
                  Trang Chủ
                </Link>
              </li>

              <li key={1} className="my-li align-items-center d-grid nav-item">
                <div className="cate-dropdown ">
                  <span
                    className="nav-link text-left cateBtn"
                    onClick={(e) => history.push("/danh-sach-san-pham")}
                  >
                    Danh Mục
                    <i className="fa fa-caret-down" />
                  </span>
                  <div className="cate-content">
                    <div className="row">
                      <div className="col-4">
                        <h5>Máy Tính</h5>
                        <ul>
                          {listDMPC.length !== 0 &&
                            listDMPC.map((pc, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <Link
                                      to={`/danh-muc/${
                                        pc.id_danh_muc
                                      }/${pathSplitting(pc.ten)}`}
                                    >
                                      {pc.ten}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="col-4">
                        <h5>Điện thoại</h5>
                        <ul>
                          {listDMDT.length !== 0 &&
                            listDMDT.map((dt, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <Link
                                      to={`/danh-muc/${
                                        dt.id_danh_muc
                                      }/${pathSplitting(dt.ten)}`}
                                    >
                                      {dt.ten}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                        </ul>
                      </div>

                      <div className="col-4">
                        <img
                          src={process.env.PUBLIC_URL + "/tech.png"}
                          alt="pic"
                          width="300"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {userLogin ? (
                <>
                  <li
                    key={0}
                    className="my-li align-items-center d-grid nav-item px-2">
                    {renderNoti()}
                  </li>
                  <li key={1}>
                    <div className="dropdown show">
                      <div
                        className="nav-link text-left dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <img
                          src="/user.png"
                          alt="accountIMG"
                          className="rounded-circle"
                          width="40"
                        />
                      </div>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <Link
                          className="dropdown-item"
                          to={`/nguoi-dung/thong-tin/${userLogin.user.id_nguoi_dung}`}
                        >
                          <i className="fa fa-user" /> T.T Bản Thân
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/yeu-thich"
                        >
                          <i className="fa fa-heart" /> Danh Mục Yêu Thích
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/lich-su-dau-gia"
                        >
                          <i className="fa fa-paper-plane" aria-hidden="true" />{" "}
                          Lịch Sử đấu giá
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/danh-gia-ve-toi">
                          <i className="fa fa-bar-chart" aria-hidden="true" />
                          Đánh Giá Về Tôi
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/danh-sach-sp-dang-dau-gia">
                          <i className="fa fa-bar-chart" aria-hidden="true" />
                          Danh Sách SP Đang Đấu Giá
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/danh-sach-sp-da-thang">
                          <i className="fa fa-bar-chart" aria-hidden="true" />
                          Danh Sách SP Đã Thắng
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/nhan-xet-cua-toi"
                        >
                          <i className="fa fa-asterisk" aria-hidden="true" />
                          Nhận Xét Của Tôi
                        </Link>

                        {userLogin.user.id_quyen_han === 2 ? (
                          <>
                            <Link
                              className="dropdown-item"
                              to="/nguoi-ban/danh-sach-chap-thuan"
                            >
                              <i className="fa fa-list" aria-hidden="true" />{" "}
                              Danh Sách Chấp Thuận
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="/nguoi-ban/san-pham"
                            >
                              <i
                                className="fa fa-paragraph"
                                aria-hidden="true"
                              />{" "}
                              Quản Lí Sản Phẩm
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="/nguoi-ban/don-hang"
                            >
                              <i
                                className="fa fa-paragraph"
                                aria-hidden="true"
                              />{" "}
                              Quản Lí Đơn Hàng
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                        <Link
                          className="dropdown-item"
                          to="/nguoi-dung/doi-mat-khau"
                        >
                          <i className="fa fa-unlock" aria-hidden="true" /> Đổi
                          Mật Khẩu
                        </Link>
                        <div className="dropdown-divider" />
                        <Link
                          to="/"
                          className="dropdown-item text-danger"
                          onClick={(e) => handleLogOut(e)}
                        >
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                          Đăng Xuất
                        </Link>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li
                    key={2}
                    className="my-li align-items-center d-grid nav-item px-2"
                  >
                    <Link to="/login" className="text-pink">
                      Đăng Nhập
                    </Link>
                  </li>
                  <li
                    key={3}
                    className="my-li align-items-center d-grid nav-item px-2"
                  >
                    <Link to="/register" className="text-pink">
                      Đăng Ký
                    </Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li className={`my-li align-items-center d-grid nav-item px-2`}>
                {renderNoti()}
              </li>
              <li 
                className={`my-li align-items-center d-grid nav-item px-2 ${
                  window.location.pathname === "/admin/list-user-upgrade"
                    ? "active bg-pink"
                    : ""
                }`}>
                <Link to="/admin/list-user-upgrade" className="text-pink">
                  Danh Sách Nâng Cấp
                </Link>
              </li>
              <li 
                className={`my-li align-items-center d-grid nav-item px-2 ${
                  window.location.pathname === "/admin/users"
                    ? "active bg-pink"
                    : ""
                }`}>
                <Link to="/admin/users" className="text-pink">
                  QL Người Dùng
                </Link>
              </li>
              <li
                className={`my-li align-items-center d-grid nav-item px-2 ${
                  window.location.pathname === "/admin/products"
                    ? "active bg-pink"
                    : ""
                }`}
              >
                <Link to="/admin/products" className="text-pink">
                  QL Sản Phẩm
                </Link>
              </li>
              <li
                className={`my-li align-items-center d-grid nav-item px-2 ${
                  window.location.pathname === "/admin/categories"
                    ? "active bg-pink"
                    : ""
                }`}
              >
                <Link to="/admin/categories" className="text-pink">
                  QL Danh Mục
                </Link>
              </li>
              <li
                className="my-li align-items-center d-grid nav-item px-2">
                <Link
                  to="/"
                  className="text-pink"
                  onClick={(e) => handleLogOut(e)}
                >
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  Đăng Xuất
                </Link>
              </li>
            </>
          )}
        </div>
      </Nav>
    </div>
  );
};

export default Menu;
