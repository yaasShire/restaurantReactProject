import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button, Card, Grid } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Jaziira from './JAZIIRA.png'
import useStyles from './style'
import './style.css'
import userImage from './userImage.png'
import { api } from '../axiosSetup';
import { useEffect } from 'react';
// import './Functionality'


const Navigation = () => {
  const [open, setOpen] = useState(false)
   function openOrClose(){
   const toggleButton = document.getElementsByClassName('toggle-button')[0]
   const navbarLinks = document.getElementsByClassName('navbar-links')[0]
   console.log(toggleButton)
   toggleButton.addEventListener('click', () => {
     navbarLinks.classList.toggle('active')
   })

 }
  const [pImage, setPImage]= useState([])
  const classes = useStyles()
  const [openH, setOpenH] = useState(true)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classNamees = useStyles();
  const location = useLocation();
  const [profile, setProfile] = useState([])
  const [openCard, setOpenCard] = useState(true)
  const [cardImage, setCardImage] = useState(false)
  const [tSawir, setTSawir] = useState('')
  
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  
  const images = importAll(require.context('../../ProfileImages', false, /\.(png|jpe?g|svg)$/));
  
  
  const [image, setImage] = useState('')

async function getUserProfile(){
  const data = await (await api.get('/get/user/profile')).data
  const email = sessionStorage.getItem('email')
  console.log(data)
  const newList = data.filter(pro=> pro.email == email)
  setPImage(newList)
  console.log(newList)
}
useEffect(()=>{
   getUserProfile()
}, [])

  // async function getUserProfile(){
  //  const data =  await (await api.get('/get/user/profile')).data
  //  const email = sessionStorage.getItem('email')
  //  const targetProfile = data.filter(prof=> prof.email == email)
  //  setImage(targetProfile[0].sawir) 
   
  //  console.log(targetProfile[0].sawir)
  // }


  function displayImage(e){
      setImage(URL.createObjectURL(e.target.files[0]))
      
  }
  useEffect(()=>{
    // getUserProfile()
   
}, [])
// const normlImage = image || userImage
// let action = pImage.length !=0 ? 
async function deleteProfile(){
  const email = sessionStorage.getItem('email')
  const data = await (await api.patch('/delete/user/profile', {email})).data
  if(data.status){
    getUserProfile()
    setPImage([])
  }
}
const targetImagee = pImage.length >=1? images[pImage[0].sawir] : userImage


// console.log(pImage[0].sawir)
// console.log(images)
  return (
    <div >
    <div >
    <nav className="navbar">
    <div className="brand-title">
    <img src={Jaziira}  alt="commerce.js" height="25px" className={classes.image} /> CARWA JAZIIRA
       
        </div>
    <a href="#" className="toggle-button" onClick={()=>{
      openOrClose()
    }}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </a>
    <div className="navbar-links">
      <ul>
        <Link to='/home' style={{textDecoration:'none'}}>
        <li ><a href="#">Home</a></li>
        </Link> 
        <Link to='/badeeco' style={{textDecoration:'none'}}>
        <li ><a href="#">Cunooyinka</a></li> 
        </Link> 
        <Link to='/history' style={{textDecoration:'none'}}>
        <li ><a href="#">XOGTA DALABYADA</a></li> 
        </Link> 
        {
          sessionStorage.getItem('role') == 'admin' && (
        <Link to='/panel' style={{textDecoration:'none'}}>
        <li ><a href="#">ADMIN PANEL</a></li> 
        </Link> 
          )
        }
       
        
      </ul>
    </div>
  </nav>
    </div>
    <a href="#" onClick={()=>{
      setOpen(prev=> !prev)
    }}>
     
        <img src={targetImagee} onClick={()=> setOpenCard(true)} style={{width:'50px', height:"50px", position:'absolute', right:'53px', top:'4px', borderRadius:'50%', cursor:'pointer'}} alt="user image" />

      
    </a>
    {open &&
    
    <form  action="http://18.216.96.47/api/v1/post/user/profile" method='post' encType='multipart/form-data'>
      {openCard && (
        <Card style={{minWidth:'300px', padding:"10px", minHeight:'100px', position:'absolute', right:'60px', top:'70px'}}>
          <Typography variant='h6' align='left'>signed in as <b>Yusuf Shire</b> </Typography>
          <label style={{cursor:'pointer'}} htmlFor="userImage"><i typeof='file' class="fa-solid fa-upload" accept='.png jpeg, jpg, .tiff'  style={{fontSize:'40px', margin:'20px 10px', cursor:'pointer'}}></i></label>
        <input onChange={(e)=>{
          setOpenCard(true)
          displayImage(e)
        }} type="file" id='userImage' style={{display:'none'}} name='profile' required />
            <input type="text" name='email' style={{display:'none'}} value={sessionStorage.getItem('email')} />
            <Button type='submit' variant='contained' color='primary' style={{marginRight:'8px'}}>{pImage.length>=1? 'BADAL' :'DIR'}</Button> <br />
            <Button type='button' variant='contained' onClick={()=>{
                        setCardImage(true)
            }}  style={{marginRight:'8px', marginBottom:'8px'}}>DAAWO</Button> <br />

           {pImage.length>=1 && 
           (<><Button type='submit' variant='contained' color='primary' style={{marginBottom:'7px'}} onClick={()=>{
            deleteProfile()
           }}>TIRTIR PROFILE</Button> <br /></>)
           }
            <Button component={Link} variant='contained' color='secondary' to='/' >LOGOUT</Button>
            
        </Card>

      ) }

    </form>
 }
{cardImage && (
<Grid container>
 <Grid item xs={12} sm={12}>
<Card style={{width:'100%', height:'60vh', padding:'20px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
<img src= {targetImagee} alt="profile image" style={{width:'300px', height:'300px'}} />
<Button variant='contained' style={{ marginLeft:'7px', marginTop:'5px'}} onClick={()=> setCardImage(false)} color='secondary'>KA LAABO</Button>
</Card>
 </Grid>

</Grid> 
)}
    </div>
  );
};

export default Navigation;