import React ,{useState,useEffect }from 'react'
import { Form, Button, Row } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { toast, ToastContainer } from 'react-toastify';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "", email: "", password: ""
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/")
    }
  }, []);

  let name, value;
  const handleInputs = (e) => {

    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = toast.loading("Please wait...", { closeOnClick: true, draggable: true });
    const { name, email, password } = user;
   try{
    const response = await fetch("/api/users/regis", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    setLoading(false);
    console.log(response);
    if (response.status === 400||response.status === 500) {
    // setError(data.message)
    toastmessage("error",id,data.message );
    }
    else {
      // localStorage.setItem("userInfo",JSON.stringify(data));
      toastmessage("success",id,"Registration Success" );
      navigate('/login');
    }
  }
catch(error){
  toastmessage("success",id,error);
}}

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
  return (
   <div>
     <div className="ripple-background">
    <div className='full-screen'></div>
      <div className='container centering vh-100 text-white pt-5 bg-transparent' >
        <div className='card shadow p-3 mb-5 darkbg rounded'>
          <div className='card-body p-5 '>
       {error&& <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading&&<Loading/>}
      <Form onSubmit={postData}>
        <Form.Group className=" mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" className=' input-style ' placeholder="Enter Name"
            name="name"
            value={user.name}
            onChange={handleInputs}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"  className=' input-style ' placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleInputs}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"   className=' input-style ' placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputs}
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3 ml-3">Already Registered? <Link to="/Login">Login Here</Link>
      </Row>
    </div>
    <ToastContainer theme='colored' />
    </div></div></div>

    </div>
  )
}

export default RegisterScreen