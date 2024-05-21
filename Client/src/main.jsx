import React from 'react';
import ReactDOM from 'react-dom/client';
//component import
import App from './App.jsx';
//css import 
import './index.css';
//library import
import  { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import Store from './Redux/Store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={Store}>
   <BrowserRouter>
      <App/>
    <Toaster/>
   </BrowserRouter>
   </Provider>
  // </React.StrictMode>,
)
