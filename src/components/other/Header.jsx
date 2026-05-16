import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    // window.location.reload()
  }
  return (
    <div className='flex items-center justify-between'>
        <h1 className='text-xl sm:text-2xl font-medium text-gray-400'>Hello <br /> <span className='text-2xl sm:text-3xl font-bold text-white'>{props.data ? props.data.firstName : 'Admin'} 👋</span></h1>
        <button onClick={logOutUser} className='bg-rose-600 hover:bg-rose-500 transition-colors text-xs sm:text-sm font-semibold text-white px-4 py-2 rounded-lg'>Log Out</button>
    </div>
  )
}

export default Header