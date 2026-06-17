import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Admin = () => {
  const [form, setForm] = useState({
    name: '', type: 'app', version: '', size: '', developer: 'Modz Mafia',
    downloadUrl: '', googlePlay: '', imageUrl: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "content"), {
        ...form,
        rating: 5,
        downloads: "0",
        createdAt: serverTimestamp()
      });
      alert("সফলভাবে অ্যাড হয়েছে!");
      window.location.reload();
    } catch (error) {
      alert("ভুল হয়েছে: " + error.message);
    }
  };

  return (
    <div className="p-6 pb-32 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input type="text" placeholder="Name (e.g. CapCut Pro)" className="p-4 rounded-2xl outline-none" required onChange={(e) => setForm({...form, name: e.target.value})} />
        
        <select className="p-4 rounded-2xl outline-none" onChange={(e) => setForm({...form, type: e.target.value})}>
          <option value="app">Application</option>
          <option value="preset">Preset</option>
          <option value="prompt">AI Prompt</option>
        </select>

        <input type="text" placeholder="Image Direct URL (লিঙ্ক এখানে দিন)" className="p-4 rounded-2xl outline-none" required onChange={(e) => setForm({...form, imageUrl: e.target.value})} />
        <input type="text" placeholder="Version (e.g. 16.0.0)" className="p-4 rounded-2xl outline-none" onChange={(e) => setForm({...form, version: e.target.value})} />
        <input type="text" placeholder="Size (e.g. 20MB)" className="p-4 rounded-2xl outline-none" onChange={(e) => setForm({...form, size: e.target.value})} />
        <input type="text" placeholder="Download/Copy URL" className="p-4 rounded-2xl outline-none" required onChange={(e) => setForm({...form, downloadUrl: e.target.value})} />
        <input type="text" placeholder="Google Play URL (Optional)" className="p-4 rounded-2xl outline-none" onChange={(e) => setForm({...form, googlePlay: e.target.value})} />
        <textarea placeholder="Description" className="p-4 rounded-2xl outline-none h-32" onChange={(e) => setForm({...form, description: e.target.value})}></textarea>
        
        <button type="submit" className="bg-primary p-5 rounded-3xl font-black text-lg shadow-lg active:scale-95 transition-all">UPLOAD CONTENT</button>
      </form>
    </div>
  );
};

export default Admin;
