import React from 'react';
import { Route } from 'react-router-dom';
import Product from "../Product/ProductDetail";

const Users = (props) => {
    const {match} = props;
    const url = match.url;
    console.log('ne:' + props);

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={Product}/>
            </div>

        </div>
    );

};

export default Users;