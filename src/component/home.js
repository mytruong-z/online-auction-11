import React, { useEffect } from 'react';

function Home () {
    useEffect(async () => {

    }, []);

    return (
        <section className="search-sec">
            <div className="container">
                <form action="#" method="post" noValidate="novalidate">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6 col-12 p-0">
                                    <input type="text" className="form-control search-slt"
                                           placeholder="Tìm kiếm"/>
                                </div>
                                <div className="col-lg-3 col-12 p-0">
                                    <select className="form-control search-slt" id="province">
                                        <option>Chọn Loại Sản Phẩm</option>
                                        <option value="1">Điện Thoại</option>
                                        <option value="2">Laptop</option>
                                        <option value="3">Tablet</option>
                                    </select>
                                </div>
                                <div className="col-lg-3 col-12 p-0">
                                    <button type="button" className="btn bg-gradient btn-danger wrn-btn">Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Home;