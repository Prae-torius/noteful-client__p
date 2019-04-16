import React from 'react';
import ApiContext from '../ApiContext/ApiContext';
import ValidationError from '../ValidtionError/ValidationError';

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      folderId: '', 
      modified: new Date().toLocaleDateString(),
      nameValid: false,
      folderValid: false,
      formValid: false,
      validMsgs: {
        name: '',
        folder: ''
      },
    }
  }

  static defaultProps = {
    history: {
      push: () => {},
      goBack: () => {}
    },
  }

  static contextType = ApiContext;

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)})
  }

  updateContent(content) {
    this.setState({content})
  }

  updateFolder(folderId) {
    this.setState({folderId}, () => {this.validateFolder(folderId)})
  }

  validateName(nameValue) {
    let fieldErrors = {...this.state.validMsgs}
    let hasError = false;

    nameValue = nameValue.trim();
    if(nameValue.length === 0) {
     fieldErrors.name = 'Name is required';
     hasError = true;
    }

    this.setState({
      validMsgs: fieldErrors,
      nameValid: !hasError
    }, this.formValid )
  }

  validateFolder(folderValue) {
    let fieldErrors = {...this.state.validMsgs}
    let hasError = false;

    folderValue = folderValue.trim();
    if(!folderValue) {
     fieldErrors.folder = 'Folder selection is required';
     hasError = true;
    } else {
      fieldErrors.folder = '';
      hasError = false;
    }

    this.setState({
      validMsg: fieldErrors,
      folderValid: !hasError
    }, this.formValid )
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.folderValid
    });
  }

  handleSubmit = e => {
    e.preventDefault();


    const API_ENDPOINT = 'http://localhost:9090';
    const note = {
      name: this.state.name,
      content: this.state.content,
      folderId: this.state.folderId,
      modified: this.state.modified
    } 

    fetch(`${API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(note)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e = Promise.reject(e));
      }
      return res.json();
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/`)
      console.log(`Data submitted: ${note.name}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <section className='AddNote' onSubmit={e => this.handleSubmit(e)}>
        <button 
          className='AddNote_back-button'
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <form>
          <h2>Add Note</h2>
          <div className='AddNote__select'>
            <label htmlFor='note-folder'>Select Folder: 
              <span className='requiredField'>(required)</span>
            </label>
            <select 
              id='note-folder' 
              name='note-folder' 
              aria-label='note-folder'
              aria-required='true'
              onChange={e => this.updateFolder(e.target.value)}>
              <option value=''>Select Folder</option>
              {this.context.folders.map((folder, index) => {
                return <option key={index} value={folder.id}>{folder.name}</option>
              })}
            </select>
            <ValidationError hasError={!this.state.folderValid} message={this.state.validMsgs.folder} />
          </div>
          <div className='AddNote__note-name'>
            <label htmlFor='note-name'>Name: 
              <span className='requiredField'>(required)</span>
            </label>
            <input 
              type='text' 
              id='note-name' 
              name='note-name' 
              aria-label='note-name'
              aria-required='true'
              placeholder='note name' 
              onChange={e => this.updateName(e.target.value)}/>
              <ValidationError hasError={!this.state.nameValid} message={this.state.validMsgs.name} />
          </div>
          <div className='AddNote__note-content'>
            <label htmlFor='note-content'>Content: </label>
            <input type='text' id='note-content' name='note-content' placeholder='lorem ipsum' onChange={e => this.updateContent(e.target.value)} />
          </div>
          <button type='submit' disabled={!this.state.formValid}>Submit</button>
        </form>
      </section>
    )
  }
}