import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminProvider } from './context/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
      />
        <App />
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
