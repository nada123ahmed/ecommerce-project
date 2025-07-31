import React from 'react'

import { Navigate } from 'react-router-dom';
import "./protectedRoutes.module.css"
export default function ProtectedRoutes(props) {
  if(localStorage.getItem("userToken")){
return props.children;
  }
  else{
    return <Navigate to="/Login"></Navigate>
  }
  
}
