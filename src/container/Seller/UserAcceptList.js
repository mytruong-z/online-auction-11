import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

const UserAcceptList = (props) => {
  let [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  let [topDat, setTopDat] = useState(null);

  
  const removeUserFromList = id => {
    data = data.filter(dg => dg.id_dau_gia !== id)
    setData(data)
  }

  const handleChapNhanNguoiDung = (e, id) => {
    e.preventDefault()
    
    axios.get(`${API_URL}/api/dau-gia/chap-thuan?yeu_cau=${id}`,{
      headers: {
        "x-access-token": token
      }
    }).then(res => {
      alert('Yêu Cầu Đã Được Chấp Thuận')
      removeUserFromList(id)
    }).catch(err => {
      let mess = err.response.data.messeage
      switch (mess) {
        case "request not found or invalid":
          alert('Yêu Cầu Không Hợp Lệ')
          break;
        case "User Not Authorized":
          alert('không Có Quyền Thực Hiện Thao Tác Này')
          break
        default:
          alert('Lỗi Xảy Ra')
          break;
      }
    })
  }

  const handleTuChoiNguoiDung = (e, id) => {
    e.preventDefault()

    axios.get(`${API_URL}/api/dau-gia/huy-bo?yeu_cau=${id}`,{
      headers: {
        "x-access-token": token
      }
    }).then(res => {
      alert('Yêu Cầu Đã Bị Từ Chối')
      removeUserFromList(id)
    }).catch(err => {
      let mess = err.response.data.messeage
      switch (mess) {
        case "request not found or invalid":
          alert('Yêu Cầu Không Hợp Lệ')
          break;
        case "User Not Authorized":
          alert('không Có Quyền Thực Hiện Thao Tác Này')
          break
        default:
          alert('Lỗi Xảy Ra')
          break;
      }
    })
  }

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
    }
    axios
      .get(`${API_URL}/api/dau-gia/danh-sach-cho`, {
        headers: {
          "x-access-token": userLocal.token
        }
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);


  return (
    <div>
      <div className="section-title m-4">
        <span className="caption d-block small">Trang Người Dùng</span>
        <h2>Thông tin đơn hàng</h2>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Tên Người Đặt</th>
            <th>Giá Đặt</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Tác Vụ</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ?
            data.map((dau_gia) => {
              return (
                <tr>
                  <td>
                    <Link to={`/san-pham/${dau_gia.path}`}>
                      {dau_gia.ten_sp}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/nguoi-dung/thong-tin/${dau_gia.id_nguoi_dau_gia}`}
                    >
                      {dau_gia.ho_ten}
                    </Link>
                  </td>
                  <td>{dau_gia.gia_mua} $</td>
                  <td>{new Date(dau_gia.ngay_dat).toLocaleString("en-US")}</td>

                  <td>
                    <span class="fw-bold text-warning">Đang Chờ</span>
                  </td>
                  <td>
                    <>
                      <button class="btn btn-success btn-action" onClick={e => handleChapNhanNguoiDung(e, dau_gia.id_dau_gia)}>
                        Chấp Thuận
                      </button>
                      <button class="btn btn-danger btn-action" onClick={e => handleTuChoiNguoiDung(e , dau_gia.id_dau_gia )} >Hủy</button>
                    </>
                  </td>
                </tr>
              );
            }) : 'Trống'}
        </tbody>
      </table>
    </div>
  );
};

export default UserAcceptList;
