import { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import "./product.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { API_URL } from "../../config";

const ProductDetails = (props) => {
  const [loveStyle, setLoveStyle] = useState(`gray`);
  const { name } = useParams();

  const imgs = [
    {
      name: "iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png"
    },
    {
      name: "iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png"
    }
  ];

  const [product, setProduct] = useState(null);
  const [mota, setMoTa] = useState("");
  const [namSPCungLoai, setNamSanPhamCungLoai] = useState([]);
  
  console.log(name)

  useEffect(() => {
    axios.get(`${API_URL}/api/san-pham/details/${name}`).then((res) => {
      setProduct(res.data);
      setMoTa(res.data.mota);
    });
  }, []);

  const handleLove = (e) => {
    e.preventDefault();
    if (loveStyle === `gray`) {
      setLoveStyle(`red`);
    } else {
      setLoveStyle(`gray`);
    }
  };
  console.log(product)
  return (
    <>
      {product === null ? (
        ""
      ) : (
        <div class="container">
          <div class="section-title m-4">
            <span class="caption d-block small">Thông Tin Sản Phẩm</span>
            <h1>
              {product.ten_sp}
              <i
                class="fa fa-heart"
                style={{ color: `${loveStyle}` }}
                onClick={(e) => handleLove(e)}
                aria-hidden="true"
              ></i>
            </h1>
            <span class="caption d-block small">
              Danh Mục: <a href="#">{product.danh_muc.ten}</a>
            </span>
          </div>
          <div className="rom-box">
            <div class="row">
              <div className="room-slide-img col-4">
                <ImageSlider images={product.anh_phu} />
              </div>
              <div className="col-8 mt-5">
                Người Bán: <a href="#">{product.nguoi_ban.ho_ten}</a>
                <p>
                  <h3 class="gia-dat">Giá Hiện Tại: { product.gia_hien_tai } $</h3>
                  <span class="gia-goc">Giá Mua Ngay: {product.gia_mua_ngay} $</span>
                </p>
                <p>Giá Đặt Thấp Nhất: {product.gia_hien_tai + product.buoc_gia} $</p>
                <div class="block__promo">
                  <div class="pr-top">
                    <p class="pr-txtb">Khuyến mãi </p>
                    <i class="pr-txt">
                      Giá và khuyến mãi dự kiến áp dụng đến 23:00 31/10
                    </i>
                  </div>
                  <div class="pr-content">
                    <div class="pr-item">
                      <div
                        class="divb t1"
                        data-promotion="793270"
                        data-group="Tặng"
                        data-discount="0"
                        data-productcode="7042011000267"
                        data-tovalue="6000"
                      >
                        <span class="nb">1</span>
                        <div class="divb-right">
                          <p>
                            Đặc quyền dán màn hình
                            <a href="https://www.thegioididong.com/tin-tuc/sam-galaxy-z-fold3-5g-va-z-flip3-5g-dan-man-hinh-1-nam-1387023">
                              {" "}
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        class="divb t6"
                        data-promotion="796843"
                        data-group="WebNote"
                        data-discount="0"
                        data-productcode=""
                        data-tovalue="9500"
                      >
                        <span class="nb">2</span>
                        <div class="divb-right">
                          <p>
                            Giảm thêm 5% khi mua cùng sản phẩm bất kỳ có giá cao
                            hơn{" "}
                            <a href="http://www.thegioididong.com/tin-tuc/mung-het-cach-ngan-giam-2-lan-tien-1388924">
                              {" "}
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        class="divb t6"
                        data-promotion="791066"
                        data-group="WebNote"
                        data-discount="0"
                        data-productcode=""
                        data-tovalue="7000"
                      >
                        <span class="nb">3</span>
                        <div class="divb-right">
                          <p>
                            Gói dịch vụ ưu tiên cao cấp và phòng chờ hạng thương
                            gia{" "}
                            <a href="https://www.thegioididong.com/tin-tuc/dich-vu-uu-tien-phong-cho-thuong-gia-galaxy-z-fold3-z-flip3-1374427">
                              {" "}
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        class="divb t6"
                        data-promotion="791068"
                        data-group="WebNote"
                        data-discount="0"
                        data-productcode=""
                        data-tovalue="5000"
                      >
                        <span class="nb">4</span>
                        <div class="divb-right">
                          <p>
                            Hỗ trợ thu cũ đổi mới{" "}
                            <a href="https://www.thegioididong.com/thu-cu-doi-moi">
                              {" "}
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        class="divb t6"
                        data-promotion="788271"
                        data-group="WebNote"
                        data-discount="0"
                        data-productcode=""
                        data-tovalue="1000"
                      >
                        <span class="nb">5</span>
                        <div class="divb-right">
                          <p>
                            Trả góp 0% thẻ tín dụng{" "}
                            <a href="http://www.thegioididong.com/tin-tuc/mua-samsung-galaxy-tra-gop-0-qua-the-tin-dung-1386100">
                              {" "}
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="javascript:void(0);" class="btn-buynow jsBuy">
                  ĐÂÚ GIÁ NGAY
                </a>
                <div class="row mt-2">
                  <div class="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      class="btn btn-ins pay-taichinh  "
                    >
                      MUA NGAY
                      <span>Mua Sản Phẩm Với Một Số Tiền Cực Lớn</span>
                    </a>
                  </div>
                  <div class="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      class="btn btn-ins pay-taichinh  "
                    >
                      LỊCH SỬ RA GIÁ
                      <span>Tham Khảo Giá Sản Phẩm</span>
                    </a>
                  </div>
                  <div class="col-4">
                    <a
                      href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                      class="btn btn-ins pay-taichinh  "
                    >
                      TỪ CHỐI RA GIÁ
                      <span>Hủy Bỏ Người Đứng Đầu</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="danh-gia">
            <h4>Bài Viết đánh giá</h4>
            <h5>
              <a
                href="https://www.thegioididong.com/dtdd/samsung-galaxy-z-fold-3-512gb"
                target="_blank"
                title="Tham khảo giá điện thoại Samsung Galaxy Z Fold3 5G 512GB chính hãng"
              >
                Galaxy Z Fold3 5G
              </a>
              &nbsp;đánh dấu bước tiến mới của&nbsp;
              <a
                href="https://thegioididong.com/samsung"
                target="_blank"
                title="Tham khảo sản phẩm Samsung chính hãng tại Thegioididong.com"
              >
                Samsung
              </a>
              &nbsp;trong phân khúc&nbsp;
              <a
                href="https://www.thegioididong.com/dtdd"
                target="_blank"
                title="Tham khảo giá điện thoại smartphone chính hãng"
              >
                điện thoại
              </a>
              &nbsp;gập cao cấp khi được cải tiến về độ bền cùng những nâng cấp
              đáng giá về cấu hình hiệu năng, hứa hẹn sẽ mang đến trải nghiệm sử
              dụng đột phá cho người dùng.
            </h5>
            <p>
              Đầu tiên, khung viền Galaxy Z Fold3 được hoàn thiện bằng chất liệu
              Armor Aluminum cao cấp nhất từ trước đến giờ nhằm tăng cường được
              độ bền, mà vẫn đảm bảo được trọng lượng cân đối đem tới cảm giác
              vô cùng chắc chắn và cao cấp.&nbsp;
            </p>
            <p>
              Khi không dùng có thể gấp gọn như một cuốn sổ ghi chú nhỏ dễ dàng
              bỏ túi mang theo bên mình mọi lúc mọi nơi.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetails;
