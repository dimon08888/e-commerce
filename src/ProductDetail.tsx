import { useParams } from 'react-router-dom';
import { Product } from './types';

export default function ProductDetail({ products }: { products: Product[] }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Product with id "{productId}" not found</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      {/* <h1>Detail about product with id {productId}</h1>
      <div>{products.ma}</div>
      <div>Description</div> */}
      <button>Add to cart</button>
    </div>
  );
}
