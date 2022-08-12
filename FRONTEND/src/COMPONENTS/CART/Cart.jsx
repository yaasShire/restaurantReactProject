import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './style';

const Cart = ({ cItem, removeItem, updateQuantity, total, getTotal}) => {
  const classes = useStyles();
  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">Danbiishaada waa eber,
      <Link className={classes.link} to="/badeeco">dalbo cunno!</Link>!
    </Typography>
  );

//   if (!cItem) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cItem.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem getTotal={getTotal} item={lineItem} removeItem={removeItem} updateQuantity={updateQuantity} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: ${total}</Typography>
        <div>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>DANBIISHA DALABKAAGA</Typography>
      { !cItem.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;