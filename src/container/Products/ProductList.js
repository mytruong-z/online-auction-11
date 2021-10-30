import ProductItem from "../../components/ProductItem";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../config";

const ProductList = (props) => {
    let {id, searchName, searchFor} = useParams();
    const [title, setTitle] = useState("");
    const [lstProduct, setLstProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [sortPrice, setSortPrice] = useState(false);
    const [sortDate, setSortDate] = useState(false);
    const [totalPage, setTotalPage] = useState(0);

    const [idLogin, setIdLogin] = useState(null);
    const [token, setToken] = useState(null)
    useEffect(() => {

        let userLocal = null;
        if (localStorage.user) {
            userLocal = JSON.parse(localStorage.user);
            setIdLogin(userLocal.user.id_nguoi_dung);
            setToken(userLocal.token);
        }

        if (id != null) {
            axios
                .get(`${API_URL}/api/danh-muc/tim-danh-muc?danh_muc=${id}`)
                .then((res) => setTitle(res.data.ten));
            if (sortPrice === false && sortDate === false) {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}&cate=${id}`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            } else if (sortPrice === true && sortDate === false) {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}&cate=${id}&orderPrice=1`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            } else {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}&cate=${id}&orderTime=1`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            }
        } else if (searchName != null && searchFor != null) {
            if (searchFor === 1) {
                setTitle("Tìm Kiếm Với Tên Sản Phẩm :" + searchName)


                if (sortPrice === false && sortDate === false) {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?name=${searchName}&per_page=6&current_page=${page}`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                } else if (sortPrice === true && sortDate === false) {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?name=${searchName}&per_page=6&current_page=${page}&orderPrice=1`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                } else {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?name=${searchName}&per_page=6&current_page=${page}&orderTime=1`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                }

            } else {
                setTitle("Tìm Kiếm Với Tên Danh Mục :" + searchName)

                if (sortPrice === false && sortDate === false) {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?cate=${searchName}&per_page=6&current_page=${page}`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                } else if (sortPrice === true && sortDate === false) {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?cate=${searchName}&per_page=6&current_page=${page}&orderPrice=1`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                } else {
                    axios
                        .get(`${API_URL}/api/san-pham/tim-kiem?cate=${searchName}&per_page=6&current_page=${page}&orderTime=1`)
                        .then((res) => {
                            setLstProduct(res.data.products)
                            setTotalPage(res.data.last_page)
                        });
                }

            }
        } else {
            setTitle("Xem Toàn Bộ Sản Phẩm")
            if (sortPrice === false && sortDate === false) {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            } else if (sortPrice === true && sortDate === false) {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}&orderPrice=1`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            } else {
                axios
                    .get(`${API_URL}/api/danh-muc/danh-sach-san-pham?per_page=6&current_page=${page}&orderTime=1`)
                    .then((res) => {
                        setLstProduct(res.data.products)
                        setTotalPage(res.data.last_page)
                    });
            }
        }

    }, [id, page, sortPrice, sortDate, searchName]);

    const mapPage = totalPage => {
        var indents = [];

        for (let i = 1; i <= totalPage; i++) {
            let active = '';
            if (i === page) active = 'active'
            indents.push(<li className={`page-item ${active}`}>
                <Link className="page-link" onClick={e => {
                    e.preventDefault();
                    setPage(i)
                }}>
                    {i}
                </Link>
            </li>);
        }
        return indents;
    }

    const handleNextPage = e => {
        e.preventDefault();
        let curr = page + 1;
        setPage(curr);
    }

    const handlePreviousPage = e => {
        e.preventDefault();
        let curr = page - 1;
        setPage(curr);
    }

    const handleSelectChange = e => {

        let value = e.target.value;
        value = parseInt(value)
        if (value === 1) {
            setSortPrice(false)
            setSortDate(true)
        } else if (value === 2) {
            setSortPrice(true)
            setSortDate(false)
        } else {
            setSortPrice(false)
            setSortDate(false)
        }
    }

    return (
        <>
            <section className="search-sec" onChange={e => handleSelectChange(e)}>
                <div className="container">
                    <select className="form-select">
                        <option selected>Sắp Xếp Theo</option>
                        <option value="1">Ngày Kết Thúc Giảm Dần</option>
                        <option value="2">Giá Tăng Dần</option>
                    </select>
                </div>
            </section>

            <div className="container w-75">
                <div className="d-flex p-2">
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
                    <h5 style={{textTransform: "uppercase"}}>&nbsp;{title}</h5>
                </div>

                <div className="row room-items">
                    {lstProduct.map((item, i) => {
                        let img = "no-img.png";
                        if (typeof item.anh !== "undefined" && item.anh.length) {
                            if (typeof item.anh !== "undefined") {
                                img = item.anh;
                            }
                        }
                        return <ProductItem tokenLogin={token} idLogin={idLogin} i={i} item={item} img={img}/>;
                    })}
                </div>
            </div>
            <nav
                aria-label="Page navigation"
                className="d-flex justify-content-center">

                <ul className="pagination">
                    {(page === 1) ? '' : <li className="page-item disabled">
                        <Link className="page-link" onClick={e => handlePreviousPage(e)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>}
                    {mapPage(totalPage)}
                    {(page === totalPage || totalPage === 0) ? '' : <li className="page-item">
                        <Link className="page-link" onClick={e => handleNextPage(e)} href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>}

                </ul>
            </nav>
        </>
    );
};
export default ProductList;
