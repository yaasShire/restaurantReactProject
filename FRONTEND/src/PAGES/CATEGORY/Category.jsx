import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Container, Grid, Button, Typography, Paper } from '@material-ui/core';
import { api } from '../../COMPONENTS/axiosSetup';
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import CloseIcon from '@material-ui/icons/Close'

function Category() {
    if(sessionStorage.getItem('email') != 'admin@gmail.com') {
        window.location.replace('/')
      }
      const [alertM, setAlertM] = useState(false)
      const [successM, setSuccessM] = useState(true)
      const [valuee, setValuee] = useState('')
      const [cat, setCat] = useState('')
      async function diiwaangeliNooc(){
        if(cat !=''){
         const data =  await (await api.post('/dir/category', {cat})).data
         setSuccessM(true)
         setValuee('')

        }else{
            setAlertM(true)
        }
      }
      const inputProps = {
        step: 1,
      };
      
  return (
    <>
    <Navbar />
    <Grid Container justify="center" style={{fontSize:'23px', color:'black', width:'90%', height:'60%', padding:'20px', color:'white', borderRadius:'5px'}}>
      <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}}>
      <Typography  align='center' variant="h4" gutterBottom style={{color:'black'}}>DIIWAANGELI NOOC </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} style={{display:'flex', flexDirection:'column'}}>
      {alertM && <Paper style={{width:'300px', height:'70px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>NOOCA QOR ADIGOO MAHADSAN</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      {successM && <Paper style={{width:'300px', height:'70px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'green', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>WAALA KEYDIYAY XOGTA</span> <CloseIcon onClick={()=>setSuccessM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}}>
        <TextField value={valuee} onChange={(e)=>{
             setCat(e.target.value)
             setValuee(e.target.value)
        }} type="text" name='magac' required style={{width:'310px', height:'50px', padding:'6px', fontSize:'65px', borderRadius:'5px'}} />
      </Grid>
      <Grid item xs={12} sm={12}  md={12} lg={6}>
            <Button variant='contained'  style={{marginTop:'30px', fontSize:'18px'}} onClick={()=>{
                diiwaangeliNooc()
            }}>DIIWAANGELI</Button>
      </Grid>
    </Grid>
    </>
  )
}

export default Category
