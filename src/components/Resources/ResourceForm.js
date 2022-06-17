import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { resourceSchema } from '../../utilities/validationSchemas'
import axios from 'axios'

export default function ResourceForm(props) {
    //we need to get categories from the API to populate the dropdown list/select list
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7194/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.resource){
            //create code
            const resourceToCreate = values;

            axios.post(`https://localhost:7194/api/Resources`, resourceToCreate).then(() => {
                props.getResources()
                props.setShowCreate(false)
            })
        }
        else{
            //edit code
            const resourceToEdit = {
                resourceId: props.resource.resourceId,
                name: values.name,
                url: values.url,
                linkText: values.linkText,
                description: values.description,
                categoryId: values.categoryId
            }

            //make the put request
            axios.put(`https://localhost:7194/api/Resources/${props.resource.resourceId}`, resourceToEdit).then(() => {
                props.getResources()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Formik
            initialValues={{
                name: props.resource ? props.resource.name : '',
                url: props.resource ? props.resource.url : '',
                linkText: props.resource ? props.resource.linkText : '',
                description: props.resource ? props.resource.description : '',
                categoryId: props.resource ? props.resource.categoryId : '',
            }}
            validationSchema={resourceSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {/* start with this structure, place your form in the empty parens
                {({errors, touched}) => ()  } */}

            {({ errors, touched }) => (
                <Form id="resourceForm">
                    <div className="form-group m-3">
                        <Field name="name" className="form-control" placeholder="Name" />
                        {/* Below is the validation UI */}
                        {errors.name && touched.name ? (
                            <div className="text-danger">{errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group m-3">
                        <Field name="url" className="form-control" placeholder="Url" />
                        {/* Below is the validation UI */}
                        {errors.url && touched.url ? (
                            <div className="text-danger">{errors.url}</div>
                        ) : null}
                    </div>
                    <div className="form-group m-3">
                        <Field name="linkText" className="form-control" placeholder="LinkText" />
                        {/* Below is the validation UI */}
                        {errors.linkText && touched.linkText ? (
                            <div className="text-danger">{errors.linkText}</div>
                        ) : null}
                    </div>
                    <div className="form-group m-3">
                        <Field name="description" as="textarea" className="form-control" placeholder="Description" style={{ resize: 'none', height: '5em' }} />
                        {/* Below is the validation UI */}
                        {errors.description && touched.description ? (
                            <div className="text-danger">{errors.description}</div>
                        ) : null}
                    </div>
                    <div className="form-group m-3" >
                        <Field as="select" name="categoryId" className="form-control">
                            <option value="" disabled>[--Please choose--]</option>
                            {/* Below we will map an option for every category in the API */}
                            {categories.map(cat => 
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            )}
                        </Field>
                    </div>
                    <div className="form-group m-3">
                        <button type="submit" className="btn btn-info m-3">Submit Resource to API</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
