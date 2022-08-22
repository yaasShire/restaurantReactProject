import React from 'react'
import Diiwaangeli from '../../PAGES/Dashboard/Diiwaangeli';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
 

function PanelAd() {
  if(sessionStorage.getItem('email') == 'admin@gmail.com') {
     
  }else{
    window.location.replace('/')
  }

  return (
    
    <>
    
    {/* {sessionStorage.getItem('email') == 'admin@gmail.com' ? <Navbar /> : window.location.replace('/')  } */}
    <Navbar />
    </>
  )
}

export default PanelAd
