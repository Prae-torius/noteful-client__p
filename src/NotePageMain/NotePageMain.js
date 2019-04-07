import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext/ApiContext';
import { findNote } from '../helper-funcs';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note 
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain___note-content'>
          <p>{note.content}</p>
        </div>
      </section>
    )
  }
}

export default NotePageMain