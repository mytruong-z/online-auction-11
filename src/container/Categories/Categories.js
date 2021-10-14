import ProductItem from "../../components/ProductItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Categories = (props) => {
    let { id, current } = useParams();
    const [title, setTitle] = useState("")
    const [lstProduct, setLstProduct] = useState([])
    const [page, setPage] = useState(0)
    const [sortPrice, setSortPrice] = useState(false)
    const [sortDate, setSortDate] = useState(false)

    useEffect(() => {
        if(sortPrice === false && sortDate === false){

        } 
        else if(sortPrice === true && sortDate === false){
            
        }
        else {

        }
    },[id, page, sortPrice, sortDate])

    return (
    <>
      <section className="search-sec">
        <div className="container">
          <select class="form-select" aria-label="Default select example">
            <option selected>Sắp Xếp Theo</option>
            <option value="1">Ngày Kết Thúc Tăng Dần</option>
            <option value="2">Ngày Kết Thúc Tăng Dần</option>
            <option value="3">Giá Tăng Dần</option>
            <option value="3">Giá Giảm Dần</option>
          </select>
        </div>
      </section>

      <div className="container w-75">
        <div class="d-flex p-2">
          <svg
            class="bd-placeholder-img rounded mr-5"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <h5 style={{ textTransform: "uppercase" }}>Điện Thoại Lenovo</h5>
        </div>

        {/* <div className="row room-items">
            {sp.map((item, i) => {
              let img = "no-img.png";
              if (typeof item.anh !== "undefined" && item.anh.length) {
                if (typeof item.anh !== "undefined") {
                  img = item.anh;
                }
              }
              return <ProductItem i={i} item={item} img={img} />;
            })}
        </div> */}
      </div>
      
    </>
  );
};
export default Categories;
