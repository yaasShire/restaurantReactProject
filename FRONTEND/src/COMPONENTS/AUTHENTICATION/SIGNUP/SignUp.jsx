import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import './style.css'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import FOODBG from './foodBackgroundImage.jpg'
import useStyles from './style'
import { api } from '../../axiosSetup';
import CloseIcon from '@material-ui/icons/Close'
function SignUp() {
    const [magac, setMagac] = useState('')
    const [ciwaan, setCiwaan] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertM, setAlertM] = useState(false)
    async function postUsers(){
        if((magac !='' && ciwaan !='') && (telephone !='' && email !='') && password !=''){
            sessionStorage.setItem('email', JSON.stringify(email))
           const data =  await (await api.post('/customer/registration', {magac, ciwaan, telephone, email, password})).data

           if(data){
               window.location.replace('/badeeco')
           }
        }else{
           setAlertM(true)
        }
    }
    const classes = useStyles()
  return (
    <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
    <Typography variant="h4" style={{fontFamily:'Indie Flower'}}  align='center'>SIGN UP</Typography>

    <Card className={classes.root} style={{width:'700px'}}>
      <CardMedia className={classes.media} image={FOODBG}  />
      <CardContent>
      <Grid container style={{display:'flex', padding:'20px', width:'100%', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
        <Grid item sm={6} xs={12}>
        {alertM && <Paper style={{width:'250px', height:'20px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>BUUXI MEELAHA BANAAN</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField required placeholder='magacaaga oo saddexan' onChange={(e)=>setMagac(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={4} xs={12}>
        <TextField required placeholder='ciwaankaaga' onChange={(e)=>setCiwaan(e.target.value)} style={{width:'200px', padding:'10px',fontSize:'100px'}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='telephonekaaga' onChange={(e)=>setTelephone(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='email-kaaga' type='email' onChange={(e)=>setEmail(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='password-kaaga' type='password' onChange={(e)=>setPassword(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant='contained' style={{width:'180px', height:'30px'}} onClick={()=>{
            postUsers()
          }}>SignUp</Button>
        </Grid>
    </Grid>
      </CardContent>

    </Card>
    </div>

  )
}

export default SignUp
