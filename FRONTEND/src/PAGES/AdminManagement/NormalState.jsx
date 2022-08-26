import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function NormalState({ admin, setOpen, setTargetId, deleteAdmin }) {
  return (
    <tr>
    <td style={{margin:'0px 10px'}}>{admin.id}</td>
    <td style={{margin:'0px 10px'}}>{admin.magac}</td> 
    <td style={{margin:'0px 10px'}}>{admin.ciwaan}</td> 
    <td style={{margin:'0px 10px'}}>{admin.telephone}</td>
    <td style={{margin:'0px 10px'}}>{admin.email}</td>
    <td style={{margin:'0px 10px'}}>{admin.password}</td>
    <td style={{margin:'0px 10px'}}><EditIcon style={{cursor:'pointer', color:'blue'}} onClick={()=>{
        setTargetId(Number(admin.id))
        setOpen(true)
    }} /></td>
    <td style={{margin:'0px 10px'}}><DeleteIcon style={{cursor:'pointer', color:'red'}} onClick={()=>{
        deleteAdmin(Number(admin.id))
    }} /></td>
</tr>
  )
}

export default NormalState
