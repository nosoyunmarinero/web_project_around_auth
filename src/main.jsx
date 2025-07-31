import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CurrentUserProvider } from './contexts/CurrentUserContext.jsx'


createRoot(document.getElementById('root')).render(
   <StrictMode>
    <CurrentUserProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </AuthProvider>
    </CurrentUserProvider>
  </StrictMode>
)
