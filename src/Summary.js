// Summarizes all the details entered by the user. 
// Provides an option to edit the input. -> Takes back to the form. 

import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Summary.css'

export default function Summary ({onEdit}) {
    <div className='main'>Summary</div>
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state || {}; // Access the form data from the state

    console.log(formData)
    const handleEdit = () => {
      onEdit() // edits the global state in App() component
      navigate('/form', {state: {formData}}); // Navigate back to the form page
    };

    const handleSubmit = () => {
      console.log('Go to Home Page');
      
    }

    return (
      <div className='main'>
      <div className='heading4'>Bill Summary</div>
      <div className='summary-card'>
        
        <div>Patient Name: </div>
        <div className='details'> {formData.firstName} {formData.lastName} </div>

        <div> Address: </div>
        <div className='details'>{formData.addressLine1}
                                  {formData.addressLine2 && `, ${formData.addressLine2}`} <br/>
            {formData.state}, {formData.zipCode}      
        </div>

        <div> Hospital: </div>
        <div className='hospital'>{formData.hospital}</div>

        {formData.date && 
          <>
            <div> Date of Service: </div>
            <div className='date'>{formData.date}</div>
          </>
        }

        <div>Price: </div>
        <div className='price'>${formData.price}</div>

        {formData.billImage && 
          <>
            <div>Bill Image: </div>
            <div>  
              <img src={formData.billImage} className='bill-image' width='100%' alt='Bill Image'/>
            </div>
           
          </>
        }
      </div>
      <div className='edit-or-not'> Are you ready to submit? </div>
      <div className='button'>
        <button className='edit-button' onClick={handleEdit}>No, edit</button>
        <Link to="/" className='submit-button'> Yes, submit! </Link>
      </div>
      
      </div>
    );
};

