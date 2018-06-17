import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Accounts} from 'meteor/accounts-base';


export default class NotFound extends Component {

    render() {
        return (
            <div className="boxed-view" >
                <div className="boxed-view__box" >
                    <h1>Page not found</h1>
                    <p>Maybe your are lost?</p>
                    <Link to="/" >
                        <Button 
                                variant="contained"
                                style={{fontSize:2 + "rem"}}
                                color="primary"
                                type="submit">
                            Go To Home Page
                        </Button>
                    </Link>
                    
                </div>
                
            </div>
        );
    }
}