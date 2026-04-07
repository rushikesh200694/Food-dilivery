import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Handle unhandled promise rejections (e.g., from Firebase auth)
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.code === 'auth/invalid-continue-uri') {
    // Silently ignore Firebase invalid continue URI errors
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
 
)
