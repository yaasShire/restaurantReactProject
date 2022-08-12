import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import { api } from '../../COMPONENTS/axiosSetup';
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done'
// import  getName  from './OrderedProducts'
function FulfilledOr() {
  const [orders, setOrders] = useState([])

  const [customer, setCustomers] = useState([])
  async function getCusOrders(){
    const data = await( await api.get('/get/cus/fulfilled')).data
    setCustomers(data)
 
  }
useEffect(()=>{
    getCusOrders()
}, [])

async function getOrders(){
  const data = await (await api.get('/get/received/orders')).data
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
    const newList =   orders.filter(order=> order.cusName == name)
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



 async function deleteCusOrder(id){
  const newList = customer.filter(cus=> cus.id != id)
  setCustomers(newList)
   const data =  await (await api.patch('/delete/cus/fulfilled/order', {id})).data

   if(data.status){
    alert(data.status)
   }
 }



  return (
    <div>
        
      <Grid container style={{marginTop:'100px'}}>
      <Grid item sm={12} xs={12} gutterBottom style={{margin:'50px', position:'absolute', right:'10px', top:'20px'}} >
          <Link  variant='outlined' style={{textDecoration:'none', fontSize:'18px', background:'black', color:'white',  borderRadius:'5px', padding:'8px'}} to='/adminOrders'>DALABYADA AAN LA FULIN</Link>
        </Grid>
        <Grid item sm={12} xs={12} gutterBottom style={{margin:'50px'}}>
            <Typography variant="h5" align='center'>DALABYADA FULIYAY</Typography>
        </Grid>
        
        {customer.map((cus, index)=>{
          return (

      <Grid item sm={4} xs={12} md={3} style={{margin:'20px', position:'relative'}}>
           <Card style={{padding:'30px'}}>
            <Typography variant='h4'>{cus.magac}</Typography>
            <Typography variant='h5'>{cus.telephone}</Typography>
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
  )
}

export default FulfilledOr
