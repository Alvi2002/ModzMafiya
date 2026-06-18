import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit3, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'app', imageUrl: '', downloadUrl: '', version: '', size: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "content"), (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি এটি ডিলিট করতে চান?")) {
      await deleteDoc(doc(db, "content", id));
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/admin-login');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "content"), { ...form, createdAt: serverTimestamp(), rating: 5 });
    setShowForm(false);
    alert("সফলভাবে যোগ হয়েছে!");
  };

  return (
    <div className="p-6 pb-32 bg-darkBg min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-primary">Mafia Dashboard</h2>
        <button onClick={handleLogout} className="p-2 bg-red-500 rounded-full"><LogOut size={20}/></button>
      </div>

      <button onClick={() => setShowForm(!showForm)} className="w-full bg-primary text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mb-6">
        <Plus size={20}/> {showForm ? "Close Form" : "Add New Content"}
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-cardBg p-6 rounded-3xl border border-borderGray mb-8 flex flex-col gap-4 text-black">
          <input type="text" placeholder="Name" className="p-3 rounded-xl" required onChange={(e) => setForm({...form, name: e.target.value})} />
          <select className="p-3 rounded-xl" onChange={(e) => setForm({...form, type: e.target.value})}>
            <option value="app">App</option>
            <option value="preset">Preset</option>
            <option value="prompt">Prompt</option>
          </select>
          <input type="text" placeholder="Image URL" className="p-3 rounded-xl" required onChange={(e) => setForm({...form, imageUrl: e.target.value})} />
          <input type="text" placeholder="Download Link / Prompt Text" className="p-3 rounded-xl" required onChange={(e) => setForm({...form, downloadUrl: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Version" className="p-3 rounded-xl" onChange={(e) => setForm({...form, version: e.target.value})} />
            <input type="text" placeholder="Size" className="p-3 rounded-xl" onChange={(e) => setForm({...form, size: e.target.value})} />
          </div>
          <button type="submit" className="bg-primary p-4 rounded-xl font-bold text-black uppercase">Save Content</button>
        </form>
      )}

      <div className="grid gap-4">
        {data.map(item => (
          <div key={item.id} className="bg-cardBg p-4 rounded-2xl border border-borderGray flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div>
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-[10px] text-primary uppercase">{item.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit3 size={18}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
