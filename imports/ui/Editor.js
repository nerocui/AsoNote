import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { Editor as RTE } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export class Editor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        body: EditorState.createEmpty()
      };
    }
    handleBodyChange(e) {
      const body = e.target.value;
      this.setState({ body });
      this.props.call('notes.update', this.props.note._id, { body });
    }
    handleTitleChange(e) {
      const title = e.target.value;
      this.setState({ title });
      this.props.call('notes.update', this.props.note._id, { title });
    }
    componentDidUpdate(prevProps, prevState) {
      const currentNoteId = this.props.note ? this.props.note._id : undefined;
      const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
  
      if (currentNoteId && currentNoteId !== prevNoteId) {
        this.setState({
          title: this.props.note.title,
          body: EditorState.createWithContent(convertFromRaw(this.props.note.body))
        });
      }
    }

    onEditorStateChange(body){
      this.setState({body});
      const row = convertToRaw(body.getCurrentContent());
      this.props.call('notes.update', this.props.note._id, { body:row });
    }

    render() {
      if (this.props.note) {
        return (
          <div className="editor">
            <input className="editor__title" value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange.bind(this)}/>
            <div className="editor__wrapper" >
              <RTE  className="editorrrr"
                    wrapperClassName="wrapper-class"
                    editorClassName="public-DraftEditor-content"
                    toolbarClassName="toolbar-class"
                    editorState={this.state.body}
                    onEditorStateChange={this.onEditorStateChange.bind(this)} 
                    />
            </div>
          </div>
        );
      } else {
        return (
          <div className="editor">
            <p className="editor__message">
              { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
            </p>
          </div>
        );
      }
    }
  };
  
  Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
  };
  
  export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
  
    return {
      selectedNoteId,
      note: Notes.findOne(selectedNoteId),
      call: Meteor.call,
      browserHistory
    };
  }, Editor);
  