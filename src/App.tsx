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
    <header>
      <input type="text" />
      <button></button>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      {product.title}
      <img width={100} height={100} src={product.image} alt="" />
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
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
