import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

type Product = {
  id: number;
  image: string;
  price: number;
  title: string;
  category: string;
  description: string;
};

function App() {
  return (
    <>
      <Header />
      <Products />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="search-wrapper">
        <input className="search" type="text" />
        <button className="btn-search">Search</button>
      </div>
      <div className="cart">
        <button className="btn-cart">Cart 0</button>
      </div>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div className="product-box">
        <p>{product.title}</p>
        <img src={product.image} alt="" />
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://fakestoreapi.com/products')
      .then(response => response.json())
      .then(setProducts);
  }, []);

  return (
    <div className="container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
