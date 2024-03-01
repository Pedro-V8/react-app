import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const products = [
  { id: 1, name: 'Product 1', price: 20 },
  { id: 2, name: 'Product 2', price: 30 },
  // Add more products as needed
];

function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;