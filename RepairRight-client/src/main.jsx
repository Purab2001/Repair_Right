import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/router.jsx';
import LoadingSpinner from './ui/LoadingSpinner.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
  </StrictMode>,
)
