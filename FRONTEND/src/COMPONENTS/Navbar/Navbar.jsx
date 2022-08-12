import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from './JAZIIRA.png'
import useStyles from './style'
import Dashboard from '../../PAGES/Dashboard/Dashboard';

export const Navbar = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo}  alt="commerce.js" height="25px" className={classes.image} /> CARWA JAZIIRA
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/badeeco' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
          <Link to="/diiwaangelinta" style={{textDecoration:'none', fontSize:'24px', marginRight:'50px'}} >
           <span style={{marginLeft:'9px', margin:'5px 10px', width:'130px', padding:'3px' }}>DIIWAANGELINTA</span> 
          </Link>
          <Link to="/adminOrders" style={{textDecoration:'none', fontSize:'24px', marginRight:'50px'}} >
           <span style={{marginLeft:'9px', margin:'5px 10px', width:'130px', padding:'3px' }}>BADEECO</span> 
          </Link>
          <Link to="/fullFilled" style={{textDecoration:'none', fontSize:'24px', marginRight:'50px'}} >
           <span style={{marginLeft:'9px', margin:'5px 10px', width:'130px', padding:'3px' }}> LA FULIYAY</span> 
          </Link>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
