import React, { useState, useEffect } from 'react'
import { api } from './COMPONENTS/axiosSetup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './PAGES/Dashboard/Dashboard';
import PanelAd from './COMPONENTS/Panel/PanelAd';
import Products from './COMPONENTS/Products/Products';
import SignUp from './COMPONENTS/AUTHENTICATION/SIGNUP/SignUp';
import Login from './COMPONENTS/AUTHENTICATION/LOGIN/Login'
import Cart from './COMPONENTS/CART/Cart';
import Checkout from './PAGES/Checkout/Checkout';
import AdminOrders from './PAGES/ORDERHANDLER/AdminOrders';
import FulfilledOr from './PAGES/FulfilledOrders/FulfilledOr';
function App() {
  const [products, setProducts] = useState([])
  async function getAllProducts(){
   const data = await (await api.get('/get/products')).data
   setProducts(data)
  }
  const [cItems, setCItems] = useState([])
  async function getCartItem(){
    const data = await (await api.get('/get/cart/items')).data
    console.log(data)
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
   const data =  await (await api.put('/update/cart/quantity', {magaca, quantity})).data
 }
  return (
    <Router>
      <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Login />} />
      <Route path="/panel" element={<PanelAd />} />
      <Route path="/adminOrders" element={<AdminOrders />} />
      <Route path="/diiwaangelinta" element={<Dashboard />} />
      <Route path="/products" element={<Dashboard />} />
      <Route path="/badeeco" element={<Products products={products} getCartItem={getCartItem} />} />
      <Route path="/cart" element={<Cart getTotal={getTotal} total={total} updateQuantity={updateQuantity} cItem={cItems} removeItem={removeItem} />} /> 
      <Route path="/checkout" element={<Checkout cItems={cItems} />} />
      <Route path="/fullFilled" element={<FulfilledOr  />} />

      </Routes>
    </Router>
  )
}

export default App
