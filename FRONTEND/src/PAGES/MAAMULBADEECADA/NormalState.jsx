import React, { useState, useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit';

import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
function NormalState({ product, setShowForm, filterProducts, setTargetId, deleteProduct }) {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      
      const images = importAll(require.context('../../IMAGES', false, /\.(png|jpe?g|svg)$/));
    return (
        <Grid item xs={12} sm={12 } style={{display:"flex", padding:'10px', justifyContent:'center'}}>
        <Card style={{display:"flex", justifyContent:'space-around', alignItems:'center', padding:'5px', minWidth:'490px'}}>
        <img src={images[product.image]} alt="" style={{width:"100px", height:'100px', borderRadius:'50%', marginLeft:'30px'}} />
        <Typography variant='h5'>{product.magac}</Typography> <br />
        <Typography variant='h4'>${product.price}</Typography>
        <EditIcon style={{cursor:'pointer', fontSize:'30px', color:'blue'}} onClick={()=>{
            setShowForm(true)
            filterProducts(product.id)
            setTargetId(Number(product.id))
        }} /> <br />
        <DeleteIcon style={{cursor:'pointer', color:'red', fontSize:'30px'}} onClick={()=>{
            deleteProduct(Number(product.id))
        }} />
        </Card>
    </Grid>
    )
}

export default NormalState
