import React from 'react';
import Login from './container/Auth/login';
import Home from './components/home';
import Register from './container/Auth/register';
import ProductList from './container/Products/ProductList'

///// User 

import UserDetails from './container/Users/UserDetails'
import UserHistory from './container/Users/UserHistory'
import UserLoved from './container/Users/UserLoved'

///// Seller




const routes = [
    
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
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    }

];

export default routes;