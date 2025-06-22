import React from 'react'
import { Outlet } from 'react-router'
import { HelmetProvider, Helmet } from '@dr.pogodin/react-helmet'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from './ui/CustomHotToast'
import ScrollToTop from './ui/ScrollToTop'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <HelmetProvider>
      <Helmet
        defaultTitle="RepairRight - Professional Home Repair Services"
        titleTemplate="%s - RepairRight"
      >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="RepairRight" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <Outlet />
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App