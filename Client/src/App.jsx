import { useEffect, useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'

import HomePage from './Pages/HomePage'

function App() {

  
  
  return (
    
    <Routes>
     <Route path="/" element={<HomePage/>}/>
    </Routes>
 
    
  )
}

export default App
