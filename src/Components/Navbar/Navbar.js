import React from "react"
import { Link } from "react-router-dom"
import QuickJump from "../QuickJump/QuickJump"


const Navbar = ()=>(
<nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{borderBottom:"#5bc0de",borderStyle:"solid",borderWidth:"1.5px",paddingTop:"0",paddingBottom:"0"}}>
  <a className="navbar-brand white" href='/'>
    <img style={{height:"45px",width:"140px",borderRadius:"2px"}} src={require("../../assets/images/logo.JPG")} alt="logo" />
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-between" id="navbarNav">

    <ul className="navbar-nav">
      <li className="nav-item ">
      <Link to="/" className="nav-link"><b>Dashboard</b></Link>
      </li>
      <li className="nav-item">
        <Link to="/store/root" className="nav-link"><b>Store</b></Link>
      </li>
      <li className="nav-item">
        <Link to="/clients" className="nav-link "><b>Clients</b></Link>
      </li>
      <li className="nav-item">
        <Link to="/exporters" className="nav-link "><b>Exporters</b></Link>
      </li>
    </ul>
    <QuickJump />
  </div>
</nav> 
)

export default Navbar;