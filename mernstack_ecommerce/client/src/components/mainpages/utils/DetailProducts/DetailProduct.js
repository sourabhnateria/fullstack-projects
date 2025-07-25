import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobaLState } from '../../../../GlobalState';

const DetailProduct = () => {

    const params = useParams()
    const state = useContext(GlobaLState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params){
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            });
        }
    }, [params, products])

    if (detailProduct.length === 0) return null;

    console.log(detailProduct)
  return (
    <div className='details'> <img src={detailProduct.images.url} alt=''/>
        <div className='box-detail'>
            <div className='row'>
                <h2>{detailProduct.title}</h2>
                <h6>{detailProduct.product_id}</h6>
            </div>
            <span> ${detailProduct.price}</span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p>Sold:{detailProduct.sold}</p>
            <Link to="/cart" className='cart'>Buy Now</Link>
        </div>
    </div>
  )
}

export default DetailProduct