import React from 'react';
import ApiContext from '../ApiContext/ApiContext';
import { findNote, findFolder } from '../helper-funcs';

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <section className='NotePageNav'>
        <button 
          className='NotePageNav__back'
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <h3 className='NotePageNav_folder-name'>
          {folder.name}
        </h3>
      </section>
    )
  }
}

export default NotePageNav 