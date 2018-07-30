import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import fileDownload from 'js-file-download';
import draft2pdf from 'draft-js-export-pdfmake';
import { draftToMarkdown } from 'markdown-draft-js';




export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const drft = EditorState.createEmpty();
    const raw = convertToRaw(drft.getCurrentContent());
    return Notes.insert({
      title: '',
      body: raw,
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Notes.remove({ _id, userId: this.userId });
  },
  'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  },
  'notes.download.pdf'(_id){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const note = Notes.findOne({_id:_id});
    const result = new draft2pdf(note.body);
    const data = result.generate();
    console.log(data);
    var pdfMake = require('pdfmake/build/pdfmake.js');
    var font = require('pdfmake/build/vfs_fonts.js');
    const {vfs} = font.pdfMake;
    //pdfMake.vfs = font.pdfMake.vfs;
    try{
      
      pdfMake.createPdf(data).download(note.title===''?'untitled':note.title);
    }catch(e){
      console.log('error is: ',e);
    }
  },
  'notes.download.html'(_id){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const note = Notes.findOne({_id:_id});
    const data = draftToHtml(note.body);
    fileDownload(data, note.title===''?'untitled':note.title+'.html');
  },
  'notes.download.markdown'(_id){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const note = Notes.findOne({_id:_id});
    const data = draftToMarkdown(note.body);
    fileDownload(data, note.title===''?'untitled':note.title+'.md');
  }
});
