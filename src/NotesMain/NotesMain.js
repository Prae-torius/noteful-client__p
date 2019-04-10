import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import ApiContext from '../ApiContext/ApiContext';
import { getNotesForFolder } from '../helper-funcs';

class NotesMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NotesMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NotesMain__button'>
            <button className='NotesMain__add-note-button'>
              <Link
                to='/add-note'
                className='NotesMain__add-note-link'>
                Add Note
              </Link>
            </button>
        </div>
      </section>
    )
  }
}

NotesMain.propTypes = {
  folderId: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.object)
}

export default NotesMain