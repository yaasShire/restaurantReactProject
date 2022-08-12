import React, { useImperativeHandle, useRef } from 'react'
import './index.css'
 function Modal({setShow}, ref) {
    const fExit = useRef()
    const fCancel = useRef()

  useImperativeHandle(ref, ()=>{
    return {
      focusCancel: ()=> {
        fCancel.current.focus()
        fCancel.current.style.color="blue"
    },
      focusExit : ()=> {
        fExit.current.focus()
        fExit.current.style.color="red"
    }
    }
  })
  return (
    <div className='holder'>
   
    <h1>MODAL CONTENT GOES HERE</h1>
    <button ref={fCancel} onClick={()=> setShow(false)}  className='cancel'>Cancel</button>
    <button ref={fExit} className='exit'>Exit</button>
    </div>
  )
}

export default React.forwardRef(Modal)  