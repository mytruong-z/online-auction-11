import { CLOUDINARY_URL } from "../config";
import { Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import {Link} from 'react-router-dom'

const ProductItem = (props) => {
  const { i, item, img } = props;
  return (
      <>
    <div key={i} className="col-lg-4 col-12 d-grid pb-5">
      <Card style={{ width: "18rem", height: "35rem" }}>
        <Card.Img variant="top" src={`${CLOUDINARY_URL}/product/${img}`} />
        <Card.Body>
          <Card.Title>{item.ten_sp}</Card.Title>
          <Card.Text>
            Giá:
            <span className="fw-bold">
              <NumberFormat
                value={item.gia_hien_tai}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              (USD)
            </span>{" "}
            <br />
            Người Bán: <Link to={`/nguoi-dung/thong-tin/${item.nguoi_ban.id}`}>
            <span className="fw-bold">
              {item.nguoi_ban.ho_ten} (+{item.nguoi_ban.diem_duong} | -
              {item.nguoi_ban.diem_am} )
            </span> </Link>
            <br />
            {item.isMoi ? (
              <>
                <img src={process.env.PUBLIC_URL + "/new.gif"} alt="new" />{" "}
                <span>{item.relative_publish_date}</span>
              </>
            ) : (
              ""
            )}
            {item.relative_end_date ? (
              <>
                Sắp Kết Thúc: <span>{item.relative_end_date}</span>
              </>
            ) : (
              ""
            )}
          </Card.Text>
          <Link
            to={`/san-pham/${item.path}`}
            className="cs-btn-detail btn btn-default text-white"
          >
            Chi tiết
          </Link>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};

export default ProductItem;
