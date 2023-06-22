import React from 'react';
import { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'
import stateOptions from './states';


const BillForm = ({ onSubmit }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        /* Function to read and preview image uploaded by the user
            through the input form */
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
          
        } else {
          setImage(null);
        }
      };

    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location)

    let initialValues
    if (location.state == null) {
        initialValues = {
            firstName: '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            zipCode: '',
            hospital: '',
            date: '',
            price: '',
            billImage: image
        } 
    }   else {
        initialValues = location.state.formData;
    }

    const validationSchema = Yup.object({
        firstName: Yup.string()
                    .min(2, 'Need 2 characters min.')
                    .max(20, "Can't be more than 20 char long")
                    .required('Required!!'),
        lastName: Yup.string()
                    .min(2, 'Atleast 2 characters please!')
                    .max(20, "Can't be more than 20 char long")
                    .required('Required!!'),
        addressLine1: Yup.string()
                    .min(5, 'Atleast 5 characters please!')
                    .max(40, "Can't be more than 40 char long...")
                    .required('Required!'),
        state: Yup.string()
                    .required('Required'),
        zipCode: Yup.string()
                    .matches(/^\d{5}$/, "Invalid zip code")
                    .required('Required'),
        hospital: Yup.string()
                    .min(3, 'Atleast 3 characters required')
                    .required('Required'),
        date: Yup.date()
                .max(new Date(), "Can't be a day in future!"),
        price: Yup.number()
                .min(0, 'Cannot be a negative number')
                .required('Required')         
    });

    const handleSubmit = (values) => {
        values.billImage = image;
        console.log(values)
        onSubmit(values)
        navigate('/summary', {state: {formData: values}});
        //alert(JSON.stringify(values))
    };

    return (
        <div className='main'>
            <h2 className='heading2'></h2>
        <div className='form-container'>
        <div className='heading'>Medical Bill</div>
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
        >
            <Form> 
            <div className='section-1'> Patient Information </div>
            <div className='form-group-inline'>
                <div className='component'> 
                <label htmlFor="firstName">First Name</label>
                <Field type="text" id="firstName" name="firstName" placeholder='E.g., Jane' className='form-control'/>
                <ErrorMessage name="firstName" component="div" className='error-message'/>
                </div>

                <div className='component'> 
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" id="lastName" name="lastName" placeholder='E.g., Doe' className='form-control'/>
                <ErrorMessage name="lastName" component="div" className='error-message'/>
                </div>
            </div>
                
            <div className='form-group'>
                <label htmlFor='addressLine1'> Address Line 1</label>
                <Field type="text" id="addressLine1" name="addressLine1" placeholder='E.g., 4830 Kitty Drive' 
                    className="form-control"/>
                <ErrorMessage name="addressLine1" component="div" className="error-message"/>
            </div>
            <div className='form-group'>
                <label htmlFor='addressLine2'> Address Line 2</label>
                <Field type="text" id="addressLine2" name="addressLine2" placeholder='Optional'
                className="form-control"/>
                <ErrorMessage name="addressLine2" component="div" className="error-message"/>
            </div>

            <div className='form-group-inline'>
                <div className='component'> 
                <label htmlFor='state'> State </label>
                <Field id='state' name='state' as='select' className='form-control'>
                    <option value='' id='choose'>Choose</option> 
                    {stateOptions.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.label}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name='state' component='div' className='error-message'/>
                </div>
                
                <div className='component'> 
                <label htmlFor='zipCode'> Zip Code </label>
                <Field type='text' id='zipCode' name='zipCode' placeholder='E.g., 12345' className='form-control'/>
                <ErrorMessage name='zipCode' component='div' className='error-message'/>
                </div>
            </div>
            
            <div className='section-2'> Service Information </div>
            <div className='form-group'>
                <label htmlFor='hospital'> Hospital </label>
                <Field type='text' id='hospital' name='hospital' placeholder='E.g., New York Hospital' 
                    className='form-control'/>
                <ErrorMessage name='hospital' component='div' className='error-message'/>
            </div>
            <div className='form-group-inline'>
                <div className='component'> 
                <label htmlFor='date'> Date </label>
                <Field type='date' id='date' name='date' className='form-control'/>
                <ErrorMessage name='date' component='div' className='error-message'/>
                </div>

                <div className='component'> 
                <label htmlFor='price'> Price: $ </label>
                <Field type='text' id='price' name='price' placeholder='E.g. 9500'
                    className='form-control'/>
                <ErrorMessage name='price' component='div' className='error-message'/>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="billImage">Bill Image</label>
                <input
                        type="file"
                        accept="image/*"
                        id="billImage"
                        name="billImage"
                        className="image-input"
                        onChange={handleImageChange}
                />  
                {image && <img src={image} width="25%" className='image' alt="Preview" />}
            </div>
            <button type="submit" className='submit-button-form'>Submit</button>
            </Form>
        </Formik>
        </div>
        </div>
    );
};

export default BillForm;
