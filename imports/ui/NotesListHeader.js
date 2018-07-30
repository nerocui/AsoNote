import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import { tween } from "popmotion";

const Add1 = posed.div({
  normal:{rotate:0, scale:1, transition:props=>tween({...props, duration:400})},
  rotate:{rotate:90, scale:1.1, transition:props=>tween({...props, duration:400})}
});

const Add2 = posed.div({
  normal:{rotate:0, scale:1, y:-12, x:8, transition:props=>tween({...props, duration:300})},
  rotate:{rotate:90, scale:1.1, y:-12, x:8, transition:props=>tween({...props, duration:300})}
});

var StyledBar1 = styled(Add1)`
  width: 2rem;
  height: .4rem;
  background-color: white;
`;


var StyledBar2 = styled(Add2)`
  width: .4rem;
  height: 2rem;
  background-color: white;
`;

class NotesListHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      hover:false
    };
  }

  render(){
    return (
      <div className="item-list__header">
        <div className="button--add" 
                onClick={() => {
                  this.props.meteorCall('notes.insert', (err, res) => {
                    if (res) {
                      this.props.Session.set('selectedNoteId', res);
                    }
                  });
                }}
                onMouseEnter={()=>{
                  this.setState({hover:true});
                }}
                onMouseLeave={()=>{
                  this.setState({hover:false});
                }}
        >
          <div className="button--add__center">
            <StyledBar1 pose={this.state.hover?"rotate":"normal"}/>
            <StyledBar2 pose={this.state.hover?"rotate":"normal"}/>
          </div>
        </div>
      </div>
    );
  }
};

NotesListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NotesListHeader);
