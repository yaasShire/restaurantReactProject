import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './style'
import { api } from '../axiosSetup';

import {useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@material-ui/icons';
import Navigation from '../ModernNavigation/Navigation'
const Products = ({ products, getCartItem }) => {
  const [total, setTotal] = useState(0)
  async function getTotalQuantity(){
    const email = sessionStorage.getItem('email')
     const data = await (await api.get('/get/total/cart/quantityy')).data
    const actualQuantity = data.filter(product=>product.email == email)
     setTotal(actualQuantity.length)
  }
  useEffect(()=>{
     getTotalQuantity()
  }, [])
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;
if(sessionStorage.getItem('email')){
  
}else{
  window.location.replace('/')
}
  return (
    <>
    <Navigation style />
    <main className={classes.content}>
         {location.pathname === '/badeeco' && (
          <div className={classes.button} style={{position:'fixed', right:'90px', top:'50px', color:'red', width:'50px', height:'50px' }}>
            <IconButton component={Link} to="/cart" style={{marginRight:'100px'}} aria-label="Show cart items" color="inherit" onClick={()=>{
              getCartItem()
            }}>
              <Badge  badgeContent={total} color='secondary' style={{fontSize:'50px', marginRight:'100px'}} >
                <ShoppingCart style={{color:'blue', fontSize:'40px' , marginRight:'0px'}} />
              </Badge>
            </IconButton>
          </div>
          )}
      <div className={classes.toolbar} />
      <Typography variant="h3" align='center' style={{fontFamily:'Indie Flower'}} gutterBottom>CUNOOYIN DHADHAN LEH</Typography>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product getTotalQuantity={getTotalQuantity} product={product}  />
          </Grid>
        ))}
      </Grid>
    </main>
    </>
  );
};

export default Products;