/* 
  Displays all the uploaded bills in the form of a grid.
  Has a link to 'Upload' form to upload new bills. 
*/

import React from 'react'
import './Home.css'

export default function Home (props) {
  //console.log(props)
  const billData = props.billData;
  const wrapped = billData.map(function (x) {
    return (
      <div className='bill-card'>   
        {x.billImage ? 
          <img src={x.billImage} width='100%' height='80%' alt='No Image'/> : 
          <img src='/no-image-bg.jpg' width='100%' height='80%'  alt='No Image'/>}
        <br/>
        <div className='bill-card-details'>
          
          <div className='name-price'>
            <div className='name'>
            {x.firstName} {x.lastName}  
            </div>

            <div className='price'>
            <b> ${x.price} </b>
            </div>
          </div>

          <div className='address'>
          {x.addressLine1} 
          {x.addressLine2 && <> {x.addressLine2}</>} 
          <br/> {x.state} {x.zipCode}
          </div>
          
          <div className='hospital'>
          {x.hospital}
          </div>
          
          {x.date && <div className='date'>{x.date}</div>}
          
        </div>
      </div>
    )
  })

  //console.log(wrapped)
  if (wrapped.length) {
    return (
      <div className='main1'>
        {wrapped}
      </div>
    )
  }  else {
    return (
      <div className='main'>
        <h4 className='no-bills-message'> 
          No bills to display currently. 
          <br/> 
          Add or check back later! 
        </h4>
      </div>
    )
  }
};

