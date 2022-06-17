import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'

//steps to create functionality
//1. create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. create a react hook to show/hide the form
//4. create and render CatCreate in the conditional rendering, based on whether the user is an admin or not
//5. update the create functionality in CatForm.js

//steps to read functionality
//1. add useState and useEffect
//2. install and import axios (npm install axios)
//3. create hook and store data
//4. create function that uses axios to get data
//5. create useEffect to automate retrieval of data in this component
//------ You should not have your data stored and can move on to UI
//6. use .map to render each category to the screen 

export default function Categories() {

  //we use [] because it will be a collection, otherwise it will error out
  const [categories, setCategories] = useState([]);
  
  const {currentUser} = useAuth();

  //hook to show/hide form in this component
  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {

    axios.get(`https://localhost:7194/api/Categories`).then(response => {

    console.log(response)
    setCategories(response.data);
    })
  }

  //1st param is a function, 2nd param is an array of objects that we can listen for my default
  //by default, [] will run once as the component mounts in the UI
  useEffect(() => {getCategories()}, [])

  return (
    <section className="categories">
        <article className="bg-info p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>
        {/* Create UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
          <div className="bg-dark p-2 mb-3 text-center">
            {showCreate ?
              <>
                <button onClick={() => setShowCreate(false)} className="btn btn-warning">Cancel</button>
                <CatCreate
                  getCategories={getCategories}
                  setShowCreate={setShowCreate} />
              </>
            : <button className="btn btn-info" onClick={() => setShowCreate(true)}>Create Category</button>}

          </div>
        }
        {/* End Create UI */}
        <Container className="p-2">
          <table className="table bg-info table-dark mt-3 mb-3">
            <thead className="table-secondary text-uppercase">
              <tr>
                <th>Name</th>
                <th>Description</th>
                {/* Edit/Delete column for icons to display */}
                {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
                  <th>Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              {categories.map(x =>
                <SingleCategory 
                key={x.categoryId} 
                category={x}
                getCategories={getCategories} />
              )}
            </tbody>
          </table>
        </Container>
    </section>
  )
}
