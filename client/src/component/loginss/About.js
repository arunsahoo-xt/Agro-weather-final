import React from 'react'
import { useNavigate } from 'react-router-dom'
const About = () => {
  let navigate=useNavigate();
  React.useEffect(() => {
   navigate("/weather");
  }, [])
  
    return (
        <div>
          
        </div>
    )
}

export default About
