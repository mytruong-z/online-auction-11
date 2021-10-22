/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import {useState, useEffect} from "react";
import ImageSlider from "./ImageSlider";
import "./product.css";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import {useHistory} from "react-router";
import {API_URL} from "../../config";
import ProductItem from "../../components/ProductItem";
import Slider from "react-slick";
import {Divider} from "antd";
import ShowMoreText from "react-show-more-text";
import {List} from "antd";
import "antd/dist/antd.css";
import Countdown from "react-countdown";
import moment from "moment";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {confirmAlert} from "react-confirm-alert"; // Import

import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {EditorState, convertToRaw, ContentState} from "draft-js";
import lodash from "lodash";

const ProductDetails = (props) => {
    const [loveStyle, setLoveStyle] = useState(`gray`);
    const {name} = useParams();

    const [idSP, setIdSP] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [idLogin, setIdLogin] = useState(null);

    const [product, setProduct] = useState(null);
    let [mota, setMoTa] = useState("");
    let [motaMoi, setMoTaMoi] = useState("");
    const [namSPCungLoai, setNamSanPhamCungLoai] = useState([]);
    let [miliEndDate, setMiliEndDate] = useState(0);

    let [giaHienTai, setGiaHienTai] = useState(0);
    let [giaDat, setGiaDat] = useState(0);
    const [caoNhat, setCaoNhat] = useState(null);

    const history = useHistory();

    const settingSlide = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    useEffect(() => {
        let userLocal = null;
        if (localStorage.user) {
            userLocal = JSON.parse(localStorage.user);
            setToken(userLocal.token);
            setRole(userLocal.user.id_quyen_han);
            setIdLogin(userLocal.user.id_nguoi_dung);
        }

        axios
            .get(`${API_URL}/api/san-pham/details/${name}`)
            .then((res) => {
                if (userLocal !== null) {
                    if (
                        res.data.isLocked === 1 &&
                        userLocal.user.id_nguoi_dung !== res.data.nguoi_ban.id
                    ) {
                        alert("Sản Phẩm Hiện Tại Đã Có Người Mua Hoặc Đã Kết Thúc");
                        history.push("/");
                    }
                }
                setProduct(res.data);
                setMoTa(res.data.mo_ta);
                setIdSP(res.data.id_sp);
                setGiaHienTai(res.data.gia_hien_tai);

                var date1 = moment(res.data.end_date);
                var date2 = moment(Date.now());
                var diff = date1.diff(date2);
                setMiliEndDate(diff);

                axios
                    .get(
                        `${API_URL}/api/san-pham/dau-gia/cao-nhat?id_sp=${res.data.id_sp}`
                    )
                    .then((r) => {
                        setCaoNhat(r.data);
                    });

                if (userLocal !== null) {
                    axios
                        .get(
                            `${API_URL}/api/tai-khoan/yeu-thich/kiem-tra-san-pham?san_pham=${res.data.id_sp}`,
                            {
                                headers: {
                                    "x-access-token": userLocal.token
                                }
                            }
                        )
                        .then((rs) => {
                            if (rs.data.isLiked === true) {
                                setLoveStyle(`red`);
                            }
                        });
                }

                // callback hell
                axios
                    .get(
                        `${API_URL}/api/san-pham/5-san-pham-cung-danh-muc?danh_muc=${res.data.danh_muc.id}&size=5`
                    )
                    .then((r) => {
                        setNamSanPhamCungLoai(r.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                alert("Có Lỗi Xảy Ra ");
                history.push("/");
            });
    }, [history, name]);
    const handleEndDate = () => {
        alert("Đấu Giá Đã Kết Thúc, Sản phẩm sẽ bị khóa");
        history.push("/");
    };

    const [lstLichSu, setLstLichSu] = useState([]);
    const handleXemLichSu = (e) => {
        axios.get(`${API_URL}/api/dau-gia/lich-su?san_pham=${idSP}`).then((res) => {
            setLstLichSu(res.data);
        });
    };

    //const Completionist = () => {}

    const handleLove = (e) => {
        e.preventDefault();
        if (loveStyle === `gray`) {
            axios
                .get(
                    `${API_URL}/api/tai-khoan/yeu-thich/them-san-pham?san_pham=${product.id_sp}`,
                    {
                        headers: {
                            "x-access-token": token
                        }
                    }
                )
                .then((r) => {
                    alert("Thêm Sản Phẩm Yêu Thích Thành Công");
                })
                .catch((err) => {
                    alert("thêm sản phẩm yêu thích thất bại");
                });
            setLoveStyle(`red`);
        } else {
            axios
                .delete(
                    `${API_URL}/api/tai-khoan/yeu-thich/xoa-san-pham?san_pham=${product.id_sp}`,
                    {
                        headers: {
                            "x-access-token": token
                        }
                    }
                )
                .then((r) => {
                    alert("Xóa Sản Phẩm Yêu Thích Thành Công");
                })
                .catch((err) => {
                    alert("Xóa sản phẩm yêu thích thất bại");
                });
            setLoveStyle(`gray`);
        }
    };

    const handleChangeMoTa = (e) => {
        e.preventDefault();
        mota = mota + " " + draftToHtml(convertToRaw(motaMoi.getCurrentContent()));
        console.log(mota);
        const sendData = {
            id_sp: idSP,
            mo_ta_moi: mota
        };

        axios
            .patch(`${API_URL}/api/nguoi-ban/sua-san-pham`, sendData, {
                headers: {
                    "x-access-token": token
                }
            })
            .then((res) => {
                alert("Cập Nhật Mô tả hoàn tất");
            })
            .catch((err) => {
                alert("Có Lỗi Xảy Ra, Vui Lòng Thử Lại Sau");
            });

        setMoTa(mota);
    };

    const handleConfirmBuy = (e) => {
        e.preventDefault();
        confirmAlert({
            title: "Thông Báo",
            message: (
                <>
                    <h5>Bạn Có Muốn Mua Sản Phẩm Này Không ?</h5>
                    <span>
            Bạn phải mua nó với giá cao nhất, hiện tại nó đang ở mức giá :{" "}
                        {product.gia_mua_ngay} $
          </span>
                </>
            ),
            buttons: [
                {
                    label: "Vâng, Tôi Có",
                    onClick: () => {
                        const sendData = {
                            id_sp: product.id_sp
                        };

                        axios
                            .post(`${API_URL}/api/tai-khoan/mua-san-pham`, sendData, {
                                headers: {
                                    "x-access-token": token
                                }
                            })
                            .then((res) => {
                                alert(
                                    "Xin Cảm Ơn Bạn Đã Mua Sản Phẩm, Sản Phẩm Sẽ Bị Khóa Lại Và Người Bán Sẽ Xử Lí Đơn Hàng Của Bạn"
                                );
                                history.push("/");
                            })
                            .catch((err) => {
                                alert("Có Lỗi Xảy Ra");
                            });
                    }
                },
                {
                    label: "Không, Tôi Sẽ Đấu Giá",
                    onClick: () =>
                        alert("Chúc bạn đấu giá được sản phẩm với mức giá phải chăng")
                }
            ]
        });
    };

    const handleDauGia = (e) => {
        e.preventDefault();
        const sendData = {
            id_sp: idSP,
            gia_dat: giaDat
        };
        axios
            .post(`${API_URL}/api/dau-gia/tham-gia`, sendData, {
                headers: {
                    "x-access-token": token
                }
            })
            .then((res) => {
                let isWin = res.data.isWin;
                let messeage = res.data.messeage;
                if (isWin) {
                    let gia_ht = res.data.gia_hien_tai;
                    setGiaHienTai(gia_ht);
                    alert("Chúc Mừng Bạn Đã Dành Vị Trí Quán Quân");
                } else {
                    if (messeage === "lose. need higher price") {
                        alert("Để Đấu Giá Được Sản Phẩm Này, Bạn Cần Một Mức Giá Cao Hơn");
                    }

                    if (messeage === "you need waiting for auction") {
                        alert(
                            "Để Lượt Đấu Giá Này Có Hiệu Lực Bạn Cần Có Sự Chấp Thuận Của Người Bán"
                        );
                    }
                }
            })
            .catch((err) => {
                switch (err.response.data.message) {
                    case "your product is expired":
                        alert("Sản Phẩm Bạn Đang Đấu Giá Đã Hết Hạn");
                        history.push("/");
                        break;
                    case "your evaluate point too low":
                        alert(
                            "Điểm Đánh Giá Của Bạn Quá Thấp, Bạn Không Đủ Điểm Để Tham Gia Vào Cuộc Đấu Giá"
                        );
                        break;

                    case "you are banned":
                        alert("Bạn Đã Bị Cấm Đấu Giá SP Này");
                        break;

                    case "seller not auction this product":
                        alert("Người Bán Không Có Quyền Đấu Giá Sản Phẩm Này");
                        break;

                    default:
                        alert("Có Lỗi Xảy Ra, Chúng Tôi Đang Cố Gắng Sửa");
                        break;
                }
            });
    };

    const handleTuChoiRaGia = (e) => {
        e.preventDefault();

        axios
            .get(`${API_URL}/api/dau-gia/tu-choi-ra-gia?san_pham=${idSP}`, {
                headers: {
                    "x-access-token": token
                }
            })
            .then((res) => {
                let mess = res.data.messeage;
                if (mess === "auction is empty")
                    alert("Chưa Có Lượt Đấu Giá Nào Cho Sản Phẩm Này, Không Thể Từ Chối");
                else if (mess === "top not found")
                    alert("Không Tìm Thấy Người Cao Nhất");
                else if (mess === "product not found") alert("Không Tìm Thấy Sản Phẩm");
                else alert("Từ Chối Thành Công, Đã Khóa Người Đứng đầu");
            })
            .catch((err) => {
                console.log(err.response.data);
                switch (err.response.data.messeage) {
                    case "unauthorized":
                        alert("Bạn Không Có Quyền Đối Với Sản Phẩm Này");
                        break;

                    default:
                        alert("Có Lỗi Xảy Ra");
                        break;
                }
            });
    };

    return (
        <>
            {product === null ? (
                ""
            ) : (
                <div className="container">
                    <div className="section-title m-4">
                        <span className="caption d-block small">Thông Tin Sản Phẩm</span>
                        <h2 style={{textTransform: "uppercase"}}>{product.ten_sp}</h2>
                        <span className="caption d-block small"></span>
                        <div class="row w-75">
                            <div class="col w-25">
                                <p>+{product.nguoi_ban.diem_duong}</p>
                                <p>-{product.nguoi_ban.diem_am}</p>
                            </div>
                            <div class="col">
                                <img
                                    src={process.env.PUBLIC_URL + "/user.png"}
                                    className="rounded-circle img-fluid img-reponsive"
                                    alt="user"
                                    style={{width: "4rem"}}
                                />
                            </div>

                            <div class="col-10">
                <span className="caption d-block small">
                  Tên Người Bán:
                  <Link to={`/nguoi-dung/thong-tin/${product.nguoi_ban.id}`}>
                    {product.nguoi_ban.ho_ten}
                  </Link>
                </span>
                                <span>
                  Đăng Lúc:{" "}
                                    {new Date(product.publish_date).toLocaleString("vi-VN")}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rom-box">
                        <div className="row">
                            <div className="room-slide-img col-6">
                                <ImageSlider images={product.anh_phu}/>
                                <br/>
                                <br/>
                                <br/>
                                <div className="danh-gia"/>
                            </div>
                            <div className="col-6 mt-5">
                                <div>
                  <span class="mt-2" style={{marginRight: 10}}>
                    chỉ còn lại:{" "}
                  </span>
                                    <p>
                                        <h2>
                                            <Countdown
                                                className="fm-nova-sq text-danger"
                                                date={Date.now() + miliEndDate}
                                                onComplete={() => handleEndDate()}
                                            >
                                                {/* <Completionist /> */}
                                            </Countdown>
                                        </h2>
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <svg
                                        className="bd-placeholder-img rounded mr-5"
                                        width="20"
                                        height="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                        role="img"
                                    >
                                        <rect width="100%" height="100%" fill="#007aff"></rect>
                                    </svg>
                                    <h5 style={{textTransform: "uppercase"}}>
                                        &nbsp;Đánh Giá Từ Chuyên Gia
                                    </h5>
                                </div>
                                <span>
                  <a href="#" target="_blank">
                    {product.ten_sp}
                  </a>
                                    &nbsp;đánh dấu bước tiến mới của&nbsp;
                                    <a
                                        href="https://thegioididong.com/samsung"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                    {product.danh_muc.ten}
                  </a>
                                    &nbsp;trong phân khúc&nbsp;
                </span>
                                <Divider/>
                                <div className="d-flex">
                                    <svg
                                        className="bd-placeholder-img rounded mr-5"
                                        width="20"
                                        height="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                        role="img"
                                    >
                                        <rect width="100%" height="100%" fill="#007aff"></rect>
                                    </svg>
                                    <h5 style={{textTransform: "uppercase"}}>
                                        &nbsp;Thông Tin Sản Phẩm
                                    </h5>
                                </div>
                                <p>
                                    Danh Mục:{" "}
                                    <Link
                                        to={`/danh-muc/${product.danh_muc.id}/${product.danh_muc.ten}`}
                                    >
                                        {product.danh_muc.ten}
                                    </Link>
                                </p>
                                <p>
                                    <br/>
                                    Thởi Gian Còn Lại:{" "}
                                    {product.relative_end_date !== null
                                        ? product.relative_end_date
                                        : new Date(product.end_date).toLocaleString("vi-VN")}
                                </p>
                                <p className="gia-dat">Giá Hiện Tại: {giaHienTai} $</p>
                                <p className="gia-goc">
                                    Giá Mua Ngay: {product.gia_mua_ngay} $
                                </p>
                                <p>Giá Đặt Thấp Nhất: {giaHienTai + product.buoc_gia} $</p>

                                <p>
                                    <i class="fa fa-user" aria-hidden="true"></i> Người Đặt Cao
                                    Nhất:{" "}
                                    {caoNhat === null ||
                                    caoNhat === undefined ||
                                    lodash.isEmpty(caoNhat) ? (
                                        "Không Có Người Đấu Giá"
                                    ) : (
                                        <Link to={`/nguoi-dung/thong-tin/${caoNhat.id_nguoi_dung}`}>
                                            {caoNhat.ho_ten} (+{caoNhat.diem_danhgia_duong}|-
                                            {caoNhat.diem_danhgia_am})
                                        </Link>
                                    )}
                                </p>
                                <Divider/>

                                <div className="d-flex">
                                    <svg
                                        className="bd-placeholder-img rounded mr-5"
                                        width="20"
                                        height="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                        role="img"
                                    >
                                        <rect width="100%" height="100%" fill="#007aff"></rect>
                                    </svg>
                                    <h5 style={{textTransform: "uppercase"}}>
                                        &nbsp;Theo Dõi Sản Phẩm
                                    </h5>
                                </div>

                                <div className="loved-section">
                                    {token !== null ? (
                                        <>
                                            {" "}
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={(e) => handleLove(e)}
                                            >
                                                <i
                                                    className="fa fa-heart"
                                                    style={{color: `${loveStyle}`}}
                                                    aria-hidden="true"
                                                ></i>
                                            </button>
                                            <span> Hoặc </span>
                                        </>
                                    ) : (
                                        ""
                                    )}

                                    <button className="btn btn-outline-primary">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </button>

                                    <button className="btn btn-outline-success m-3">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </button>

                                    <button className="btn btn-outline-secondary">
                                        <i className="fa fa-telegram" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <Divider/>
                                {token !== null ? (
                                    <>
                                        {product.nguoi_ban.id !== idLogin ? (
                                            <>
                                                <a
                                                    data-toggle="collapse"
                                                    href="#collapseExample"
                                                    role="button"
                                                    aria-expanded="false"
                                                    aria-controls="collapseExample"
                                                    className="btn-buynow jsBuy"
                                                >
                                                    ĐÂÚ GIÁ NGAY
                                                </a>
                                                <div class="collapse" id="collapseExample">
                                                    <div class="card card-body">
                                                        <div class="form-group">
                                                            <label for="">Nhập Giá Đặt:</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                value={giaDat}
                                                                onChange={(e) => setGiaDat(e.target.value)}
                                                                class="form-control"
                                                                placeholder="Giá Đặt (tính bằng USD)"
                                                            />
                                                            <button
                                                                class="btn btn-primary mt-2"
                                                                onClick={(e) => handleDauGia(e)}
                                                            >
                                                                Đấu Giá
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        <div className="row mt-2">
                                            {product.nguoi_ban.id !== idLogin ? (
                                                <div className="col-6">
                                                    <a
                                                        onClick={(e) => handleConfirmBuy(e)}
                                                        className="btn btn-ins pay-taichinh"
                                                    >
                                                        MUA NGAY
                                                        <span>Mua với giá cao nhất</span>
                                                    </a>
                                                </div>
                                            ) : (
                                                ""
                                            )}

                                            <div
                                                className="col-6"
                                                data-toggle="modal"
                                                data-target="#modalLichSu"
                                            >
                                                <a
                                                    className="btn btn-ins pay-taichinh bg-success"
                                                    onClick={(e) => handleXemLichSu(e)}
                                                >
                                                    LỊCH SỬ RA GIÁ
                                                    <span>Tham khảo giá sản phẩm</span>
                                                </a>
                                            </div>

                                            <div
                                                className="modal fade"
                                                id="modalLichSu"
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="modelTitleId"
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Lịch Sử Đấu Giá</h5>
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
                                                            <List
                                                                size="large"
                                                                header={<div>Lịch Sử Đấu Giá</div>}
                                                                footer={<div>Hết</div>}
                                                                bordered
                                                                dataSource={lstLichSu}
                                                                renderItem={(item) => (
                                                                    <List.Item>
                                                                        <List.Item.Meta
                                                                            avatar={
                                                                                <img
                                                                                    style={{width: "3rem"}}
                                                                                    src={
                                                                                        process.env.PUBLIC_URL + "/user.png"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            }
                                                                            title={<span>{item.hoten_mask}</span>}
                                                                            description={
                                                                                <div>
                                                                                    Giá Mua Hiện Tại:{item.gia_hien_tai}
                                                                                </div>
                                                                            }
                                                                        />

                                                                        <span
                                                                            pill
                                                                            style={{fontWeight: 700, fontSize: 30}}
                                                                        >
                                      {item.diem}
                                    </span>
                                                                    </List.Item>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                data-dismiss="modal"
                                                            >
                                                                Đóng
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {role !== null && role === 2 ? (
                                                <div className="col-6">
                                                    <a
                                                        onClick={(e) => handleTuChoiRaGia(e)}
                                                        className="btn btn-ins pay-taichinh bg-danger "
                                                    >
                                                        TỪ CHỐI RA GIÁ
                                                        <span>Hủy bỏ người đứng đầu</span>
                                                    </a>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div>
                    <span style={{color: "red", fontWeight: 700}}>
                      {" "}
                        &#9888; Để đấu giá Vui Lòng đăng nhập hoặc đăng kí
                    </span>
                                        <div>
                                            <Link className="btn btn-primary m-2" to="/login">
                                                Đăng Nhập
                                            </Link>
                                            <Link className="btn btn-success" to="/register">
                                                Đăng Kí
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <svg
                            className="bd-placeholder-img rounded mr-5"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect width="100%" height="100%" fill="#007aff"></rect>
                        </svg>
                        <h5 style={{textTransform: "uppercase"}}>
                            &nbsp;Mô Tả Chi Tiết
                            {token === null ||
                            product.nguoi_ban.id !== idLogin ||
                            role === 3 ? (
                                ""
                            ) : (
                                <i
                                    className="fa fa-pencil-square-o"
                                    data-toggle="modal"
                                    data-target="#modelId"
                                    aria-hidden="true"
                                ></i>
                            )}
                        </h5>

                        <div
                            className="modal fade"
                            id="modelId"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Sửa Mô Tả Sản Phẩm</h5>
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
                                        <div className="mb-3">
                                            <label
                                                for="exampleFormControlInput1"
                                                className="form-label"
                                            >
                                                Mô Tả
                                            </label>
                                            <div style={{color: "gray"}}>
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
                                                    {mota}
                                                </ShowMoreText>
                                            </div>
                                            <Editor
                                                editorState={motaMoi}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={(e) => {
                                                    setMoTaMoi(e);
                                                }}
                                            />
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
                                            className="btn btn-primary"
                                            data-dismiss="modal"
                                            onClick={(e) => handleChangeMoTa(e)}
                                        >
                                            Lưu Thông Tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                        {mota}
                    </ShowMoreText>
                </div>
            )}

            <div className="container d-flex mt-5">
                <svg
                    className="bd-placeholder-img rounded mr-5"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <h5 style={{textTransform: "uppercase"}}>
                    &nbsp;5 Sản Phẩm Cùng Danh Mục
                </h5>
            </div>

            <div className="container w-75">
                <div className="row room-items">
                    {namSPCungLoai.map((item, i) => {
                        let img = "no-img.png";
                        if (typeof item.anh !== "undefined" && item.anh.length) {
                            if (typeof item.anh !== "undefined") {
                                img = item.anh;
                            }
                        }
                        return (
                            <ProductItem
                                tokenLogin={token}
                                idLogin={idLogin}
                                i={i}
                                item={item}
                                img={img}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default ProductDetails;
