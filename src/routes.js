import React from 'react';
import Login from './container/Auth/login';
import Home from './components/home';
import Register from './container/Auth/register';
import Categories from './container/Categories/Categories'

const routes = [
    {
        path : '/login',
        exact : false,
        main : ({location}) => <Login location={location} />
    },
    {
        path : '/register',
        exact : false,
        main : ({location}) => <Register location={location} />
    },
    {
        path: '/danh-sach-san-pham',
        exact: false,
        main: ({location}) => <Categories location={location} />
    },
    {
        path: '/danh-muc/:id/:name',
        exact: true,
        main: ({location}) => <Categories location={location} />
    },  
    {
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    }

];

export default routes;