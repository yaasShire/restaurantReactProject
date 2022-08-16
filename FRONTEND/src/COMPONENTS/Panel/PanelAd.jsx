import React from 'react'
import Dashboard from '../../PAGES/Dashboard/Dashboard'
import { Navbar } from '../Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
 

function PanelAd() {

  return (
    
    <>
    
    {sessionStorage.getItem('email') == 'admin@gmail.com' ? <Navbar /> : window.location.replace('/')  }
    </>
  )
}

export default PanelAd
