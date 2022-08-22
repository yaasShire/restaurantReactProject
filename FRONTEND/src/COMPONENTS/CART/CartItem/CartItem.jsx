import React, { useState } from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './style'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, removeItem, updateQuantity, getTotal }) => {
  const classes = useStyles();

//   const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

//   const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const [q, setQ] = useState(0)
 
  
  const images = importAll(require.context('../../../IMAGES', false, /\.(png|jpe?g|svg)$/));
const [message, setMessage] = useState('')
  return (
    <Card className="cart-item">
      <CardMedia image={images[item.image]} alt={item.magac} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.magaca}</Typography>
        <Typography variant="h5">${item.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <input value={q || item.quantity } type="number" style={{width:'60px'}} onChange={(e)=>{
                 if(e.target.value <0){
                    e.target.value=1

                 }else{
                    updateQuantity(item.magaca, e.target.value)
                    getTotal()
                    setQ(e.target.value)
                    
                 }
          }} />
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={(e)=>{
            removeItem(item.id)
           
        }}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;