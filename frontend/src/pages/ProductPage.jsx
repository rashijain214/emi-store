import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EMIPlan from '../components/EMIPlan'

export default function ProductPage(){
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')
    fetch(`${base}/api/products/${slug}`)
      .then(r=>r.json())
      .then(setProduct)
      .catch(err=>console.error(err))
  }, [slug])

  useEffect(()=>{
    if(product && product.variants && product.variants.length){
      setSelectedVariant(product.variants[0])
      setSelectedPlan(product.variants[0].emiPlans[0])
    }
  }, [product])

  if(!product) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6">
        <div className="md:flex gap-8">
          <div className="md:w-1/2">
            <img src={selectedVariant?.imageUrl} alt="product" className="w-full h-96 object-cover rounded" />
            <div className="mt-4 flex gap-2">
              {product.variants.map(v => (
                <button key={v.id} onClick={()=>{ setSelectedVariant(v); setSelectedPlan(v.emiPlans[0]) }} className={`px-3 py-1 border ${selectedVariant && v.id===selectedVariant.id? 'border-blue-600': 'border-gray-300'}`}>
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:flex-1">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>

            <div className="mt-4">
              <div className="text-gray-500">MRP: ₹{selectedVariant?.mrp}</div>
              <div className="text-3xl font-bold">₹{selectedVariant?.price}</div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">Available EMI Plans</h3>
              <div className="mt-3 space-y-3">
                {selectedVariant?.emiPlans.map(plan => (
                  <EMIPlan key={plan.id} plan={plan} selected={selectedPlan && selectedPlan.id===plan.id} onSelect={()=>setSelectedPlan(plan)} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button onClick={()=>alert(`Proceeding with ${selectedVariant?.name} - ${selectedPlan?.tenureMonths} months`)} className="px-6 py-3 bg-green-600 text-white rounded">Proceed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
