import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import type { Product } from './types';

function findLastIndex<T>(
  arr: readonly T[],
  pred: (el: T) => boolean,
): number | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return undefined;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const filteredProducts = useMemo(() => {
    return products.filter(
      product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  function onAddToCart(product: Product) {
    setCart(cart => [...cart, product]);
  }

  function onRemoveFromCart(product: Product) {
    setCart(cart => {
      const productFirstIndex = findLastIndex(cart, prod => prod === product);
      return cart.filter((_, index) => index !== productFirstIndex);
    });
  }

  function onSetSearch(value: string) {
    setSearch(value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  function onClearCart(): void {
    setCart([]);
  }

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    const valueCart = window.localStorage.getItem('cart');
    if (valueCart !== null) {
      try {
        setCart(JSON.parse(valueCart));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header cart={cart} search={search} onSetSearch={onSetSearch} />
      <Routes>
        <Route
          path="/"
          element={<Products products={filteredProducts} onAddToCart={onAddToCart} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetail products={products} onAddToCart={onAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              onClearCart={onClearCart}
              cart={cart}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          }
        />
      </Routes>
    </>
  );
}

function Header({
  cart,
  search,
  onSetSearch,
}: {
  cart: Product[];
  search: string;
  onSetSearch: (value: string) => void;
}) {
  return (
    <header className="header sticky top-0">
      <div>
        <Link className="no-underline font-bold text-black text-xl italic" to="/">
          E-commerce
        </Link>
      </div>
      <div className="search-wrapper">
        <input
          className="p-2 text-xl rounded-lg w-96"
          type="text"
          onChange={e => onSetSearch(e.target.value)}
          placeholder="Search"
          value={search}
        />
      </div>
      <div>
        <Link className="text-2xl no-underline text-black" to="/cart">
          <div className="font-bold">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i> {cart.length}
          </div>
        </Link>
      </div>
    </header>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="border-solid border-2 border-neutral-500 rounded-t-lg flex flex-col">
      <Link className="no-underline" to={'/products/' + product.id}>
        <h3 className="bg-neutral-400 font-bold text-white py-2 px-4 rounded-t-lg">
          {product.title}
        </h3>
      </Link>
      <div className="p-3 bg-white flex-grow flex flex-col">
        <div className="flex justify-center">
          <img src={product.image} alt="" className="h-32" />
        </div>
        <div className="overflow-ellipsis text-lg">{product.description}</div>

        <div className="w-full flex justify-around mt-auto items-center">
          <div className="font-bold">{product.category}</div>
          <div>
            <span className="text-lg font-bold">
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              className="ml-4 px-6 py-1 font-bold text-lg bg-neutral-500 text-white rounded-full hover:bg-neutral-700 cursor-pointer transition-colors duration-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Products({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default App;
