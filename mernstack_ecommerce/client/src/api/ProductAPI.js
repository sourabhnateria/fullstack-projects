import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from './axiosClient';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/api/product');
console.log('API Response:', res.data);
      
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      } else if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    loading: [loading, setLoading],
    error: [error, setError]
  };
};

export default ProductAPI;
