import UserH from '../headers/UserH'
import React from "react";
import BusinessDetails from '../buisessDetails/BusinessDetails';
import ServicesClient from '../tables/ServicesClient'
import { useEffect } from 'react';
import './User.css'



function User() {
  useEffect(() => {
    localStorage.removeItem('isLogIn');
  }, [])
 
    return (
      <>
      
     <UserH/>
     <div className='bd'>
     <BusinessDetails/></div>
     <div style={{position:'absolute',left:'10vh',top:'15vh',width:'120vh',}}><ServicesClient/></div>
      </>
    )
  }
  
  export default User