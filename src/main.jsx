import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextComponent } from './contexts/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

// radix themes 
import '@radix-ui/themes/styles.css'
import {Theme} from "@radix-ui/themes"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme accentColor="indigo" appearance="dark">
      <AuthContextComponent>
        <Router>
          <App />
        </Router>
      </AuthContextComponent>
    </Theme>
  </React.StrictMode>,
)
