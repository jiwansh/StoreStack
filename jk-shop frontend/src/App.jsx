import React from 'react'
import './App.css'

// User-facing pages
import Products from './components/products/Products'
import Home from './components/home/Home'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/cart/Cart'

// React Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Common shared component
import Navbar from './components/shared/Navbar'

// Toast notification component
import { Toaster } from 'react-hot-toast'

// Authentication pages
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'

// Protects routes based on login/admin status
import PrivateRoute from './components/PrivateRoute'

// Checkout pages
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'

// Admin pages
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/dashboard/Dashboard'
import AdminProducts from './components/admin/products/AdminProducts'
import Sellers from './components/admin/sellers/Sellers'
import Category from './components/admin/categories/Category'
import Orders from './components/admin/orders/Orders'

function App() {
  return (
    <React.Fragment>
      {/* Enables routing throughout the application */}
      <Router>
        {/* Navbar is visible on every page */}
        <Navbar />

        <Routes>

          {/* Public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />

          {/* Protected routes - User must be logged in */}
          <Route path='/' element={<PrivateRoute />}>

            {/* Checkout page */}
            <Route path='/checkout' element={<Checkout />} />

            {/* Stripe redirects here after successful payment */}
            <Route
              path='/order-confirm'
              element={<PaymentConfirmation />}
            />

          </Route>

          {/* Login/Register pages - Accessible only if user is NOT logged in */}
          <Route
            path='/'
            element={<PrivateRoute publicPage />}
          >

            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />

          </Route>

          {/* Admin-only routes */}
          <Route
            path='/'
            element={<PrivateRoute adminOnly />}
          >

            {/* Common layout for all admin pages */}
            <Route path='/admin' element={<AdminLayout />}>

              {/* Default admin dashboard */}
              <Route path='' element={<Dashboard />} />

              {/* Product management */}
              <Route path='products' element={<AdminProducts />} />

              {/* Seller management */}
              <Route path='sellers' element={<Sellers />} />

              {/* Order management */}
              <Route path='orders' element={<Orders />} />

              {/* Category management */}
              <Route path='categories' element={<Category />} />

            </Route>

          </Route>

        </Routes>

      </Router>

      {/* Displays toast notifications globally */}
      <Toaster position='bottom-center' />

    </React.Fragment>
  )
}

export default App