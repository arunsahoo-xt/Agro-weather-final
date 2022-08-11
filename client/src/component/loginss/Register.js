import React ,{useState} from 'react'
import "./style.css";
import { Link,useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();

const [user,setUser]=useState({
  name: "",email: "",password: ""
});

let name,value;
const handleInputs=(e)=>{
  
name=e.target.name;
value=e.target.value;
setUser({...user,[name]:value});
}

const PostData=async (e)=>{
 e.preventDefalut();
const {name,email,password}=user;
var body1=`{}`
const response =await fetch("/api/users/",{
  method:"POST",
  headers:{
    'Content-Type' : 'application/json'
  },
  body:JSON.stringify({name,email,password})
 });

const data=await response.json();
if(data.status === 400){
  window.alert("INVALID REGISTRATION");
  console.log("INVALID REGISTRATION");
}
else{
   window.alert("REGISTRATION SUCCESS");
  console.log("REGISTRATION SUCCESS");
  navigate('/login');
}
}
    return (
        <div>
            <div className='form'>
            <h1>Registration</h1>
            <form method='POST'> 
            <div className="form-group">
            <label htmlFor="firstname" >Name:</label>

    
        
      <input type="text" name="name" id="firstname"
      value={user.name}  
      onChange={handleInputs} 
     className="form-control" placeholder="First name"></input>
    </div>
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1"
      value={user.email} 
    onChange={handleInputs} 
   placeholder="Enter email"></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" name="password"  className="form-control" id="exampleInputPassword1"  
    value={user.password} 
    onChange={handleInputs} 
   placeholder="Password"></input>
  </div>
  <div>
  <button className="btn-primary"  onClick={PostData}>Register</button>
  </div>
  
  <div>
      <Link to="/login">I am Already Registered</Link>
  </div>
</form>
</div> 

 </div>

    )
}

export default Register
