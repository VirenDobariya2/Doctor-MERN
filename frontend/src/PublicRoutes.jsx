import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = (props) => {

 if(localStorage.getItem('token')){    
    console.log("kk")
    return <Navigate to="/home"/>
}else{
    console.log("sk",props.children)
 return props.children 
}
}
export default PublicRoutes
