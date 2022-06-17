import React from 'react'
import { Formik, Form, Field } from 'formik' // This will produce the form for creating/editing categories
import catSchema from '../../utilities/validationSchemas'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
            //create mode
            const catToCreate = values;//temp object to send request

            //send object in POST request to API
            axios.post(`https://localhost:7194/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//this will close the form, passed as a prop from categories
                props.getCategories()//will make a GET request to api, passed as a prop from categories
            })
        }
        else{
            //edit mode
            //because the form only captures cat name and desc, we need to pass entire object into the PUT, including Id
            const catToEdit = {
                categoryId: props.category.categoryId, 
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription
            }

                axios.put(`https://localhost:7194/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                    props.getCategories();
                    props.setShowEdit(false); 
                })

        }
    }

  return (
    <div className="createCategory m-2 text-white text-center">
        <Formik
            initialValues={{
                //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category (editing)
                categoryName: props.category ? props.category.categoryName : '',
                categoryDescription: props.category ? props.category.categoryDescription : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
                {({errors, touched}) => (
                    //Form will go here
                    <Form id="catForm" className="row text-center m-auto">
                        <div className="form-group m-1 p-1">
                            <Field name="categoryName" className="form-control" placeholder="Name" />
                            {errors.categoryName && touched.categoryName ? 
                                <div className="text-danger">
                                    {errors.categoryName}
                                </div>
                            : null}
                        </div>
                        <div className="form-group m-1 p-1">
                            <Field name="categoryDescription" className="form-control" placeholder="Description" />
                            {errors.categoryDescription && touched.categoryDescription ? 
                                <div className="text-danger">
                                    {errors.categoryDescription}
                                </div>
                            : null}
                        </div>
                        <div className="form-group m-1">
                            <button type="submit" className="btn btn-success">Submit Category to API</button>
                        </div>
                    </Form>
                )}
            </Formik>
    </div>
  )
}
