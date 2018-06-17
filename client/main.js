import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {routes, onAuthChange} from '../imports/routes/routes';
Tracker.autorun(
  ()=>{
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
  }
);


Meteor.startup(()=>{
  ReactDom.render(routes, document.getElementById('app'));
});