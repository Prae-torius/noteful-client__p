import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext/ApiContext';

const API_ENDPOINT = 'http://localhost:9090' 

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()

    fetch(`${API_ENDPOINT}/notes/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json(e = Promise.reject(e))
      }
      return res.json()
    })
    .then(()=> {
      this.context.deleteNote(this.props.id)
      this.props.onDeleteNote(this.props.id)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <div className='Note' id={this.props.id}>
        <h2 className='Note-title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2> 
        <p>{this.props.modified}</p>
        <button 
          className='Note-delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          Delete Note
        </button>    
      </div>
    )
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
}