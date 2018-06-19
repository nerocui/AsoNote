import ReactDom from 'react-dom';
import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';
import {routes, onAuthChange} from '../imports/routes/routes';
import { browserHistory } from 'react-router';
import '../imports/startup/simple-schema-config.js';



Tracker.autorun(
  ()=>{
    const isAuthenticated = !!Meteor.userId();
    const currentPagePrivacy = Session.get('currentPagePrivacy');
    onAuthChange(isAuthenticated, currentPagePrivacy);
  }
);



Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});


Meteor.startup(()=>{
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDom.render(
    routes, 
    document.getElementById('app'));
});