import React from 'react';
import type { Product } from './types';

export default function Cart({
  cart,
  onClearCart,
  onAddToCart,
  onRemoveFromCart,
}: {
  cart: Product[];
  onClearCart: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
}) {
  const cartEntries = React.useMemo(() => {
    const cartMap = new Map<Product, number>();

    for (const item of cart) {
      const count = cartMap.get(item) ?? 0;
      cartMap.set(item, count + 1);
    }

    return Array.from(cartMap);
  }, [cart]);

  return (
    <div className="">
      <h4 className="text-center text-xl">Shoping Cart</h4>
      <ul className="flex flex-col gap-2 items-center">
        {cartEntries.map(([product, count]) => (
          <li className="list-none text-xlt max-w-lg flex items-center" key={product.id}>
            <img className="w-10 h-10 mr-2" src={product.image} alt="" />
            <span className="hover:unreline">{product.title}</span>
            <span className="text-lg font-bold ml-2">{count}</span>
            <button
              className="px-2 py-1 rounded-md bg-green-600 ml-1 cursor-pointer hover:bg-green-500"
              onClick={() => onAddToCart(product)}
              aria-label={`Increase ${product.title} count`}
            >
              +
            </button>
            <button
              className="px-2 py-1 rounded-md bg-red-700 ml-1 cursor-pointer hover:bg-red-500"
              onClick={() => onRemoveFromCart(product)}
              aria-label={`Decrease ${product.title} count`}
            >
              -
            </button>
          </li>
        ))}
        <button
          className="px-3 py-2 cursor-pointer rounded bg-neutral-400 hover:bg-neutral-300"
          onClick={onClearCart}
        >
          Clear Cart
        </button>
      </ul>
    </div>
  );
}
