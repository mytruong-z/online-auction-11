import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { addNotificationData, writeUnRead } from "../../../model/notificationModel";

const UserUpgradeList = (props) => {
  let [listUser, setListUser] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let userLocal = null;
    if (localStorage.user) {
      userLocal = JSON.parse(localStorage.user);
      setToken(userLocal.token);
      axios
        .get(`${API_URL}/api/admin/quan-ly-nguoi-dung/list-user-upgrade`, {
          headers: {
            "x-access-token": userLocal.token
          }
        })
        .then((res) => {
          setListUser(res.data);
        });
    }
  }, []);
  const removeUserFromList = id => {
    listUser = listUser.filter(u => u.id_nguoi_dung !== id)
    setListUser(listUser)
  }
  const handleAccept = (e, id) => {
    e.preventDefault()
    axios.get(`${API_URL}/api/admin/quan-ly-nguoi-dung/accept-upgrade?id_nguoi_dung=${id}`,{
        headers: {
            "x-access-token": token
        }
    }).then(res => {    
        alert('Nâng Cấp Thành Công')
        removeUserFromList(id)
        addNotificationData(id, "Yêu Cầu Trở Thành Người Bán Của Bạn Đã Được Chấp Thuận", 1)
    }).catch(err => {
        alert('Nâng Cấp Thất Bại')
    })
  }

  const handleDecline = (e, id) => {
    e.preventDefault()
    axios.get(`${API_URL}/api/admin/quan-ly-nguoi-dung/decline-upgrade?id_nguoi_dung=${id}`,{
        headers: {
            "x-access-token": token
        }
    }).then(res => {    
        alert('Hủy Yêu cầu Thành Công')
        removeUserFromList(id)
        addNotificationData(id, "Yêu Cầu Trở Thành Người Bán Của Bạn Bị Từ Chối", 2)

    }).catch(err => {
        alert('Hủy yêu cầu Thất Bại')
    })
  }
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ Tên</th>
            <th>Quyền Mong Muốn</th>
            <th>Xử Lí</th>
          </tr>
        </thead>
        <tbody>
          {listUser.length === 0
            ? "trống"
            : listUser.map((item, idx) => {
                return (
                  <tr>
                    <td scope="row">{idx}</td>
                    <td>{item.ho_ten}</td>
                    <td>{item.quyen_mong_muon}</td>
                    <td>
                      <>
                        <button class="btn btn-success btn-action" onClick={e => handleAccept(e, item.id_nguoi_dung)}>
                          Chấp Thuận
                        </button>
                        <button class="btn btn-danger btn-action" onClick={e => handleDecline(e, item.id_nguoi_dung)}>Hủy</button>
                      </>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
};

export default UserUpgradeList;
