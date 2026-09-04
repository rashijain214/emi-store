import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

export default function App(){
  return (
    <BrowserRouter>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">EMI Shop</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-gray-600">Products</Link>
          </nav>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products/:slug" element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
