import React from 'react';
import { Product } from './types';

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
    <div className="product-list absolute">
      <h4 className="text-center">Shoping Cart</h4>
      <ul className="flex flex-col gap-2">
        {cartEntries.map(([product, count]) => (
          <li
            className="list-none hover:outline outline-green-500 hover:outline-2 text-left text-sm"
            key={product.id}
          >
            {product.title} {count}
            <button
              onClick={() => onAddToCart(product)}
              aria-label={`Increase ${product.title} count`}
            >
              +
            </button>
            <button
              onClick={() => onRemoveFromCart(product)}
              aria-label={`Decrease ${product.title} count`}
            >
              -
            </button>
          </li>
        ))}
        <button onClick={onClearCart}>Clear Cart</button>
      </ul>
    </div>
  );
}
