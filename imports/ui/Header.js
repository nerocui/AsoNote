import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import posed from "react-pose";
import styled from 'styled-components';
import { tween } from "popmotion";
import Card from './Card';

//HamBtn
const Bar1 = posed.div({
  normal:{rotate:0, y:0, transition:props=>tween({...props, duration:50})},
  expand:{rotate:45, y:10, transition:props=>tween({...props, duration:50})},
});

const Bar2 = posed.div({
  normal:{opacity:1, transition:props=>tween({...props, duration:50})},
  expand:{opacity:0, transition:props=>tween({...props, duration:50})}
});

const Bar3 = posed.div({
  normal:{rotate:0, y:0, transition:props=>tween({...props, duration:50})},
  expand:{rotate:-45, y:-10, transition:props=>tween({...props, duration:50})}
});


var StyledBar1 = styled(Bar1)`
  width: 35px;
  height: 4px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
`;


var StyledBar2 = styled(Bar2)`
  width: 35px;
  height: 4px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
`;

var StyledBar3 = styled(Bar3)`
    width: 35px;
    height: 4px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
`;

const Dot1 = styled(posed.div({
  open:{y:16},
  close:{y:0}
}))`
  width:1rem;
  height:1rem;
  background:white;
`;
const Dot2 = styled(posed.div({
  open:{x:16, y:6},
  close:{x:16, y:-10}
}))`
  width:1rem;
  height:1rem;
  background:white;
`;
const Dot3 = styled(posed.div({
  open:{y:-4, x:-15},
  close:{y:-4, x:0}
}))`
  width:1rem;
  height:1rem;
  background:white;
`;
const Dot4 = styled(posed.div({
  open:{x:31, y:-19},
  close:{x:16, y:-19}
}))`
  width:1rem;
  height:1rem;
  background:white;
  margin-top:.5rem;
`;

const PJMenu = styled(posed.div({
  open:{scale:1},
  close:{scale:0}
}))`
  height:15rem;
  width:45rem;
  border-radius:.2rem;
  position:absolute;
  top:6rem;
  background:white;
  left:1rem;
  -webkit-box-shadow: 0px 0px 29px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 29px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 29px 2px rgba(0,0,0,0.75);
`;

const LogoutText = posed.div({
  hover:{scale:0},
  normal:{scale:1}
});

const LogoutIcon = posed.img({
  hover:{scale:1, y:-20},
  normal:{scale:0, y:-20}
});

class Header extends Component{

  constructor(props){
    super(props);
    this.state={
      hover:false,
      open:false,
      hoverlogout:false
    }
  }

  render(){
    return (
      <div className="header">
        <div className="header__content">
          <div className="header__nav-toggle" onClick={this.props.handleNavToggle}>
            <StyledBar1 pose={this.props.isNavOpen? "expand":"normal"}/>
            <StyledBar2 pose={this.props.isNavOpen? "expand":"normal"}/>
            <StyledBar3 pose={this.props.isNavOpen? "expand":"normal"}/>
          </div>
          {/* <img className="header__nav-toggle" src={navImageSrc} onClick={props.handleNavToggle}/> */}
          <span className="header__title--wrapper" >
              <div  className="header__all-app" 
                          onMouseEnter={()=>this.setState({hover:true})} 
                          onMouseLeave={()=>this.setState({hover:false})} 
                          onClick={()=>this.setState({open:!this.state.open})}
                          pose={this.state.hover?"hover":"normal"}
                          >
                <Dot1 pose={this.state.open?"open":"close"}/>
                <Dot2 pose={this.state.open?"open":"close"}/>
                <Dot3 pose={this.state.open?"open":"close"}/>
                <Dot4 pose={this.state.open?"open":"close"}/>
                <PJMenu pose={this.state.open?"open":"close"} style={{zIndex:300}}>
                  <div>
                    <Card src="https://github.com/nerocui/screenshots/blob/master/Aso%20Note/1741325.png?raw=true"
                          title="Aso Note"
                          link="https://aso-note.herokuapp.com/"/>
                    <Card src="https://github.com/nerocui/screenshots/blob/master/Aso%20Note/clipboard-512.png?raw=true"
                          title="Score Keep"
                          link="https://nero-score.herokuapp.com/"/>
                    <Card src="https://github.com/nerocui/screenshots/blob/master/Aso%20Note/link-round-icon0.gif?raw=true"
                          title="Shorty Lnk"
                          link="https://shorty-lnk-nero.herokuapp.com/"/>
                  </div>
                  
                </PJMenu>
              </div>
              <h1 className="header__title">{this.props.title}</h1>
          </span>
          
          <button className=" button--link-text" onClick={() => this.props.handleLogout()}>
            <div  className="logout-container"
                  onMouseEnter={()=>this.setState({hoverlogout:true})}
                  onMouseLeave={()=>this.setState({hoverlogout:false})}>
              <LogoutText pose={this.state.hoverlogout?"hover":"normal"}>
                Logout
              </LogoutText>
              <LogoutIcon className="logout-icon" src="/images/logout.svg" height="20" width="40" pose={this.state.hoverlogout?"hover":"normal"}/>
            </div>
            
          
          </button>
        </div>
      </div>
    );
  }
  
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleNavToggle: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, Header);
