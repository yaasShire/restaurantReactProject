import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActions, IconButton, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import { api } from '../../COMPONENTS/axiosSetup'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import { Edit } from '@material-ui/icons';
import EditForm from './EditForm';
import NormalState from './NormalState';
function MaamulBadeeco() {
  if(sessionStorage.getItem('role') == 'admin') {
     
  }else{
    window.location.replace('/')
  }
  const [q, setQ] = useState(0)
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      
      const images = importAll(require.context('../../IMAGES', false, /\.(png|jpe?g|svg)$/));
    const [products, setProducts] = useState([])
    async function getProducts(){
      const data =   await (await api.get('/get/maamul/badeeco')).data
      setProducts(data)
    }
    useEffect(()=>{
        getProducts()
    }, [])
    const [showForm, setShowForm] = useState(false)

    const [targetProduct, setTargetProduct] = useState([])
   function filterProducts(id){
    const newProduct = products.filter(product=> product.id == id)
    setTargetProduct(newProduct)

   }
   const [alertM, setAlertM] = useState(false)
const [targetId, setTargetId] = useState(0)
 

   async function deleteProduct(id){
       const data = await api.patch('/delete/maamul/badeeco/tirtir', {id})
       if(data.status){
           const newList = products.filter(product=> product.id != id)
           setProducts(newList)

       }
   }

    // function EditForm(){
    //   return (
    //     <Grid item xs={12} sm={12 } style={{display:"flex", padding:'10px', justifyContent:'center'}}>
    //         <Card style={{display:'flex', width:'100vw', height:'100px', padding:'10px', justifyContent:'center', alignItems:'center'}}>
    //             <div>
    //     <input value={magac} onChange={(e)=>{
    //         setMagac(e.target.value)
    //     }} type="text" style={{width:'200px', height:'40px', fontSize:'20px', borderRadius:'20px', padding:'9px'}} />
    //     <input value={price} onChange={(e)=>{
    //         setPrice(e.target.value)
    //     }}  type="number" style={{width:'70px', margin:'4px 10px', fontSize:'20px',  height:'27px', padding:'9px'}}  />

    //             </div>
                    
    //     <div>
    //     <SaveIcon style={{cursor:'pointer'}} onClick={()=>{
    //         saveUpdates()
           
    //     }} />

    //     </div>
    //         </Card>
    //     </Grid>
    //   )
    // }
    // function NormalState({ product }){
    //     return (
    //         <Grid item xs={12} sm={12 } style={{display:"flex", padding:'10px', justifyContent:'center'}}>
    //         <Card style={{display:"flex", justifyContent:'space-around', alignItems:'center', padding:'5px', minWidth:'490px'}}>
    //         <img src={images[product.image]} alt="" style={{width:"100px", height:'100px', borderRadius:'50%', marginLeft:'30px'}} />
    //         <Typography variant='h5'>{product.magac}</Typography> <br />
    //         <Typography variant='h4'>${product.price}</Typography>
    //         <EditIcon style={{cursor:'pointer', fontSize:'30px', color:'blue'}} onClick={()=>{
    //             setShowForm(true)
    //             filterProducts(product.id)
    //             setTargetId(Number(product.id))
    //         }} /> <br />
    //         <DeleteIcon style={{cursor:'pointer', color:'red', fontSize:'30px'}} onClick={()=>{
    //             deleteProduct(Number(product.id))
    //         }} />
    //         </Card>
    //     </Grid>
    //     )
    // }
    const newList = targetProduct.length>=1? targetProduct:  products
    console.log(targetProduct)

  return (
    <>
    <Navbar />
    <div style={{margin:'3px'}}>
      <Grid container align='center' > 
      <Grid item xs={12} sm={12}>
      {alertM && <Paper style={{width:'180px', height:'90px', position:'absolute', right:'30px', padding:'10px', display:'flex', justifyContent:'center', alignItems:'center', background:'red', color:'white'}} align='center' > <span style={{alignSelf:'flex-end', justifyContent:'flex-start'}}>WAA LAGU GUULDAREYSTAY KEYDINTA ISBADALKA CUSUB.</span> <CloseIcon onClick={()=>setAlertM(false)} titleAccess='xir'  style={{background:'red', alignSelf:'flex-start', cursor:'pointer'}}/> </Paper>}
      </Grid>
        {newList.map(product=>{
            return (
       !showForm ? <NormalState setShowForm={setShowForm} deleteProduct={deleteProduct} setTargetId={setTargetId} filterProducts={filterProducts} product={product} /> : <EditForm setShowForm={setShowForm} getProducts={getProducts} targetProduct={targetProduct} targetId={targetId} setAlertM={setAlertM}  product={product}    />
            )
        })}
      </Grid>
    </div>
    </>
  )
}

export default MaamulBadeeco
