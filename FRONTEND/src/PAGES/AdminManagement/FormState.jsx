import React from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import { useState } from 'react'
import { useEffect } from 'react'
import { api } from '../../COMPONENTS/axiosSetup'
function FormState({ admin, setOpen, setTargetId, setAlertE, setSM }) {
    
    const [magac, setMagac] = useState('')
    const [ciwaan, setCiwaan] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState(0)
   
    useEffect(()=>{
        setMagac(admin.magac)
        setCiwaan(admin.ciwaan)
        setTelephone(admin.telephone)
        setEmail(admin.email)
        setPassword(admin.password)
        setId(admin.id)
    }, [])
   
    async function postAdminUpdates(){
        if((magac !='' && ciwaan !='') && (telephone !='' && email !='') && password !=''){
         const data =    await (await api.put('/post/admin/updates',{magac, ciwaan, telephone, email, password, id})).data
           if(data.status){
               setSM(true)
           }
        }else {
            setAlertE(true)
        }
     }
  return (
    <tr>
          <td style={{margin:'10px 10px'}}>
            <TextField value={id}  onChange={(e)=> setMagac(e.target.value)} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <TextField value={magac} onChange={(e)=> setMagac(e.target.value)} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <TextField value={ciwaan} onChange={(e)=> setCiwaan(e.target.value)} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <TextField value={telephone} onChange={(e)=> setTelephone(e.target.value)}  />
          </td>
          <td style={{margin:'0px 10px'}}>
            <TextField value={email} onChange={(e)=> setEmail(e.target.value)} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <TextField value={password} onChange={(e)=> setPassword(e.target.value)} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <SaveIcon style={{cursor:'pointer', color:'blue'}} onClick={()=>{
                postAdminUpdates()
            }} />
          </td>
          <td style={{margin:'0px 10px'}}>
            <CloseIcon style={{cursor:'pointer', color:'red'}} onClick={()=>{
                setOpen(false)
                setTargetId(0)
            }} />
          </td>


    </tr>
  )
}

export default FormState
