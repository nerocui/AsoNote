import React, { Component } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Notes } from '../api/notes';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
          NavView
      </div>
    );
  }
}
