import React from 'react';
import { Route, Link } from 'react-router-dom';
import FoldersNav from './FoldersNav(Sidebar)/FoldersNav';
import NotePageNav from './NotePageNav(Sidebar)/NotePageNav';
import NotesMain from './NotesMain/NotesMain';
import NotePageMain from './NotePageMain/NotePageMain';
import ApiContext from './ApiContext/ApiContext';

const API_ENDPOINT = 'http://localhost:9090';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${API_ENDPOINT}/notes`),
      fetch(`${API_ENDPOINT}/folders`) 
    ])
      .then(([notesResult, foldersResult]) => {
        if (!notesResult.ok) 
          return notesResult.json().then(e => Promise.reject(e))
        if (!foldersResult.ok)
          return foldersResult.json().then(e => Promise.rejec(e))

        return Promise.all([
          notesResult.json(),
          foldersResult.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  renderNavs() {
    return (
      <div className='NavRoutes'>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={FoldersNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        /> 
      </div>
    )
  };

  renderMains() {
    return (
      <div className='MainRoutes'>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NotesMain}
                />
              )
            }
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
      </div>
    )
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavs()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
             </h1>
          </header>
          <main className='App__main'>
            {this.renderMains()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
};

export default App;