import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

/* Font Awesome Icons
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CatEdit from './CatEdit'

library.add(fas);

// <FontAwesomeIcon icon={['fas', 'edit']} />

export default function SingleCategory(props) {
    const { currentUser } = useAuth();
    const [showEdit, setShowEdit] = useState(false);

    const deleteCat = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.category.categoryName}?`)){
            axios.delete(`https://localhost:7194/api/Categories/${id}`).then(() => {props.getCategories()})
        }
    }
    
    return (
        <tr>
            <td>{props.category.categoryName}</td>
            <td>{props.category.categoryDescription}</td>
            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
            <td>
                <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
                    <FontAwesomeIcon icon={['fas', 'edit']} />
                </button>
                <button className="m-1 rounded" id="deleteLink" onClick={() => deleteCat(props.category.categoryId)}>
                    <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                </button>

                {showEdit && 
                //call CatEdit to display the modal with the form
                    <CatEdit    
                        setShowEdit={setShowEdit}
                        showEdit={showEdit}
                        getCategories={props.getCategories}
                        category={props.category}
                        />
                }
            </td>
            }
        </tr>
    )
}
