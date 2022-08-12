import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import cunto from './7.jpg'
import { api } from '../../COMPONENTS/axiosSetup';
function OrderedProducts({ cusName }) {
    // console.log(cusName)
    const [orders, setOrders] = useState([])
    
    async function getOrders(){
        const data = await (await api.get('/get/received/orders')).data
        setOrders(data)
        console.log(data)
     }
     useEffect(()=>{
      getOrders()
     }, [])
     
    function getName(name){
        console.log(name)
    }

    return (
        <Card >
        <CardContent style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <CardMedia  image={cunto} style={{width:'100px', height:'100px', borderRadius:'100%'}} />
         <Typography variant='h5' style={{fontWeight:'bold'}}>ali</Typography>
         <Typography style={{fontWeight:'bold'}}>$66</Typography>
        </CardContent>
        </Card>
      )
}

export default OrderedProducts
