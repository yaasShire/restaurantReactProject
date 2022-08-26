import React, { useState, useEffect } from 'react'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { api } from '../../COMPONENTS/axiosSetup'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
function EditForm({ product, targetProduct, setShowForm, getProducts, setAlertM, targetId }) {
    const [magac, setMagac] = useState('')
    const [price, setPrice] = useState(0)
    useEffect(()=>{
        setMagac(product.magac)
        setPrice(product.price)
    }, [])

    async function saveUpdates(){
        if((magac !='' && price !=0) && (targetId !=0)){
           const data =  await (await api.put('/badal/magac/price', {magac, price, id:targetId})).data
           if(data.status){
            setTimeout(()=>{
                setShowForm(false)
                targetProduct.pop()
                getProducts()
             }, 2000)
           }
        }else{
            setAlertM(true)
           }
       }

    return (
        <Grid item xs={12} sm={12 } style={{display:"flex", padding:'10px', justifyContent:'center'}}>
            <Card style={{display:'flex', width:'100vw', height:'100px', padding:'10px', justifyContent:'center', alignItems:'center'}}>
                <div>
        <input value={magac} onChange={(e)=>{
            setMagac(e.target.value)
        }} type="text" style={{width:'200px', height:'40px', fontSize:'20px', borderRadius:'20px', padding:'9px'}} />
        <input value={price} onChange={(e)=>{
            setPrice(e.target.value)
        }}  type="number" style={{width:'70px', margin:'4px 10px', fontSize:'20px',  height:'27px', padding:'9px'}}  />

                </div>
                    
        <div>
        <SaveIcon style={{cursor:'pointer'}} onClick={()=>{
            saveUpdates()
           
        }} />

        </div>
            </Card>
        </Grid>
      )
}

export default EditForm
