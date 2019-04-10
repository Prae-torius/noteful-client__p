import React from 'react';
import ApiContext from '../ApiContext/ApiContext';

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      validMsgs: {
        name: ''
      }
    }
  }

  static defaultProps = {
    history: {
      push: () => {},
      goBack: () => {}
    }
  }

  static contextType = ApiContext;

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)})
  }

  validateName(nameValue) {
    let fieldErrors = {...this.state.validMsgs}
    let hasError = false;

    nameValue = nameValue.trim();
    if(nameValue.length === 0) {
     fieldErrors.name = 'Folder name is required';
     hasError = true;
    }

    this.setState({
      validMsgs: fieldErrors,
      nameValid: !hasError
    }, this.formValid )
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid 
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const API_ENDPOINT = 'http://localhost:9090';
    const folder = {
      name: this.state.name
    } 

    fetch(`${API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e = Promise.reject(e));
      }
      return res.json();
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(``)
      console.log(`Data submitted: ${folder.name}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <section className='AddFolder' onSubmit={e => this.handleSubmit(e)}>
        <button 
          className='AddFolder__back'
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <form>
          <legend><h2>Add Folder</h2></legend>
          <div><p>folder name is required</p></div>
          <label htmlFor='name'>Folder Name: </label>
          <input type='text' id='name' name='name' placeholder='folder name' onChange={e => this.updateName(e.target.value)}/>
          <button type='submit' disabled={!this.state.formValid}>Submit</button>
        </form>
      </section>
    )
  }
}

