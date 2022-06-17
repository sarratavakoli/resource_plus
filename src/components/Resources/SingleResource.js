import React, { useState } from 'react'

//edit/delete imports
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ResourceEdit from './ResourceEdit';
library.add(fas);

export default function SingleResource(props) {
  const { currentUser } = useAuth();
  //create a hook that will edit/close the edit modal
  const [showEdit, setShowEdit] = useState(false);

  const deleteResource = (id) => {
    if(window.confirm(`Are you sure that you want to delete ${props.resource.name}?`)){
      axios.delete(`https://localhost:7194/api/Resources/${id}`).then(() => {props.getResources()})
    }
  }

  return (
    <div className="singleResource col-md-5 m-4">
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>
          <button id="deleteLink" onClick={() => deleteResource(props.resource.resourceId)}>
            <FontAwesomeIcon icon={['fas', 'trash-alt']} />
          </button>
          {showEdit && 
            <ResourceEdit
              resource={props.resource}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getResources={props.getResources} />
          }
        </div>
      }
      <h3>{props.resource.name}</h3>
      {props.resource.description !== null ?
        <p>{props.resource.description}</p> :
        <p>No Description Provided</p>}

      <a href={props.resource.url} target="_blank" rel="noreferrer" className="btn btn-info">
        Visit {props.resource.linkText}
      </a>

    </div>
  )
}
