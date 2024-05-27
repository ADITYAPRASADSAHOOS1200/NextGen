import { useEffect, useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'

import HomePage from './Pages/HomePage'
import Signup from './Componenets/Signup'
import Signin from './Componenets/Signin'

function App() {

  
  
  return (
    
    <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/Signup" element={<Signup/>}/>
     <Route path="/Signin" element={<Signin/>}/>
    </Routes>
 
    
  )
}

export default App
