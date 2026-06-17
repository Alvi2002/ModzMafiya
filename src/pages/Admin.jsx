import React, { useState } from 'react';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Admin = () => {
  const [form, setForm] = useState({ name: '', type: 'app', version: '', size: '', downloadUrl: '', googlePlay: '' });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    // ছবি আপলোড করার লজিক
    if (image) {
      const storageRef = ref(storage, `icons/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    // ফায়ারবেসে ডাটা সেভ করা
    await addDoc(collection(db, "content"), {
      ...form,
      icon: imageUrl,
      rating: 5,
      downloads: "0",
      createdAt: serverTimestamp()
    });
    alert("Data Added Successfully!");
  };

  return (
    <div className="p-6 pb-28">
      <h2 className="text-2xl font-bold mb-6">Admin Panel - Add Content</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input type="text" placeholder="App/Prompt Name" className="p-3 rounded-xl" onChange={(e) => setForm({...form, name: e.target.value})} />
        <select className="p-3 rounded-xl" onChange={(e) => setForm({...form, type: e.target.value})}>
          <option value="app">Application</option>
          <option value="preset">Preset</option>
          <option value="prompt">AI Prompt</option>
        </select>
        <input type="text" placeholder="Version (e.g. 16.0.0)" className="p-3 rounded-xl" onChange={(e) => setForm({...form, version: e.target.value})} />
        <input type="text" placeholder="Size (e.g. 20MB)" className="p-3 rounded-xl" onChange={(e) => setForm({...form, size: e.target.value})} />
        <input type="file" className="text-white" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="bg-primary p-4 rounded-2xl font-bold">UPLOAD NOW</button>
      </form>
    </div>
  );
};

export default Admin;
