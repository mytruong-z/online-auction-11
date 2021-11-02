import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from '../../components/Menu';
import Footer from '../../components/footer';
import routes from '../../routes';

//// firebase

import { firebaseApp } from "../../config/firebase-config";

class App extends Component {

    constructor(props){
        super(props);
        // this.refDB = realtimeDB.ref();
        // this.refItem = realtimeDB.ref().child("developers").child("1");
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {/* Menu */}
                    <Menu />
                    {/* Noi Dung */}
                    <Switch>
                        { this.showContentMenu(routes) }
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }

    showContentMenu = (routes) => {
        var result = null;

        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }

        return result;
    }
}

export default App;