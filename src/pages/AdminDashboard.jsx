import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit3, Plus, Settings, List, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ settings }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'app', imageUrl: '', downloadUrl: '', version: '', size: '', rating: '5.0', votes: '1.5K' });
  const [editId, setEditId] = useState(null);
  const [siteSettings, setSiteSettings] = useState(settings);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "content"), (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, "content", editId), form);
      setEditId(null);
    } else {
      await addDoc(collection(db, "content"), { ...form, createdAt: serverTimestamp() });
    }
    setForm({ name: '', type: 'app', imageUrl: '', downloadUrl: '', version: '', size: '', rating: '5.0', votes: '1.5K' });
    alert("সফলভাবে সেভ হয়েছে!");
  };

  const updateSiteInfo = async () => {
    await updateDoc(doc(db, "settings", "siteConfig"), siteSettings);
    alert("সাইট সেটিংস আপডেট হয়েছে!");
  };

  return (
    <div className="p-6 pb-32 bg-darkBg min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-black text-primary uppercase">Mafia Dashboard</h2>
        <button onClick={() => {auth.signOut(); navigate('/');}} className="p-2 bg-red-600 rounded-full"><LogOut size={20}/></button>
      </div>

      <div className="flex gap-4 mb-8 bg-cardBg p-2 rounded-2xl w-fit mx-auto">
        <button onClick={() => setActiveTab('content')} className={`px-6 py-2 rounded-xl flex items-center gap-2 ${activeTab === 'content' ? 'bg-primary text-black' : 'text-gray-500'}`}><List size={18}/> Manage</button>
        <button onClick={() => setActiveTab('settings')} className={`px-6 py-2 rounded-xl flex items-center gap-2 ${activeTab === 'settings' ? 'bg-primary text-black' : 'text-gray-500'}`}><Settings size={18}/> Settings</button>
      </div>

      {activeTab === 'content' ? (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSave} className="bg-cardBg p-6 rounded-3xl border border-borderGray mb-10 grid grid-cols-2 gap-4">
            <h3 className="col-span-2 text-primary font-bold">{editId ? "Edit Content" : "Add Content"}</h3>
            <input type="text" placeholder="Name" className="p-3 bg-darkBg rounded-xl border border-borderGray" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <select className="p-3 bg-darkBg rounded-xl border border-borderGray" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="app">App</option>
              <option value="preset">Preset</option>
              <option value="prompt">Prompt</option>
            </select>
            <input type="text" placeholder="Image URL" className="col-span-2 p-3 bg-darkBg rounded-xl border border-borderGray" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} required />
            <input type="text" placeholder="Download Link" className="col-span-2 p-3 bg-darkBg rounded-xl border border-borderGray" value={form.downloadUrl} onChange={e => setForm({...form, downloadUrl: e.target.value})} required />
            <input type="text" placeholder="Size/Votes" className="p-3 bg-darkBg rounded-xl border border-borderGray" value={form.size} onChange={e => setForm({...form, size: e.target.value})} />
            <button className="col-span-2 bg-primary text-black font-bold p-4 rounded-2xl mt-4">SAVE DATA</button>
          </form>

          <div className="grid gap-3">
            {items.map(item => (
              <div key={item.id} className="bg-cardBg p-4 rounded-2xl flex items-center justify-between border border-borderGray">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} className="w-10 h-10 rounded-xl object-cover" alt=""/>
                  <div><p className="font-bold text-sm">{item.name}</p><p className="text-[10px] text-primary uppercase">{item.type}</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {setEditId(item.id); setForm(item); window.scrollTo(0,0);}} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit3 size={18}/></button>
                  <button onClick={() => deleteDoc(doc(db, "content", item.id))} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-cardBg p-8 rounded-3xl border border-borderGray shadow-2xl">
          <h3 className="text-primary font-bold mb-6">Site Configuration</h3>
          <div className="space-y-4">
            <div><label className="text-xs text-gray-500">Telegram Link</label><input type="text" className="w-full p-3 bg-darkBg rounded-xl mt-1 border border-borderGray" value={siteSettings.telegram} onChange={e => setSiteSettings({...siteSettings, telegram: e.target.value})} /></div>
            <div><label className="text-xs text-gray-500">Developer Name</label><input type="text" className="w-full p-3 bg-darkBg rounded-xl mt-1 border border-borderGray" value={siteSettings.developer} onChange={e => setSiteSettings({...siteSettings, developer: e.target.value})} /></div>
            <div><label className="text-xs text-gray-500">Banner Text</label><input type="text" className="w-full p-3 bg-darkBg rounded-xl mt-1 border border-borderGray" value={siteSettings.bannerText} onChange={e => setSiteSettings({...siteSettings, bannerText: e.target.value})} /></div>
            <div><label className="text-xs text-gray-500">Footer Text</label><textarea className="w-full p-3 bg-darkBg rounded-xl mt-1 border border-borderGray h-24" value={siteSettings.footerText} onChange={e => setSiteSettings({...siteSettings, footerText: e.target.value})} /></div>
            <button onClick={updateSiteInfo} className="w-full bg-primary text-black font-bold p-4 rounded-2xl mt-4">UPDATE ALL SETTINGS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
