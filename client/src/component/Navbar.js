import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/farmlogo1.png';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent font-monospace h6 font-weight-bold">
            <a className="navbar-brand" href="#">
    <img src={logo} width={40} alt="" className="logo"/>
    AgroWeather
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav ml-auto">
    {/* <Link className="nav-item nav-link " to="/registerScreen">Register <span className="sr-only">(current)</span></Link> */}
    {/* <Link className="nav-item nav-link" to="/login">Login</Link> */}
      <Link className="nav-item nav-link" to="/">Home </Link>
      <Link className="nav-item nav-link" to="/notfound">About</Link>
      <Link className="nav-item nav-link" to="/notfound">Contact</Link>
      <Link className="nav-item nav-link" to="/notfound">Help</Link>
      <Link className="nav-item nav-link" to="/login" onClick={()=>{localStorage.removeItem("userInfo");}}>LogOut</Link>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
