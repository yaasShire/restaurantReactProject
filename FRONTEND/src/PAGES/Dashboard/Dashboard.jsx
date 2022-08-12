
import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Container, Grid, Button, Typography, Paper } from '@material-ui/core';
import { api } from '../../COMPONENTS/axiosSetup';
import { Navbar } from '../../COMPONENTS/Navbar/Navbar';
export default function Dashboard() {
    const [magac, setMagac] = useState('')
    const [tirada, setTirada] = useState(0)
    const [qiimahaSheygiiba, setQiimahaSheygiiba] = useState(0)
    const [faahfaahin, setFaahfaahin] = useState('')
    const [sawir, setSawir] = useState('')
    const [supplier, setSupplier] = useState('')
    const [alertM, setAlertM] = useState('')
    const [fillSelect, setFillSelect] = useState([])
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
        
  return (
    // <Paper>
    <>
    <Navbar />
    <form action='http://localhost:2000/api/v1/dir/product' method='post' encType='multipart/form-data' style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100%', margin:'0', marginLeft:'70px', marginRight:'200px', flexDirection:'column'}}>
    <Typography  align='center' variant="h4" gutterBottom>DIIWAANGELI </Typography>
    
        <Grid container justify="center" style={{fontSize:'23px', background:"gray", width:'70%', height:'40%', padding:'5px', borderRadius:'5px'}} >
          <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}} >
            <label htmlFor="magac">Magac</label>
            <input  onChange={(e)=> setMagac(e.target.value)} type="text" name='magac' required style={{width:'250px', height:'20px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid  item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}}  >
            <label htmlFor="qiimahaSheygiiba">Qiimaha Sheygiiba</label>
          <input onChange={(e)=> setQiimahaSheygiiba(e.target.value)} type="number" name='qiimahaSheygiiba' required style={{width:'250px', height:'20px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{display:'flex', flexDirection:'column'}} >
            <label htmlFor="tirada">Tirada</label>
          <input onChange={(e)=> setTirada(e.target.value)} type="text" required name='tirada'  style={{width:'250px', height:'20px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6} style={{display:'flex', flexDirection:'column'}} >
          <label htmlFor="tirada">Faahfaahin</label>
          <input onChange={(e)=> setFaahfaahin(e.target.value)} type="faahfaahin" name='faahfaahin' style={{width:'250px', height:'20px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <input type="file" name='sawir' style={{width:'250px', height:'20px', padding:'6px', fontSize:'17px', borderRadius:'5px'}} />
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
