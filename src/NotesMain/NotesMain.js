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
        <h2 className='NotesMain_heading'>Notes</h2>
        <Link
            to='/add-note'
            className='NotesMain_add-note-link'
          >
            Add Note
        </Link>
        <ul className='NotesMain_list'>
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
          <Link
            to='/add-note'
            className='NotesMain_add-note-link'
          >
            Add Note
          </Link>
      </section>
    )
  }
}

NotesMain.propTypes = {
  folderId: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
    'modified': PropTypes.string.isRequired,
    'folderId': PropTypes.string.isRequired,
    'content': PropTypes.string.isRequired
  }))
}

export default NotesMain