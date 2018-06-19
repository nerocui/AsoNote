import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Notes } from '../api/notes';
import NotesListHeader from './NotesListHeader';
import NotesListItem from './NotesListItem';
import NotesListEmptyItem from './NotesListEmptyItem';

export const NotesList = (props) => {
  return (
    <div className="item-list">
      <NotesListHeader/>
      { props.notes.length === 0 ? <NotesListEmptyItem/> : undefined }
      {props.notes.map((note) => {
        return <NotesListItem key={note._id} note={note}/>;
      })}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NotesList);
