import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

export default function AddEditProduct() {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}/`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await axios.put(`/products/${id}/`, form);
    } else {
      await axios.post('/products/', form);
    }
    navigate('/products');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" value={form.name}
          className="w-full border p-2"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <textarea placeholder="Description" value={form.description}
          className="w-full border p-2"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input type="number" placeholder="Price" value={form.price}
          className="w-full border p-2"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
