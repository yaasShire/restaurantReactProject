import React, { useState, useEffect } from 'react'
import { api } from './COMPONENTS/axiosSetup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diiwaangeli from './PAGES/Dashboard/Diiwaangeli';
import PanelAd from './COMPONENTS/Panel/PanelAd';
import Products from './COMPONENTS/Products/Products';
import SignUp from './COMPONENTS/AUTHENTICATION/SIGNUP/SignUp';
import Login from './COMPONENTS/AUTHENTICATION/LOGIN/Login'
import Cart from './COMPONENTS/CART/Cart';
import Checkout from './PAGES/Checkout/Checkout';
import AdminOrders from './PAGES/ORDERHANDLER/AdminOrders';
import FulfilledOr from './PAGES/FulfilledOrders/FulfilledOr';
import Navigation from './COMPONENTS/ModernNavigation/Navigation';
import MaamulBadeeco from './PAGES/MAAMULBADEECADA/MaamulBadeeco';
import Home from './PAGES/Homepage/Home';
import History from './PAGES/CustomerHistory/History';
import ForgetPassword from './PAGES/ForgetPassword/ForgetPassword';
import Category from './PAGES/CATEGORY/Category';
import AdminPage from './PAGES/AdminManagement/AdminPage';
function App() {
  const [products, setProducts] = useState([])
  async function getAllProducts(){
   const data = await (await api.get('/get/products')).data
   setProducts(data)
  }
  const [cItems, setCItems] = useState([])
  async function getCartItem(){
    const data = await (await api.get('/get/cart/items')).data
    const email = sessionStorage.getItem('email')
    const targetOrders = data.filter(item=> item.email == email)
    setCItems(targetOrders)

  }

  useEffect(()=>{
    getAllProducts()
    getCartItem()
  }, [])
  async function removeItem(id){
    const newCart = cItems.filter(item=> item.id != id)
    setCItems(newCart)
    await api.patch('/remove/cart/item', {id})
 }
 const [total, setTotal] = useState(0)
 async function getTotal(){
  const email = sessionStorage.getItem('email')
   const data = await (await api.get('/get/total')).data
   const newList = data.filter(item=> item.email === email)
   let wadarta = 0
   for(let i = 0; i< newList.length; i++){
    const item = newList[i]
    
    wadarta = wadarta + (item.price * item.quantity )
   }
   setTotal(wadarta)
 }
 useEffect(()=>{
   getTotal()
 }, [])
 async function updateQuantity(magaca, quantity){
  const realQuantity = quantity == ''? 1 : Number(quantity)
   const data =  await (await api.put('/update/cart/quantity', {magaca, realQuantity})).data
 }
  return (
    <Router>
      <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Login />} />
      {/* { sessionStorage.getItem('email') &&} */}
      <Route path="/panel" element={<PanelAd />} />
      <Route path="/adminOrders" element={<AdminOrders />} />
      <Route path="/diiwaangelinta" element={<Diiwaangeli />} />
      {/* <Route path="/products" element={<Dashboard />} /> */}
      <Route path="/badeeco" element={<Products products={products} getCartItem={getCartItem} />} />
      <Route path="/cart" element={<Cart getCartItem={getCartItem} getTotal={getTotal} total={total} updateQuantity={updateQuantity} cItem={cItems} removeItem={removeItem} />} /> 
      <Route path="/checkout" element={<Checkout getCartItem={getCartItem} cItems={cItems} total={total} getTotal={getTotal} />} />
      <Route path="/fullFilled" element={<FulfilledOr  />} />
      {/* <Route path="/Navigation" element={<Navigation  />} /> */}
      <Route path="/home" element={<Home  />} />
      <Route path="/maamulBadeeco" element={<MaamulBadeeco  />} />
      <Route path="/history" element={<History  />} />  
      <Route path="/forgetpassword" element={<ForgetPassword  />} />    
      <Route path="/category" element={<Category  />} />    
      <Route path="/adminManage" element={<AdminPage  />} />    
      </Routes>
    </Router>
  )
}

export default App
