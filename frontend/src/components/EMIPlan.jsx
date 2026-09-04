import React from 'react'

export default function EMIPlan({plan, selected, onSelect}){
  return (
    <div className={`p-3 border rounded ${selected? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">₹{plan.monthlyAmount} / month</div>
          <div className="text-sm text-gray-600">Tenure: {plan.tenureMonths} months • Interest: {plan.interestRate}%</div>
        </div>
        <div>
          <button onClick={onSelect} className="px-3 py-1 bg-blue-600 text-white rounded">Select</button>
        </div>
      </div>
    </div>
  )
}
