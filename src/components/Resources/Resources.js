import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleResource from './SingleResource';
import './Resources.css'
import FilterCat from './FilterCat';
import ResourcesCreate from './ResourceCreate'

import { useAuth } from '../../contexts/AuthContext'

export default function Resources() {
  const [resources, setResources] = useState([]);
  const {currentUser} = useAuth();
  //filtering steps - use .filter() 
  //1. create a hook to store values for what to filter by (categoryId)
  //2. place conditional rendering for when filter === 0 in the initial map of resources
  const [filter, setFilter] = useState(0); //0 is not an Id in ResourcesDb so we use it to pull all
  const [showCreate, setShowCreate] = useState(false);
  // const { currentUser } = useAuth();

  const getResources = () => {

    axios.get(`https://localhost:7194/api/Resources`).then(response => {

    console.log(response)
    setResources(response.data);
    })
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <section className="resources">
        <article className="bg-info p-5">
            <h1 className="text-center">Resources Dashboard</h1>
        </article>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
          <div className="bg-dark p-2 mb-3 text-center">
              <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
                {!showCreate ? 'Create New Resource' : 'Cancel'}
              </button>
              <div className="createContainer">
                {showCreate && 
                //render resource create
                  <ResourcesCreate
                    getResources={getResources} 
                    setShowCreate={setShowCreate} />                    
                }
              </div>
          </div>
        }

        <FilterCat setFilter={setFilter} />

        <Container className="p-2">
          <article className="resourceGallery row justify-content-center">
            {filter === 0 ? 
              resources.map(x => 
                <SingleResource key={x.resourceId} resource={x} getResources={getResources}/>) :                             
              resources.filter(x => x.categoryId === filter).map(x => 
                <SingleResource key={x.resourceId} resource={x} getResources={getResources}/>)            }
              
              {filter !== 0 && resources.filter(x => x.categoryId === filter).length === 0 &&
               <h2 className="alert alert-warning text-dark">
                There are no results to display for this category.
               </h2>
              }
          </article>          
        </Container>

    </section>
  )
}
