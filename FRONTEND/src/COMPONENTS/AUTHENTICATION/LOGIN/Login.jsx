import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import FOODBG from './foodBackgroundImage.jpg'
import useStyles from './style'
import { api } from '../../axiosSetup';
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import SignUp from '../SIGNUP/SignUp';
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertM, setAlertM] = useState(false)
    const [users, setUsers] = useState()
    async function getUsers(){
        const data = await (await api.get('/get/users')).data
        setUsers(data)
        console.log(data)
    }
    
//  if(window.location == '/'){
  function setAuth(){

    sessionStorage.setItem('email', '')
    
  }
  useEffect(()=>{
   setAuth()
  }, [])
//  }
    function findTargetUser(){
        const targetUser = users.find(user=> user.email == email && user.password == password)
        if(targetUser){
            sessionStorage.setItem('email', targetUser.email)
           window.location.replace('/home')
        }else{
                   setAlertM(true)
                }
        console.log(targetUser)
    }
    useEffect(()=>{
         getUsers()   
    }, [])
 
    const classes = useStyles()
  return (
    <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
    <Typography variant="h4" style={{fontFamily:'Indie Flower'}}  align='center'>Login</Typography>

    <Card className={classes.root}  style={{width:'80vh'}}>
      <CardMedia className={classes.media} image={FOODBG}  />
      {/* <CardContent> */}
      <Grid container style={{display:'flex', padding:'20px', width:'100%', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
       <Grid item sm={6}  xs={12}>
        {alertM && <Paper style={{width:'250px', height:'40px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>ISKA HUBI emailka iyo passwordka</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
        </Grid> 
        <Grid item sm={6} xs={12}  style={{alignSelf:'flex-start'}}>
          <TextField required placeholder='email' type='email'  onChange={(e)=>setEmail(e.target.value)} style={{width:'200px', padding:'10px', fontSize:"30px"}} />
        </Grid>
        <Grid item sm={6} xs={12}>
        <TextField required placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)} style={{width:'200px', padding:'10px',fontSize:'100px'}} />
        </Grid>
        
        <Grid item sm={12} xs={12}>
          <Button variant='contained' style={{width:'180px', height:'30px'}} onClick={()=>{
            findTargetUser()
          }}>Login</Button>
          <div style={{marginTop:'10px'}}>
          <span style={{marginRight:'10px'}}>akoon malihi:</span>
          <Link to='/signUp'>SignUp</Link>
          </div>
          <div style={{marginTop:'10px'}}>
          <Link to='/forgetpassword'>forget password</Link>
          </div>
          
        </Grid>
    </Grid>
      {/* </CardContent> */}

    </Card>
    </div>

  )
}

export default Login
