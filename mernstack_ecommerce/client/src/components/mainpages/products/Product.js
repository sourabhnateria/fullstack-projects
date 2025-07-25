import React, { useContext} from 'react';
import { GlobaLState } from '../../../GlobalState';
import ProductList from '../utils/ProductLists/ProductList';

const Product = () => {
  const state = useContext(GlobaLState);
  const [products] = state.productAPI.products;
  // const [isAdmin] = state.userAPI.isAdmin
  
  

  return (
    <div className="products">
      {products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        products.map((product) => (
          <ProductList key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Product;