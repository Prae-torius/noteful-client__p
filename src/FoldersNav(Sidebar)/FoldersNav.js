import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import ApiContext from '../ApiContext/ApiContext';

class FoldersNav extends React.Component {
  static contextType = ApiContext;

  render() {  
    const { folders=[] } =this.context
    return (
      <section className='FoldersNav'>
        <ul className='FoldersNav_list'>
          {folders.map(folder =>
            <li key={folder.id}>
            <NavLink
              className='FoldersNav_folder-link'
              to={`/folder/${folder.id}`}
              >
                <div className='FoldersNav_folder'>
                  <h3>{folder.name}</h3>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
        <div>
          <button>
            <Link 
              to='/add-folder'
              className='FoldersNav_button'>
                Add Folder
            </Link>
          </button>
        </div>
      </section>
    )
  }
}

FoldersNav.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
}

export default FoldersNav;