import React from 'react';
import Login from './component/login';
import Home from './component/home';
import Register from './component/register';


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
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    }
];

export default routes;