import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import axios from 'axios'
import {pathSplitting} from '../utils/pathSplit'
import {API_URL} from '../config'
//@LoanNgo, You can rely on this variable to check the login status: localStorage;

const Menu = () => {
    
    const [listDMPC, setListDMPC] = useState([]);
    const [listDMDT, setListDMDT] = useState([]);
    const history = useHistory();
   
    useEffect(() => {
        axios.get(`${API_URL}/danh-muc/danh-sach-danh-muc-theo-cap?cap=0`)
            .then(res=> setListDMDT(res.data))

        axios.get(`${API_URL}/danh-muc/danh-sach-danh-muc-theo-cap?cap=1`)
            .then(res=> setListDMPC(res.data))
        
    },[])
    return (
        <div className="bg-light shadow">
            <Nav defaultActiveKey="/home" as="ul" className="container justify-content-between">
                <div className="logo">
                    <a href="/"><img src="/aution_logo.png" width="100" className="p-2" alt="logo"/></a>
                </div>
                <div className="d-flex">
                    <li className="my-li align-items-center d-grid nav-item px-2">
                        <Link to="/" className="text-pink">Trang Chủ</Link>
                    </li>

                    <li className="my-li align-items-center d-grid nav-item">
                    <div className="cate-dropdown ">
                      <li className="nav-link text-left cateBtn" onClick={e => history.push("/danh-sach-san-pham")}>
                        Danh Mục
                        <i className="fa fa-caret-down"/>
                      </li>
                      <div className="cate-content">
                        <div className="row">
                          <div className="col-4">
                            <h5>Máy Tính</h5>
                            <ul>
                              {listDMPC.length !== 0 && listDMPC.map(pc => {
                                  return (
                                      <>
                                            <li>
                                            <Link to={`/danh-muc/${pc.id_danh_muc}/${pathSplitting(pc.ten)}`}>{pc.ten}</Link>
                                            </li>
                                      </>
                                  )
                              })}
                            </ul>
                          </div>
                          <div className="col-4">
                            <h5>Điện thoại</h5>
                            <ul>
                            {listDMDT.length !== 0 && listDMDT.map(dt => {
                                  return (
                                      <>
                                            <li>
                                                <Link to={`/danh-muc/${dt.id_danh_muc}/${pathSplitting(dt.ten)}`}>{dt.ten}</Link>
                                            </li>
                                      </>
                                  )
                              })}
                            </ul>
                          </div>
                          
                          <div className="col-4">
                            <img
                              src={
                                process.env.PUBLIC_URL + "/tech.png"
                              }
                              alt="pic"
                              width="300"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                    
                </div>
            </Nav>
        </div>
    );
}

export default Menu;