import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import Navigation from '../../COMPONENTS/ModernNavigation/Navigation'
import { api } from '../../COMPONENTS/axiosSetup';
function History() {
  if(sessionStorage.getItem('role') == 'admin') {
     
  }else{
    window.location.replace('/')
  }
    const [taariikh, setTaariikh] = useState('')
    const [orders, setOrders] = useState([])
    const [targetOrders, setTargetOrders] = useState([])
    const [dateOrders, setDateOrders] = useState([])
    async function getOrders(currentDate){
        console.log(new Date(currentDate).toLocaleDateString())
        const data = await (await api.get('/get/tatget/date/orders')).data
        const tDateList = data.filter(order=> new Date(order.taariikh).toLocaleDateString() == new Date(currentDate).toLocaleDateString())
        const email = sessionStorage.getItem('email')
        const realList = tDateList.filter(order=> order.email == email)
        setDateOrders(realList)
        // console.log(data)   
        // console.log(tDateList)
        // console.log(new Date(taariikh).toLocaleDateString())
        setTargetOrders(realList)
    }
    useEffect(()=>{
    //  getOrders()
    }, [taariikh])
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('../../IMAGES', false, /\.(png|jpe?g|svg)$/));
      // if(!dateOrders.length){
      //   return <Typography variant='h3' align='center'>WAX DALAB AH MASAMEYNIN</Typography>
      // }
  return (
    <>
    <Navigation />
    <Grid container>
    <Grid item sm={12} xs={12}  style={{display:'flex', justifyContent:'center'}}>
            <Typography varaint='h1' gutterBottom align='center'>U BAAR TAARIIKH AHAAN</Typography>
        </Grid>
        <Grid item sm={12} xs={12}  style={{display:'flex', justifyContent:'center'}}>
            <input onChange={(e)=> {
                setTaariikh(e.target.value)
                getOrders(e.target.value)
            }} type="date" style={{width:'300px', height:'50px', color:'blue', fontSize:'25px'}} />
        </Grid>
      {dateOrders.map(product=>{
        return (
            <Grid item xs={12} sm={12 } style={{display:"flex", padding:'10px', justifyContent:'center'}}>
            <Card style={{display:"flex", justifyContent:'space-around', alignItems:'center', padding:'5px', minWidth:'490px'}}>
            <img src={images[product.image]} alt="" style={{width:"100px", height:'100px', borderRadius:'50%', marginLeft:'30px'}} />
            <Typography variant='h5'>{product.magac}</Typography> <br />
            <Typography variant='h4'>${product.price}</Typography>
           
            </Card>
        </Grid>

        )
      })}
        
    
         
    
      
    </Grid>
    </>
  )
}

export default History
