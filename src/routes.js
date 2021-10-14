import React from 'react';
import Login from './container/Auth/login';
import Home from './components/home';
import Register from './container/Auth/register';
import ProductList from './container/Products/ProductList'

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
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    }

];

export default routes;