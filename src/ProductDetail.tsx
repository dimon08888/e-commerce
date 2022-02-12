import { useParams } from 'react-router-dom';
import { Product } from './types';

export default function ProductDetail({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  const { productId } = useParams();
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Product with id "{productId}" not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1> {product.title}</h1>
      <div className="border-solid border-2 border-neutral-500 rounded-md mt-3 mb-3">
        <img className="h-max w-52 rounded-md" src={product.image} alt="" />
      </div>
      <div className="font-bold mb-3">{product.category}</div>
      <div className="w-6/12 mb-3 border-solid border-2 border-neutral-500 rounded-md bg-white px-2 py-2">
        {product.description}
      </div>
      <div className="font-bold mb-3">
        {product.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="px-4 py-2 rounded-lg bg-neutral-500 hover:bg-neutral-400 cursor-pointer font-bold"
      >
        Add to cart
      </button>
    </div>
  );
}
