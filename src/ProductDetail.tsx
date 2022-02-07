import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  return (
    <div>
      <h1>Detail about product with id {productId}</h1>
    </div>
  );
}
