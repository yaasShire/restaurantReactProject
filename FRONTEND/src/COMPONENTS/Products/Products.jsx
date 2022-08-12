import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './style'
import {useLocation } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@material-ui/icons';

const Products = ({ products, getCartItem }) => {
  const classes = useStyles();
console.log(products)
  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
         {location.pathname === '/badeeco' && (
          <div className={classes.button} style={{position:'fixed', right:'10px', top:'10px' }}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit" onClick={()=>{
              getCartItem()
            }}>
              <Badge badgeContent={1} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
      <div className={classes.toolbar} />
      <Typography variant="h3" align='center' style={{fontFamily:'Indie Flower'}} gutterBottom>CUNOOYIN DHADHAN LEH</Typography>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product}  />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;