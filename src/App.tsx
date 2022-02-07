import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProductDetail from './ProductDetail';

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
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div className="search-wrapper">
        <input className="p-2 text-xl rounded-lg w-96" type="text" />
      </div>
      <div className="busket">
        <button className="btn-busket">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> 0
        </button>
      </div>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border-solid border-2 border-blue-600 rounded-t-lg flex flex-col">
      <Link to={'/products/' + product.id}>
        <h3 className="bg-blue-600 font-bold text-white py-2 px-4">{product.title}</h3>
      </Link>
      <div className="p-3 bg-white flex-grow flex flex-col">
        <div className="flex justify-center">
          <img src={product.image} alt="" className="h-32" />
        </div>
        <div className="overflow-ellipsis text-lg">{product.description}</div>

        <div className="w-full flex justify-around mt-auto items-center">
          <div>{product.category}</div>
          <div>
            <span className="text-lg font-bold">
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <button className="ml-4 px-6 py-1 font-bold text-lg bg-blue-800 text-white rounded-full hover:bg-blue-900">
              Add to Cart
            </button>
          </div>
        </div>
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
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
