import React from 'react';
import Login from './container/Auth/login';
import Home from './components/home';
import Register from './container/Auth/register';
import ProductList from './container/Products/ProductList'
import ProductDetails from './container/Products/ProductDetails'
///// User

import UserDetails from './container/Users/UserDetails'
import UserHistory from './container/Users/UserHistory'
import UserLoved from './container/Users/UserLoved'
import UserChangePassword from './container/Users/UserChangePassword'
import ForgotPassword from './container/Auth/forgotPassword';
import UserUpdateInfo from './container/Users/UserUpdateInfo'

///// Seller
import UserAcceptList from './container/Seller/UserAcceptList'

//Admin
import Users from './components/Admin/Users'
import User from './components/Admin/User/UserDetail'
import Products from './components/Admin/Products'
import Categories from './components/Admin/Categories'

import Order from './container/Seller/Order'



const routes = [
    //Admin
    {
        path : '/admin/users',
        exact : false,
        main : ({location}) => <Users location={location} />
    },
    {
        path : '/admin/user',
        exact : false,
        main : ({ match, location }) => <User match={match} location={location} />
    },
    {
        path : '/admin/products',
        exact : false,
        main : ({location}) => <Products location={location} />
    },
    {
        path : '/admin/categories',
        exact : false,
        main : ({location}) => <Categories location={location} />
    },

    //Client
    {
        path : '/register',
        exact : false,
        main : ({location}) => <Register location={location} />
    },
    {
        path : '/login',
        exact : false,
        main : ({location}) => <Login location={location} />
    },
    {
        path : '/forgotPassword',
        exact : false,
        main : ({location}) => <ForgotPassword location={location} />
    },
    {
        path: '/danh-sach-san-pham',
        exact: false,
        main: ({location}) => <ProductList location={location} />
    },
    {
        path: '/danh-muc/:id/:name',
        exact: true,
        main: ({location}) => <ProductList location={location} />
    },  
    {
        path: '/tim-kiem/:searchFor/:searchName',
        exact: true,
        main: ({location}) => <ProductList location={location} />
    },
    {
        path: '/nguoi-dung/thong-tin',
        exact: false,
        main: ({location}) => <UserDetails location={location} />
    },
    {
        path: '/nguoi-dung/yeu-thich',
        exact: false,
        main: ({location}) => <UserLoved location={location} />
    },
    {
        path: '/nguoi-dung/lich-su-dau-gia',
        exact: false,
        main: ({location}) => <UserHistory location={location} />
    },
    {
        path: '/nguoi-dung/doi-mat-khau',
        exact: false,
        main: ({location}) => <UserChangePassword location={location} />
    },
    {
        path: '/nguoi-dung/cap-nhat-thong-tin',
        exact: false,
        main: ({location}) => <UserUpdateInfo location={location} />
    },
    {
        path: '/nguoi-ban/danh-sach-chap-thuan',
        exact: false,
        main: ({location}) => <UserAcceptList location={location} />
    },
    {
        path: '/nguoi-ban/don-hang',
        exact: false,
        main: ({location}) => <Order location={location} />
    },
    {
        path: '/san-pham/:name',
        exact: false,
        main: ({location}) => <ProductDetails location={location} />
    },
    {
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    },



];

export default routes;