import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Jaziira from './JAZIIRA.png'
import useStyles from './style'
import './style.css'
// import './Functionality'


const Navigation = () => {
  
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
        <Link to='/home' style={{textDecoration:'none'}}>
        <li ><a href="#">Home</a></li>
        </Link> 
        <Link to='/badeeco' style={{textDecoration:'none'}}>
        <li ><a href="#">Cunooyinka</a></li> 
        </Link> 
        <Link to='/history' style={{textDecoration:'none'}}>
        <li ><a href="#">XOGTA DALABYADA</a></li> 
        </Link> 
        {
          sessionStorage.getItem('email') == 'admin@gmail.com' && (
        <Link to='/panel' style={{textDecoration:'none'}}>
        <li ><a href="#">ADMIN PANEL</a></li> 
        </Link> 
          )
        }
       
        
      </ul>
    </div>
  </nav>
    </div>

    </>
  );
};

export default Navigation;