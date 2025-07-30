import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">E-Commerce Dashboard</h1>
      <div className="space-x-4">
        <button onClick={() => navigate('/products')} className="px-4 py-2 bg-green-600 text-white rounded">View Products</button>
        <button onClick={() => navigate('/add')} className="px-4 py-2 bg-yellow-600 text-white rounded">Add Product</button>
      </div>
    </div>
  );
}
