import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Jaziira from './JAZIIRA.png'
import useStyles from './style'
import './style.css'
// import './Functionality'


const Navbar = () => {
  
   function openOrClose(){
   const toggleButton = document.getElementsByClassName('toggle-button')[0]
   const navbarLinks = document.getElementsByClassName('navbar-links')[0]
   console.log(toggleButton)
   toggleButton.addEventListener('click', () => {
     navbarLinks.classList.toggle('active')
   })

 }
  
 const classes = useStyles()
  const [openH, setOpenH] = useState(true)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classNamees = useStyles();
  const location = useLocation();
  

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);


  return (
    <>
    <div >
    <nav className="navbar">
    <div className="brand-title">
    <img src={Jaziira}  alt="commerce.js" height="25px" className={classes.image} /> CARWA JAZIIRA
       
        </div>
    <a href="#" className="toggle-button" onClick={()=>{
      openOrClose()
    }}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </a>
    <div className="navbar-links">
      <ul>
        <Link to='/diiwaangelinta' style={{textDecoration:'none'}}>
        <li  ><a  href="#">DIIWAANGELI BADEECO</a></li>
        </Link> 
        <Link to='/maamulBadeeco' style={{textDecoration:'none'}}>
        <li ><a href="#">MAAMUL BADEECADA</a></li> 
        </Link> 
        <Link to='/adminOrders' style={{textDecoration:'none'}}>
        <li ><a href="#">DALABYADA</a></li>
        </Link> 
        <Link to='/fullFilled' style={{textDecoration:'none'}}>
        <li ><a href="#">DALABYADA LA FULIYAY</a></li> 
        </Link> 
       
        
      </ul>
    </div>
  </nav>
    </div>

    </>
  );
};

export default Navbar;