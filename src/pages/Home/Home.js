import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Navbar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import './Home.css';

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </div>
  );
}

export default Home;