import React, { Component } from 'react';

export default class Card extends Component{
    render(){
        return (
            <div className="card" onClick={()=>window.open(this.props.link)}>
                <img src={this.props.src}/>
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}