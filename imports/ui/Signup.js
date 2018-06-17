import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import Button from '@material-ui/core/Button';


export default class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:''
        };
    }

    setEmail(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            email:e.target.value,
            error:''
        });
    }

    setPassword(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            password:e.target.value,
            error:''
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('submit');
        if(this.state.password.length < 9){
            this.setState({error:'Password is too short.'});
            return;
        }
        Accounts.createUser({
            email:this.state.email,
            password:this.state.password
        }, (err)=>{ 
            console.log( 'Signup callback',err);
            this.setState({
                error:err.reason
            });
        } );
        this.setState({
            email:'',
            password:''
        });
    }

    render(){
         return(
             <div className="boxed-view" >
                <div className="boxed-view__box" >
                    <h1>App title</h1>
                    <p>Signup from here</p>
                    <p>{this.state.error}</p>
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={this.state.email} 
                                onChange={this.setEmail.bind(this)}/>
                        <input type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.setPassword.bind(this)} />
                        <Button variant="contained"
                                style={{fontSize:2 + "rem"}}
                                color="primary"
                                type="submit">
                            Create Account
                        </Button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
                 
             </div>
         );
    }
}