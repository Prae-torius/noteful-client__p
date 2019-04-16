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
        <h2 className='FoldersNav_heading'>Folders</h2>
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
        <Link 
          to='/add-folder'
          className='FoldersNav_link'
        >
          Add Folder
        </Link>
      </section>
    )
  }
}

FoldersNav.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
  })),
}

export default FoldersNav;