
import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Container, Grid, Button, Typography, Paper } from '@material-ui/core';
import { api } from '../../COMPONENTS/axiosSetup';
import Navbar from '../../COMPONENTS/Navbar/Navbar';
export default function Diiwaangeli() {
  if(sessionStorage.getItem('email') != 'admin@gmail.com') {
    window.location.replace('/')
  }
    // const [magac, setMagac] = useState('')
    // const [tirada, setTirada] = useState(0)
    // const [qiimahaSheygiiba, setQiimahaSheygiiba] = useState(0)
    // const [faahfaahin, setFaahfaahin] = useState('')
    // const [sawir, setSawir] = useState('')
    // const [supplier, setSupplier] = useState('')
    // const [alertM, setAlertM] = useState('')
    // const [fillSelect, setFillSelect] = useState([])
    // const [category, setCategory] = useState('')
    // useEffect(()=>{
    //      getSuppliers()
    // }, [])
    const inputProps = {
        step: 1,
      };
    //   async function diiwaangeliBadeeco(){
    //       await api.post('/diiwaangeli', {magac, tirada, qiimahaSheygiiba, faahfaahin, sawir, supplier})
    //       console.log(sawir)

        
    // console.log(supplier)
    //   }
    // if(sessionStorage.getItem('email') === 'admin'){
    //   return;
    //  }else{
    //    window.location.replace('/')
    //  }
        
  return (
    // <Paper>
    <>
   
    <Navbar />
    <form action='http://18.216.96.47/api/v1/dir/product' method='post' encType='multipart/form-data' style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100%', margin:'0', marginLeft:'4px', marginRight:'200px', flexDirection:'column'}}>
    <Typography  align='center' variant="h4" gutterBottom>DIIWAANGELI </Typography>
    
        <Grid container justify="center" style={{fontSize:'23px', background:"gray", width:'90%', height:'60%', padding:'20px', color:'white', borderRadius:'5px'}} >
          <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}} >
            <label htmlFor="magac">Magac</label>
            <input   type="text" name='magac' required style={{width:'300px', height:'40px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid  item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}}  >
            <label htmlFor="qiimahaSheygiiba">Qiimaha Sheygiiba</label>
          <input  type="number" name='qiimahaSheygiiba' required style={{width:'300px', height:'40px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}} >
            <label htmlFor="tirada">Tirada</label>
          <input  type="text" required name='tirada'  style={{width:'300px', height:'40px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6} style={{display:'flex', flexDirection:'column'}} >
          <label htmlFor="tirada">Faahfaahin</label>
          <input  required type="faahfaahin" name='faahfaahin' style={{width:'300px', height:'40px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <input type="file" name='sawir' required style={{width:'400px', height:'40px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <select name="category" required style={{width:'auto', height:'40px'}}>
              <option value="">NOOCA</option>
              <option value="PIZZA">PIZAA</option>
              <option value="DOORO">DOORO</option>
              <option value="BARIIS">BARIIS</option>
              <option value='BAASTO'>BAASTO</option>
              
              
            </select>
          </Grid>
          <Grid item xs={12} sm={12}  md={12} lg={6}>
            <Button variant='contained' type='submit' style={{marginTop:'30px'}}>DIIWAANGELI</Button>
          </Grid>
      </Grid>
        </form>
    </>
    // </Paper>
     
    // </div>
   
    
  )
}
