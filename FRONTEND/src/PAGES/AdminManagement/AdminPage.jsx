import React, { useState, useEffect, useRef } from 'react'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper, useForkRef } from '@material-ui/core';
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { api } from '../../COMPONENTS/axiosSetup';
import CloseIcon from '@material-ui/icons/Close'
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import NormalState from './NormalState';
import './style.css'
import FormState from './FormState';
function AdminPage() {
    if(sessionStorage.getItem('role') == 'admin') {
     
    }else{
      window.location.replace('/')
    }
    const [magac, setMagac] = useState('')
    const [telephone, setTelephone] = useState('')
    const [ciwaan, setCiwaan] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertM, setAlertM] = useState(false)
    const [adminU, setAdminU] = useState([])
    const [open, setOpen] = useState(false)
    const magacV = useRef()
    const ciwaanV = useRef()
    const emailV = useRef()
    const telephoneV = useRef()
    const passwordV = useRef()
    const [targetId, setTargetId] = useState(0)
    const [alertE, setAlertE] = useState(false)
    const [sM, setSM] = useState(false)
    async function keydiAdmin(){
        if((magac !='' && telephone !='') && (ciwaan !='' && email !='') && password !=''){
           const data =  await (await api.post('/dir/admin/users', {magac, telephone, ciwaan, email, password, role:'admin'})).data
          
            console.log(magacV.current)
               magacV.current.value = null
               ciwaanV.current.value = null
               telephoneV.current.value = null
               passwordV.current.value = null
               emailV.current.value = null
          
        }else{
            setAlertM(true)
        }
    }
     
    async function deleteAdmin(id){
        const data =  await (await api.patch('/delete/admin', {id})).data
        if(data.status){
            const newList = adminU.filter(ad=> ad.id != id)
            setAdminU(newList)
        }
    }

    async function fetchAdmin(){
       const data  = await (await api.get('/get/admin')).data
       setAdminU(data)
       console.log(data)
    }
    useEffect(()=>{
          fetchAdmin()
    }, [])

    let targetAdmin = adminU.filter(ad=> ad.id == targetId)
    console.log(targetAdmin)
    const newList = targetAdmin.length !=0 ? targetAdmin : adminU

    
  return (
    <>
    <Navbar />
    <Grid conainer >
        <Grid item xs={12} sm={12}>
    <Grid container style={{padding:'30px'}}>
        <Grid item xs={12} sm={12} style={{marginBottom:'30px'}}>
      <div item  style={{marginBottom:'40px'}} >
      {alertM && <Paper style={{width:'100%', height:'40px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>FADLAN BUUXI MEELAHA BANAAN</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      </div>
            <Typography variant='h4' align='center' gutterBottom>DIIWAANGELI ADMIN</Typography><hr style={{width:'300px'}} />
        </Grid>
      <Grid item xs={12} sm={6} style={{margin:'10px 0px'}} >
        <input className='inputTxt' style={{width:'200px', background:'transparent', border:"0", borderBottom:'1px solid black', padding:'5px', paddingBottom:'8px'}} ref={magacV} onChange={(e)=> setMagac(e.target.value)} placeholder='magaca oo saddexan'/>

      </Grid>
      <Grid item xs={12} sm={6} style={{margin:'10px 0px'}} >
        <input className='inputTxt' style={{width:'200px', background:'transparent', border:"0", borderBottom:'1px solid black', padding:'5px', paddingBottom:'8px'}} ref={ciwaanV} onChange={(e)=> setCiwaan(e.target.value)} placeholder='ciwaanka'/>

      </Grid>
      <Grid item xs={12} sm={6} style={{margin:'10px 0px'}}>
        <input className='inputTxt' style={{width:'200px', background:'transparent', border:"0", borderBottom:'1px solid black', padding:'5px', paddingBottom:'8px'}} ref={telephoneV} onChange={(e)=> setTelephone(e.target.value)} placeholder='telephone'/>

      </Grid>
      <Grid item xs={12} sm={6} style={{margin:'10px 0px'}} >
        <input className='inputTxt' style={{width:'200px', background:'transparent', border:"0", borderBottom:'1px solid black', padding:'5px', paddingBottom:'8px'}} ref={emailV} type='email' onChange={(e)=> setEmail(e.target.value)} placeholder='email'/>

      </Grid>
      <Grid item xs={12} sm={6} style={{margin:'10px 0px'}}>
        <input className='inputTxt' style={{width:'200px', background:'transparent', border:"0", borderBottom:'1px solid black', padding:'5px', paddingBottom:'8px'}} ref={passwordV} type='password' onChange={(e)=> setPassword(e.target.value)} placeholder='password'/>
      </Grid>
      <Grid item xs={12} sm={12} style={{marginTop:'30px'}}>
        <Button variant='contained' color='primary' onClick={()=>{
            keydiAdmin()
            setTimeout(()=>{
                fetchAdmin()

            },1000)
        }}>DIIWAANGELI</Button>
      </Grid>
    </Grid>
        </Grid>
        <div item  style={{marginBottom:'40px'}} >
      {alertE && <Paper style={{width:'100%', height:'40px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>FADLAN BUUXI MEELAHA BANAAN</span> <CloseIcon onClick={()=>setAlertE(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      {sM && <Paper style={{width:'100%', height:'40px', padding:'4px', display:'flex', justifyContent:'center', alignItems:'center', background:'green', color:'white', marginRight:'30px'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>WAALA KEYDIYAY ISBADALKA CUSUB</span> <CloseIcon onClick={()=>setSM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      </div>
        <Grid item xs={12} sm={12} style={{margin:'30px 30px', fontSize:'23px' }}>
            <table border="1px" style={{margin:'20px'}}>
                <thead style={{margin:'20px'}}>
                    <th>ID</th>
                    <th>MAGACA</th>
                    <th>CIWAAN</th>
                    <th>TELEPHONE</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th style={{marginLeft:'20px', marginRight:'20px'}}>ACTIONS</th>
                </thead>
                <tbody style={{textAlign:'center', margin:'20px'}} >
                    {newList.map(admin=>{
                        return (
                          !open ? <NormalState deleteAdmin={deleteAdmin} setTargetId = {setTargetId} admin={admin} setOpen={setOpen} /> : <FormState setSM={setSM} setAlertE={setAlertE} setTargetId = {setTargetId} setOpen={setOpen} admin={admin} />
                        )
                    })}
                 
                 
                </tbody>
            </table>
        </Grid>
    </Grid>
    </>
  )
}

export default AdminPage
