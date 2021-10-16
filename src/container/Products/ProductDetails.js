import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider';
import './product.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { API_URL } from '../../config';

const ProductDetails = (props) => {
    const [loveStyle, setLoveStyle] = useState(`gray`);
    const {name} = useParams();

    const [product, setProduct] = useState(null);
    const [mota, setMoTa] = useState('');
    const [namSPCungLoai, setNamSanPhamCungLoai] = useState([]);

    console.log(name);

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
    console.log(product);
    return (
        <>
            {product === null ? (
                ''
            ) : (
                <div className="container">
                    <div className="section-title m-4">
                        <span className="caption d-block small">Thông Tin Sản Phẩm</span>
                        <h1>
                            {product.ten_sp}
                        </h1>
                        <span className="caption d-block small">
              Danh Mục: <a href="#">{product.danh_muc.ten}</a>
            </span>
                    </div>
                    <div className="rom-box">
                        <div className="row">
                            <div className="room-slide-img col-6">
                                <ImageSlider images={product.anh_phu}/>
                                <br/><br/><br/>
                                <div className="danh-gia">
                                    <h4>Đánh Giá Sản Phẩm</h4>
                                    <h5>
                                        <a href="#" target="_blank">{product.ten_sp}</a>
                                        &nbsp;đánh dấu bước tiến mới của&nbsp;
                                        <a href="https://thegioididong.com/samsung"
                                           target="_blank">{product.danh_muc.ten}</a>
                                        &nbsp;trong phân khúc&nbsp;
                                    </h5>
                                </div>
                            </div>
                            <div className="col-6 mt-5">
                                <h3>Thông Tin Người Bán</h3>
                                <span className="gia-goc">Tên: {product.nguoi_ban.ho_ten}</span>
                                <p>Email: {product.nguoi_ban.email}</p>

                                <h3>Thông Tin Sản Phẩm</h3>
                                <p>{product.mo_ta}</p>

                                <h3 className="gia-dat">Giá Hiện Tại: {product.gia_hien_tai} $</h3>
                                <span className="gia-goc">Giá Mua Ngay: {product.gia_mua_ngay} $</span>

                                <p>Giá Đặt Thấp Nhất: {product.gia_hien_tai + product.buoc_gia} $</p>

                                <h3>Theo Dõi Sản Phẩm</h3>
                                <span className="cs-icon-heart">
                                    <i className="fa fa-heart"
                                       style={{color: `${loveStyle}`}}
                                       onClick={(e) => handleLove(e)}
                                       aria-hidden="true"
                                    ></i>
                                </span>

                                <br/><br/>
                                <a href="#" className="btn-buynow jsBuy">
                                    ĐÂÚ GIÁ NGAY
                                </a>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        <a
                                            href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                                            className="btn btn-ins pay-taichinh  "
                                        >
                                            MUA NGAY
                                            <span>Mua với giá cao nhất</span>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a
                                            href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                                            className="btn btn-ins pay-taichinh  "
                                        >
                                            LỊCH SỬ RA GIÁ
                                            <span>Tham khảo giá sản phẩm</span>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a
                                            href="/tra-gop/dtdd/samsung-galaxy-z-fold3-5g-512gb?code=0131491002612"
                                            className="btn btn-ins pay-taichinh  "
                                        >
                                            TỪ CHỐI RA GIÁ
                                            <span>Hủy bỏ người đứng đầu</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ProductDetails;
