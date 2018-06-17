import React, { Component } from 'react';
import {Accounts} from 'meteor/accounts-base';

export default class Header extends Component {

    onLogout(){
        Accounts.logout();
    }


    render() {
        return (
            <div className="header" >
                <h1>{this.props.title}</h1>
                <button className="button right button__logout" onClick={this.onLogout.bind(this)} >Logout</button>
            </div>
        );
    }
}
