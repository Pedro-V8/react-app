import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Navbar from '../../components/NavBar/NavBar';

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </div>
  );
}

export default Home;