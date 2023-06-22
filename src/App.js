/*
    This application uses the method of passing state as props for state management and data passing. 
    Hence, state variable is maintained in App component which is an ancestor component 
    to all other components in the application.
*/
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar'
import Home from './Home'
import BillForm from './Form';
import Summary from './Summary';
import ErrorPage from './ErrorPage';
import { useState } from 'react';


export default function App() {

  //Global state for passing form data.
  const [billData, setBillData] = useState([]) 

  function onSubmit(billFormData) {
    /* 
      This function stores form data entered by the user 
      into state variable 'billData'.
    */

    //console.log(billFormData)
    setBillData(prevBillData => [...prevBillData, billFormData])
  }

  function onEdit() {
    /*
      This function removes the previous version of the 
      current object being edited by the user from the state 
      variable, so that only the new version remains in storage 
      upon form submission.
    */
    setBillData(function (prevBillData) {
      let ln = prevBillData.length;
      //console.log(ln)
      return prevBillData.slice(0, ln-1);
    })
  }

  //console.log(billData)

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Home billData={billData}/>}/> 
          <Route path='/form' element={<BillForm onSubmit={onSubmit}/>}/> 
          <Route path='/summary' element={<Summary onEdit={onEdit}/>}/> 
          <Route path='*' element={<ErrorPage/>}/>
      </Routes> 
    </BrowserRouter>
  );
}