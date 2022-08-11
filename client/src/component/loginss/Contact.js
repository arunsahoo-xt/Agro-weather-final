import React from 'react'
import { useNavigate } from 'react-router-dom';
import ShowMap from '../ShowMap';
// const jwt=require('jsonwebtoken');

const Contact = () => {
const navigate=useNavigate();
     
    React.useEffect(() => {
        const userInfo=localStorage.getItem("userInfo");
        if(!userInfo){
          navigate("/login")
        }
      }, [navigate])
      
    return (
        <div className='w-100'>
            <ShowMap/>
        </div>
    )
}

export default Contact
