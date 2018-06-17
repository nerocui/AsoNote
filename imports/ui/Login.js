import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);

        this.state={
            error:'',
            email:'',
            password:''
        };
    }

    onSubmit(e){
        e.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, 
            (err)=>{
                console.log('Logging in, ', err);
                const e = err?err.reason:'';
                this.setState({
                    error:e
                });
        });
        this.setState({
            email:'',
            password:''
        });
    }

    setEmail(e){
        e.preventDefault();
        this.setState({
            email:e.target.value,
            error:''
        });
    }

    setPassword(e){
        e.preventDefault();
        this.setState({
            password:e.target.value,
            error:''
        });
    }

    render() {
        return (
            <div className="boxed-view" >
                <div className="boxed-view__box" >
                    <h1>App Title</h1>
                    <p>Login from here</p>
                    <p>{this.state.error}</p>
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.setEmail.bind(this)} />
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.setPassword.bind(this)} />
                        <Button variant="contained"
                                style={{fontSize:2 + "rem"}}
                                color="primary"
                                type="submit">
                            Login
                        </Button>
                    </form>
                    <Link to="/signup" > Don't have an Account? </Link>
                </div>
                
            </div>
        );
    }
}

export default withRouter(Login);