import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products/').then(res => setProducts(res.data));
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`/products/${id}/`).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="border p-4 shadow rounded">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p>{p.description}</p>
            <p className="text-green-600">₹{p.price}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => navigate(`/edit/${p.id}`)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
