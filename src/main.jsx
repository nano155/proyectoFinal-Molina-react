import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/styles.css'
import { SanBifeApp } from './SanBifeApp'
import { BrowserRouter } from 'react-router-dom'
import './firebase/config.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SanBifeApp />
    </BrowserRouter>
  </React.StrictMode>
)
