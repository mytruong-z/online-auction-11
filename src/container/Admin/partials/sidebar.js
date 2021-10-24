import React, {Component, useEffect, useState} from 'react';
import { Route, Link } from 'react-router-dom';
import {Nav, NavLink} from 'react-bootstrap';
import {FaChartBar, FaCoins, FaNewspaper, FaClipboardCheck, FaUserAlt, FaSignOutAlt} from "react-icons/fa";

function SideBar(props) {
    const {adminLogin} = props;
    const menus = [
        {
            name: 'Báo Cáo',
            to: '/admin',
            icon: <FaChartBar/>,
            exact: true
        },
        {
            name: 'DS Người dùng',
            to: '/admin/users',
            icon: <FaUserAlt/>,
            exact: true
        },
        {
            name: 'DS Hoá đơn',
            to: '/admin/bills',
            icon: <FaCoins/>,
            exact: true
        },
        {
            name: 'Quản lý tin',
            to: '/admin/news',
            icon: <FaNewspaper/>,
            exact: true
        },
        {
            name: 'Xác minh bài viết',
            to: '/admin/posts',
            icon: <FaClipboardCheck/>,
            exact: true
        },
    ];

    //Custom Link
    const MenuLink = ({label, to, activeOnlyWhenExact, icon}) => {
        return (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({match}) => {
                    const active = match ? 'active bg-pink' : '';
                    const loginStatus = (adminLogin && (to === '/admin/login')) ? 'hidden' : '';

                    return (
                        <li className={`nav-item admin-item rounded-3 mb-1 ${loginStatus}`}>
                            <a href={to} className={`nav-link ${active}`} aria-current="page">
                                <svg className="bi me-2" width="16" height="16">
                                    {icon}
                                </svg>
                                <span className="d-none d-sm-inline-block">{label}</span>
                            </a>
                        </li>
                    );
                }}
            />
        );
    };

    function showMenus(menus) {
        var result = null;

        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                        icon={menu.icon}
                    />
                );
            });
        }

        return result;
    };

    return (
        <div className="admin-side-bar bg-dark shadow">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <div className="logo">
                        <img src="/NTVN-logo.png" width="70" className="p-2"/>
                    </div>
                </a>
                <hr className="text-pink"/>
                <ul className="nav nav-pills flex-column mb-auto">
                    {showMenus(menus)}
                </ul>
                <hr className="text-pink"/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <MenuLink
                        label={'Đăng xuất'}
                        to={'/admin/logout'}
                        activeOnlyWhenExact={true}
                        icon={<FaSignOutAlt/>}
                    />
                </ul>
            </div>
        </div>
    );
}

export default SideBar;