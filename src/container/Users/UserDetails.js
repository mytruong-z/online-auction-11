import './user.css'

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
  return (
    <div class="container">
      <div class="section-title m-4">
        <span class="caption d-block small">Trang Người Dùng</span>
        <h2>Thông tin cá nhân</h2>
      </div>

      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="justify-content-center">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div className="col-sm-2 user-point">
                    <p>+4</p>
                    <p>-2</p>
                </div>
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                    
                      <img
                        src={process.env.PUBLIC_URL + "/user.png"}
                        class="rounded-circle"
                        alt="user"
                        style={{ width : "12rem" }}
                      />
                    </div>
                    <h6 class="f-w-600">Johnny Truong</h6>
                    <h7 class="">123 hung vuong</h7>
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
                        <h6 class="text-muted f-w-400">MNHJ</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Ngày Sinh</p>
                        <h6 class="text-muted f-w-400">01 - 01 - 1900</h6>
                      </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                     Yêu Cầu Trở Thành Seller
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Quyền Hạn Hiện Tại</p>
                        <h6 class="text-muted f-w-400">User</h6>
                        <button class="btn btn-danger">Trở Thành Seller</button>
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
    </div>
  );
};
export default UserDetails;