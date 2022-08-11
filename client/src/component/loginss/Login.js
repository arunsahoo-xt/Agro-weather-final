import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/")
    }
  }, [navigate])

  const toastmessage = (variant, id, message) => {
    toast.update(id, {
      render: message, type: variant, isLoading: false,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
  const userLogin = async (e) => {
    e.preventDefault();

    // const response =await fetch("/api/users/login",{
    //   method:"POST",
    //   headers:{
    //     'Content-Type' : 'application/json'
    //   },
    //   // credentials:"include", 
    //   body:JSON.stringify({email,password})
    //  });


    // console.log(response);
    // console.log(email,password);
    const id = toast.loading("Please wait...", { closeOnClick: true, draggable: true });
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      // setLoading(true);
      
      const { data } = await axios.post('/api/users/loginn', {
        email, password
      },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toastmessage("success",id,"Login Success" );
      // setLoading(false);
      // setError(false);
      navigate("/weather")
    }
    catch (error) {
      // setError(error.response.data.message)
      toastmessage("error",id,"Error Occurred...Please try again" );
      // setLoading(false);
    }


  };
  return (
    <div>
<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
   

      <div  className='container centering vh-100 text-white pt-5 bg-transparent'>
        <div className='card shadow p-3 mb-5 darkbg rounded'>
          <div className='card-body p-5 '>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={userLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" className=' input-style ' placeholder="Enter email"
            value={email}
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"  className=' input-style ' placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        New Customer? <Link to="/register">Register Here</Link>
      </Row>
    </div></div></div>
    <ToastContainer theme='colored' />
    </div> </div >
  )
}

export default Login