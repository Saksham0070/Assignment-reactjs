import React from 'react'
import "./App.css";

export const Card = ({data}) => {
  return (
    <>
    <div className='card'>
        {data.map((product)=>(
            <div key={product.id} className='cards'>
                <div>
                    Product Name: {product.title}
                </div>
                <div>
                    Product Description: {product.description}
                </div>
            </div>
           
        ))}
    </div>
    </>
  )
}
