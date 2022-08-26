import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import cunto from './7.jpg'
import { api } from '../../COMPONENTS/axiosSetup';
import OrderedProducts from './OrderedProducts';
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import { Link } from 'react-router-dom';
// import  getName  from './OrderedProducts'
function AdminOrders() {
  if(sessionStorage.getItem('role') == 'admin') {
     
  }else{
    window.location.replace('/')
  }
  const [orders, setOrders] = useState([])

  const [customer, setCustomers] = useState([])
  async function getCusOrders(){
    const data = await( await api.get('/get/cus/orders')).data
    setCustomers(data)
 
  }
useEffect(()=>{
    getCusOrders()
}, [])

async function getOrders(){
  const data = await (await api.get('/get/received/orders')).data
  console.log(data)
  setOrders(data)
}
useEffect(()=>{
getOrders()
}, [])
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const [q, setQ] = useState(0)


const images = importAll(require.context('../../IMAGES', false, /\.(png|jpe?g|svg)$/));


// const [totalV, setTotalV] = useState([])
function ORDERS({name}){
  const totalValues = []
    const newList =   orders.filter(order=> order.cusname == name)
    // console.log(newList)
    console.log(orders)
    // console.log(newList)
    // console.log(orders)
    // console.log(name)
    let total = 0
    for(let i = 0; i<newList.length; i++){
      const item = newList[i]
      total = total + (item.quantity * item.price)
    }
    totalValues.push(total)
    // setTotalV(totalValues)


    if(newList.length){
     
         return( newList.map(item=>{
            return (
              <>
             <Card style={{margin:'20px'}} >
             <CardContent style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
             <CardMedia  image={images[item.image]} style={{width:'100px', height:'100px', borderRadius:'100%'}} />
              <Typography variant='h5' style={{fontWeight:'bold'}}>{item.magac}</Typography>
              <Typography style={{fontWeight:'bold'}}>${item.price}</Typography>
             </CardContent>
              <div>
              <Typography style={{fontWeight:'bold'}}>Qty:{item.quantity}</Typography>
              </div>
             </Card>
             <Typography>${total}</Typography>
              </>
            )
         
          })
         )
    
        

    }

  // }

 }

 async function fuliyay(magac, telephone, id){
    const data = await (await api.post('/dir/fuliyay/customers', {magac, telephone})).data
    setTimeout(async ()=>{
      const newList = customer.filter(cus=> cus.id != id)
      setCustomers(newList)
      const data =  await (await api.patch('/delete/fulfilled/orders', {id})).data
   
    }, 2000)
 }

 async function deleteCusOrder(id){
  const newList = customer.filter(cus=> cus.id != id)
  setCustomers(newList)
   const data =  await (await api.patch('/delete/cus/order', {id})).data

   if(data.status){
    
   }
 }
 if(!customer.length){
  return (
  <>
    <Navbar />
   <Typography variant='h4' align='center' style={{marginTop:'100px'}}>WAX DALAB AH MA JIRAAN.</Typography>
  </>

  )
 }



  return (
    <>
    <Navbar />
    <div style={{height:'900px' , margin:'30px', overflowY:'scroll'}}>
      <Grid container style={{marginTop:'40px'}}>
        <Grid item sm={12} xs={12} gutterBottom style={{margin:'50px', position:'absolute', right:'10px', top:'20px'}} >
        </Grid>
        <Grid item sm={12} xs={12} gutterBottom style={{margin:'50px'}}>
            <Typography variant="h3" align='center'>DALABYADA</Typography> <hr style={{width:'200px'}} />
        </Grid>
        
        {customer.map((cus, index)=>{
          return (

      <Grid item sm={4} xs={12} md={3} style={{margin:'20px', position:'relative'}}>
           <Card style={{padding:'30px'}}>
         <Button variant='contained' style={{position:'absolute', top:'3px', right:'3px'}} onClick={()=>{
          fuliyay(cus.magac, cus.telephone, cus.id)
         }}>FULIYAY</Button>
            <Typography variant='h4'>{cus.magac}</Typography>
            <Typography variant='h5'>{cus.telephone}</Typography>
            <Typography variant='h6'>Taariikh : { new Date(cus.taariikh).toLocaleDateString()}</Typography>
            <ORDERS name={cus.magac} />
            <DeleteIcon variant='contained' color='danger' style={{fontSize:'30px'}} onClick={()=>{
              deleteCusOrder(cus.id)
            }} />

           </Card>

           
        </Grid>
          )
        })}
    
      
      </Grid>
    </div>
    </>
  )
}

export default AdminOrders
