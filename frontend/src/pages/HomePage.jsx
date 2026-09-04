import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage(){
  const [products, setProducts] = useState([])

  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || 'https://emi-store-omuy.onrender.com'
    fetch(`${base}/api/products`)
      .then(r=>r.json())
      .then(setProducts)
      .catch(()=>setProducts([]))
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map(p => (
          <Link key={p.id} to={`/products/${p.slug}`} className="block bg-white rounded shadow hover:shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="h-40 bg-gray-100 flex items-center justify-center">Image</div>
              <h2 className="mt-4 font-medium">{p.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
