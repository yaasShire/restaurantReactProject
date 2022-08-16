import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Button, Card, CardContent, Grid, Typography, CardMedia, CardActions } from '@material-ui/core';
import Navigation from '../../COMPONENTS/ModernNavigation/Navigation';
import HomeFoto from './foodBackgroundImage.jpg'
import LocalPizzaIcon from '@material-ui/icons/LocalPizza'
import { ShoppingCart } from '@material-ui/icons';

import chickenIcon from '@material-ui/icons/'
// import IMAGES from '../../IMAGES'

import useStyles from './style'
import { api } from '../../COMPONENTS/axiosSetup';
import { useEffect } from 'react';
function Home() {

    const classes = useStyles()
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      

      const images = importAll(require.context('../../IMAGES', false, /\.(png|jpe?g|svg)$/));
    
    const [categories, setCategories] = useState([])
    async function getCategories(){
       const data =  await (await api.get('/hel/product/category')).data
       console.log(data)
       setCategories(data)
    }
    useEffect(()=>{
     getCategories()
    }, [])
     const [allProducts, setAllProducts] = useState([])
     async function getAllProducts(){
        const data = await (await api.get('/get/all/products/h')).data
        setAllProducts(data)
     }    
     useEffect(()=>{
        getAllProducts()
     }, [])

     const [targetP, setTP] = useState([])
     async function getTargetProducts(cat){
    const data = await (await api.get('/get/all/target/products')).data
    console.log(data)
    setAllProducts(data)
      const newList = data.filter(product=> product.category == cat)
      

      console.log(cat)
      setAllProducts(newList)
      setTP(newList)
     }
     if(!sessionStorage.getItem('email')){
        window.location.replace('/')
     }
     async function addToCart(magac, qiimo, sawir){
        const email = sessionStorage.getItem('email')
         const data =  await api.post('/add/to/cart/h', {magac, qiimo, sawir, email})
         if(data.status){
            alert(data.status)
         }
     }

      return (
    <>
      <Navigation />
    <div style={{margin:'40px'}}>
      <Grid container style={{marginTop:'100px'}} spacing={10}>
        <Grid item xs={12} sm={6}>
        <Typography sx={{
            fontSize:{lg:'60px', xs:'20px'}
        }}  variant='h4' style={{fontWeight:'3000', wordSpacing:'10px', fontFamily:'Indie Flower', fontStyle:'italic'}}> <span >DALBO CUNNO DHADHAN LEH</span>  <br /> <span style={{color:'red'}}>OO SI DHAQSA AHNA KU HEL DALABKAAGA</span> </Typography>
        </Grid>
        <Grid item item xs={12} sm={6}>
            <Card style={{}} sx={{
                width:{lg:'700px', xs:'170px'}
            }}>
          <img src= {HomeFoto} alt=""  />      
            </Card>       
        </Grid>
        <Grid item item xs={12} sm={12}>
            <Typography variant='h5' style={{fontSize:'30px', fontFamily:'sans-serif'}} >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Fuga explicabo harum 
                recusandae adipisci id dignissimos qui  perspiciatis vitae laborum saepe.
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} >
            <Typography variant='h5' align='center'>NOOCYADA</Typography><hr style={{width:'100px', background:"blue"}} />
        </Grid>
      </Grid>
      <Grid container spacing={10} align='center' style={{marginRight:'100px'}}>
        {categories.map(cat=>{
            return(
        <Grid item style={{cursor:'pointer'}} xs={4} sm={3} onClick={()=>{
            getTargetProducts(cat.category)
        }}>
            <Card style={{width:'100px', height:'100px', background:'gray'}}>
            <Typography style={{fontSize:'20px', color:'white', fontWeight:'bold'}}>{cat.category}</Typography>          
           
            <i class="fa-solid fa-utensils" style={{fontSize:"60px", color:'yellow'}}></i>
            </Card>
        </Grid>
            )
        })}
        </Grid>
      <Grid container spacing={10}>
          <Grid item xs={12} sm={12} align='center' variant='h1'>
          <Typography variant='h3' align='center'>NATIIJADA</Typography><hr style={{width:'200px'}} />
            </Grid>
        { 
        

        allProducts.map(product=>{

            return (
        <Grid item xs={12} sm={3}>
        <Card className={classes.root}>
      <CardMedia className={classes.media} image={images[product.image]} title={product.description} />
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
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
        </Grid>
            )
        })

    
        }
      </Grid>

    </div>
    </>
  )
}

export default Home
