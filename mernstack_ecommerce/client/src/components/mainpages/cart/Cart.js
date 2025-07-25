import React, { useContext } from 'react'
import { GlobaLState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

const Cart = () => {
  const state = useContext(GlobaLState)
  const [cart] = state.userAPI.cart

  if(cart.length === 0)
    return <h2 style={{textAlign: "center", fontsize: "5rem"}}> Cart Empty</h2>
  return (
    <div>
      {cart.map(product => (
        <div className='details'> <img src={product.product.images.url} alt=''/>
        <div className='box-detail'>
            <div className='row'>
                <h2>{product.product.title}</h2>
                <h6>{product.product_id}</h6>
            </div>
            <span> ${product.product.price}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <p>Sold:{product.sold}</p>
            <Link to="/cart" className='cart'>Buy Now</Link>
        </div>
        </div>
      ))}
    </div>
  )
}

export default Cart