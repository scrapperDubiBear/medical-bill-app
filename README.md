## Tracking Medical Bills using React 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installations needed 
Following libraries need to be installed to be able to run the application: formik, yup, react-router-dom
 ### npm i yup
 ### npm i react-router-dom
 ### npm i formik

 ## Project Description
This is a React webapp that reads medical bill input from the user: Patient information, Service Information and Bill Image. 
The inputs can be edited or submitted and stored. 

## Implementation Details
No state management libraries were used. Instead, global state is maintained in App component so that there is always only a "single source of truth" and
the data can be accessed from any other child components to App component.
Data passing is achieved through the method of passing state as props to other components.

Yup is used for data validation of the form. 
