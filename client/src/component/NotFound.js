import React from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate=useNavigate();
  return (
    <div className=' vh-100 container text-black text-center'>< h2 >Not Available Yet</h2>
    <button className='btn btn-warning ' onClick={()=>{navigate("/")}}>Go Back</button></div>
  )
}

export default NotFound