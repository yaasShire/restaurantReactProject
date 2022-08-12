import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { api } from '../../axiosSetup';
import useStyles from './style';

const Product = ({ product}) => {

  const classes = useStyles();
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../../IMAGES', false, /\.(png|jpe?g|svg)$/));
const [message, setMessage] = useState('')
  async function addToCart(magac, price, sawir){
    const email = sessionStorage.getItem('email')
    if(email){
      console.log(magac, price, sawir)
      const data = await api.post('/add/to/cart', {magac, price, sawir, email})
      setMessage(data.data)
      alert(data.data)


    }else{
      alert('waa is diiwaangelisay')
    }
  }

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={images[product.image]} title={product.magac} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.magac}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p" >{product.description}</Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart"  onClick={()=>{
          addToCart(product.magac, product.price, product.image)
        }}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;