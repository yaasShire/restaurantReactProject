import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import payment from './lacagbixin.png'
import CloseIcon from '@material-ui/icons/Close'
import { api } from '../../COMPONENTS/axiosSetup';

import useStyles from './style'
function Checkout({ cItems, getTotal, total }) {
  if(!sessionStorage.getItem('email')){
    window.location.replace('/')
 }
  const [alertM, setAlertM] = useState(false)
  const [magac, setMagac] = useState('')
  const [ciwaan, setCiwaan] = useState('')
  const [telephone, setTelephone] = useState('')
  useEffect(()=>{
      getTotal()
  }, [])
  async function postDalbadahaXogtiisa(e){
    if((magac !='' && ciwaan !='') && telephone !=''){
       e.target.href='tel:*712*610941595*' + total + '#'
     const data =   await( await api.post('/xogta/dalbadaha/rasmiga', {magac, ciwaan, telephone})).data
     alert(data.status)
     }else{
        setAlertM(true)
     }
  }
  async function clearCart(){
    const email = sessionStorage.getItem('email')
    await api.patch('/clear/cart', {email})
  }

 
  async function sendCartOrders(){
    cItems.map(async (item)=>{
        const data = await (await api.post('/dir/dalabyada', {...item, cusName:magac})).data
        alertM(data.status)
    })
  }
  const classes = useStyles()
  return (
    <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
    <Typography variant="h4" style={{fontFamily:'Indie Flower'}}  align='center'>LACAG BIXINTA</Typography>

    <Card className={classes.root}  style={{width:'80vh'}}>
      <CardMedia className={classes.media} image={payment}  />
      {/* <CardContent> */}
      <Grid container style={{display:'flex', padding:'20px', width:'100%', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
       <Grid item sm={6}  xs={12}>
        {alertM && <Paper style={{width:'100%', height:'40px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>FADLAN BUUXI MEELAHA BANAAN</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
        </Grid> 
        <Grid item sm={6} xs={12}  style={{alignSelf:'flex-start'}}>
          <TextField required placeholder='magacaaga oo saddexan' type='text'  onChange={(e)=>setMagac(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='telephone' type='text' onChange={(e)=>setTelephone(e.target.value)} style={{width:'200px', padding:'10px',fontSize:'100px'}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='ciwaankaaga' type='text' onChange={(e)=>setCiwaan(e.target.value)} style={{width:'200px', padding:'10px',fontSize:'100px'}} />
        </Grid>
        
        <Grid item sm={12} xs={12} style={{margin:'10px',  width:'300px'}}>
          <a   variant='contained' style={{ border:'1px solid black',  color:'black', padding:'10px', paddingLeft:"10px", textDecoration:'none', margin:'10px'}} onClick={(e)=>{
            postDalbadahaXogtiisa(e)
            sendCartOrders()
            clearCart()
          }}>BIXI</a>
          <div style={{marginTop:'10px'}}>
          {/* <Link to='/signUp'>SignUp</Link> */}
          </div>
        </Grid>
    </Grid>
      {/* </CardContent> */}

    </Card>
    </div>
  )
}

export default Checkout
