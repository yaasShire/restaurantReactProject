import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import useStyles from './style'
import { api } from '../../COMPONENTS/axiosSetup';
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import fpImage from './fp_image.jpg'
function ForgetPassword() {
  if(sessionStorage.getItem('email')){
    window.location.replace('/badeeco')
  }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertM, setAlertM] = useState(false)
    const [eM, setEM] = useState(false)
    const [users, setUsers] = useState()
    async function getUsers(){
        const data = await (await api.get('/get/users/forget/password')).data
        const targetUser = data.filter(user=> user.email == email)
        console.log(targetUser)
        if(targetUser.lenth !==0  && password != ''){
            if(targetUser.length == 0){
               setEM(true)
               return
            }
            const data =   await (await api.put('/update/user/password', {email, password})).data
          if(data.status){
            setTimeout(()=>{
                window.location.replace('/')
            }, 1000)
          }
        }else{
            setAlertM(true)
        }
        setUsers(data)
        
    }
    

 
    const classes = useStyles()
  return (
    <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', fontSize:'27px'}}>
    <Typography variant="h4" style={{fontFamily:'Indie Flower'}}  align='center'>BADAL PASSWORD</Typography>

    <Card className={classes.root}  style={{width:'80vh'}}>
      <CardMedia className={classes.media} image={fpImage}  />
      {/* <CardContent> */}
      <Grid container style={{display:'flex', padding:'20px', width:'100%', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
       <Grid item sm={6}  xs={12}>
        {alertM && <Paper style={{width:'340px', height:'70px', fontSize:'24px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>ISKA HUBI emailka iyo passwordka</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
        {eM && <Paper style={{width:'340px', height:'70px', fontSize:'24px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>Majiro emailkan.</span> <CloseIcon onClick={()=>setEM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
        </Grid> 
        <Grid item sm={6} xs={12}  style={{alignSelf:'flex-start'}}>
          <TextField required placeholder='email' type='email'  onChange={(e)=>setEmail(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)} style={{width:'200px', padding:'10px',fontSize:'100px'}} />
        </Grid>
        
        <Grid item sm={12} xs={12}>
          <Button variant='contained' style={{width:'180px', height:'30px'}} onClick={()=>{
           getUsers()

          }}>BADAL</Button>
       
      
          
        </Grid>
    </Grid>
    </Card>
    </div>

  )
}

export default ForgetPassword
