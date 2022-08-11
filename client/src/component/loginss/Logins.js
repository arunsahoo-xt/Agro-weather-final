import React, { useState } from 'react'
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Schema } from 'rsuite';
const Logins = () => {

  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const userLogin = async (e) => {
    e.preventDefalut();

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials:"include", 
      body: JSON.stringify({ email, password })
    });


    console.log(response);

    // const data=await response.json();
    // console.log(data);
    // if(response.status === 400|| !data){
    //   window.alert("INVALID LOGIN");
    //   console.log("INVALID LOGIN");
    // }
    // else{
    //    window.alert("Login SUCCESS");
    //   console.log("LOGIN SUCCESS");
    //  navigate("/contact");
    // }
  }

  return (
    <div>
      <Form>
          {/* <TextField name="name" label="Username" /> */}
          </Form>
      <div className='form'>
        <h1>Sign In</h1>
        <form method='POST'>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setMail(e.target.value)} placeholder="Enter email"></input>

          </div>
          
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
          </div>
          <button className="btn btn-primary" onClick={userLogin}>Sign in</button>
        </form>
      </div>  </div>
  )
}

export default Logins
