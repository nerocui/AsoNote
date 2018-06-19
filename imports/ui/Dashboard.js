import React from 'react';
import Header from './Header';
import NotesList from './NotesList';
import Editor from './Editor';

export default () => {
  return (
    <div className="bg">
      <Header title="Aso Note"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <NotesList/>
        </div>
        <div className="page-content__main">
          <Editor/>
        </div>
      </div>
    </div>
  );
};
