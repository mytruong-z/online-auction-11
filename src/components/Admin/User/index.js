import React from 'react';
import { Route } from 'react-router-dom';
import User from "../User/UserDetail";

const Users = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={User}/>
            </div>

        </div>
    );

};

export default Users;