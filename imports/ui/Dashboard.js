import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

class Dashboard extends Component {
    render() {
        return (
            <div className="container container__bg">
                
                <Header title="App Title"/>
                <div className="dashboard" >
                    Dashboard page content
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);