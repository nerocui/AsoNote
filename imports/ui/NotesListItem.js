import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { ContextMenu, Item, Separator, Submenu, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import styled from 'styled-components';
import posed from 'react-pose';
import { tween } from "popmotion";
import {Tracker} from 'meteor/tracker';

const Indicator = styled(posed.div({
  nothing:{scale:0, transition:props=>tween({...props, duration:50})},
  selected:{scale:1, transition:props=>tween({...props, duration:400})}
}))`
  position:absolute;
  left:0;
  height:6rem;
  width:.5rem;
  background:#9d42c4;
`;


const Indicator2 = styled(posed.div({
  nothing:{scale:0, transition:props=>tween({...props, duration:50})},
  selected:{scale:1, transition:props=>tween({...props, duration:200})}
}))`
  position:absolute;
  left:0;
  height:6rem;
  width:.5rem;
  background:#dddddd;
`;

const Content = posed.div({
  nothing:{background:'#fff', transition:props=>tween({...props, duration:40})},
  selected:{background:'#dddddd', transition:props=>tween({...props, duration:1000})}
});


class NotesListItem extends Component{
  constructor(props){
    super(props);
    this.state={
      hover:false
    }
  }

  componentDidMount(){
    this.hoverTracker = Tracker.autorun(()=>{
      const hoverId = this.props.Session.get('hoverredNoteId');
      this.setState({hover:hoverId===this.props.note._id});
    });
  }


  componentWillUnmount(){
    this.hoverTracker.stop();
  }

  render(){
    const deleteItem = ()=>{
      this.props.call('notes.remove', this.props.note._id);
      this.props.browserHistory.push('/dashboard');
    };
    const title = this.props.note.title;
    const _id = this.props.note._id;
    const MyAwesomeMenu = () => (
      <ContextMenu id={_id} style={{zIndex:100}}>
        <Item onClick={deleteItem}>Delete {title}</Item>
        <Separator />
        <Submenu label="Download">
          <Item onClick={()=>this.props.call('notes.download.pdf', _id)}>PDF</Item>
          <Item onClick={()=>this.props.call('notes.download.html',_id)}>HTML</Item>
          <Item onClick={()=>this.props.call('notes.download.markdown',_id)}>MarkDown</Item>
        </Submenu>
      </ContextMenu>
    );


    return (
      <ContextMenuProvider  className="item"
                            id={_id}
                            onClick={() => {
                              this.props.Session.set('selectedNoteId', this.props.note._id);
                            }}
                            onMouseEnter={()=>{
                              this.props.Session.set('hoverredNoteId', this.props.note._id);
                              this.componentDidMount();
                            }}
                            
      >
        <Indicator pose={this.props.note.selected?"selected":"nothing"} style={{zIndex:120}}/>
        <Indicator2 pose={this.state.hover?"selected":"nothing"} style={{zIndex:110}}/>

        <Content  className="item--content"
                  pose={this.props.note.selected?"selected":"nothing"}
        >
          <h5 className="item__title">{ this.props.note.title || 'Untitled note' }</h5>
          <p className="item__subtitle">{ moment(this.props.note.updatedAt).format('M/DD/YY') }</p>
          
          <MyAwesomeMenu/>
        </Content>
        
      </ContextMenuProvider>
    );
  }
};


NotesListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { 
    Session,
    call:Meteor.call,
    browserHistory 
  };
}, NotesListItem);
