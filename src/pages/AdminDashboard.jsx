import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit3, Plus, Settings, List, LogOut, Save, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [siteSettings, setSiteSettings] = useState({});
  const [form, setForm] = useState({ 
    name: '', type: 'app', imageUrl: '', downloadUrl: '', version: '', 
    size: '', updated: '', developer: 'Premium Mafia', rating: '5.5', 
    votes: '22.4K', googlePlay: '', description: '' 
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // কন্টেন্ট লোড
    const unsubContent = onSnapshot(collection(db, "content"), (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    // সেটিংস লোড
    const unsubSettings = onSnapshot(doc(db, "settings", "siteConfig"), (doc) => {
      if (doc.exists()) setSiteSettings(doc.data());
    });
    return () => { unsubContent(); unsubSettings(); };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, "content", editId), form);
      setEditId(null);
    } else {
      await addDoc(collection(db, "content"), { ...form, createdAt: serverTimestamp() });
    }
    setForm({ name: '', type: 'app', imageUrl: '', downloadUrl: '', version: '', size: '', updated: '', developer: 'Premium Mafia', rating: '5.5', votes: '22.4K', googlePlay: '', description: '' });
    alert("Data Synced Successfully!");
  };

  return (
    <div className="p-4 pb-32 bg-[#0b0f1a] min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-8 bg-cardBg p-4 rounded-3xl border border-borderGray">
        <h2 className="text-xl font-black text-primary italic">MAFIA ADMIN</h2>
        <button onClick={() => {auth.signOut(); navigate('/admin-login');}} className="p-2 bg-red-500/20 text-red-500 rounded-full"><LogOut size={20}/></button>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('content')} className={`px-5 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap ${activeTab === 'content' ? 'bg-primary text-black' : 'bg-cardBg text-gray-500'}`}><List size={18}/> Manage Content</button>
        <button onClick={() => setActiveTab('settings')} className={`px-5 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'bg-primary text-black' : 'bg-cardBg text-gray-500'}`}><Settings size={18}/> Site Settings</button>
      </div>

      {activeTab === 'content' ? (
        <div className="animate-in slide-in-from-bottom duration-500">
          <form onSubmit={handleSave} className="bg-cardBg p-6 rounded-3xl border border-borderGray mb-8 flex flex-col gap-4 shadow-2xl">
            <h3 className="text-primary font-bold text-lg border-b border-borderGray pb-2">{editId ? "Edit Item" : "Add New Item"}</h3>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Name" className="p-4 bg-darkBg rounded-2xl border border-borderGray" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <select className="p-4 bg-darkBg rounded-2xl border border-borderGray" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="app">App</option>
                <option value="preset">Preset</option>
                <option value="prompt">Prompt</option>
              </select>
            </div>
            <input type="text" placeholder="Image Direct URL" className="p-4 bg-darkBg rounded-2xl border border-borderGray" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} required />
            <input type="text" placeholder="Download Link / Prompt Text" className="p-4 bg-darkBg rounded-2xl border border-borderGray" value={form.downloadUrl} onChange={e => setForm({...form, downloadUrl: e.target.value})} required />
            
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder="Version" className="p-3 bg-darkBg rounded-xl text-xs" value={form.version} onChange={e => setForm({...form, version: e.target.value})} />
              <input type="text" placeholder="Size" className="p-3 bg-darkBg rounded-xl text-xs" value={form.size} onChange={e => setForm({...form, size: e.target.value})} />
              <input type="text" placeholder="Date (2026-06-18)" className="p-3 bg-darkBg rounded-xl text-xs" value={form.updated} onChange={e => setForm({...form, updated: e.target.value})} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder="Rating (5.5)" className="p-3 bg-darkBg rounded-xl text-xs" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
              <input type="text" placeholder="Votes (22.4K)" className="p-3 bg-darkBg rounded-xl text-xs" value={form.votes} onChange={e => setForm({...form, votes: e.target.value})} />
              <input type="text" placeholder="Developer" className="p-3 bg-darkBg rounded-xl text-xs" value={form.developer} onChange={e => setForm({...form, developer: e.target.value})} />
            </div>

            <input type="text" placeholder="Google Play URL (Optional)" className="p-4 bg-darkBg rounded-2xl border border-borderGray" value={form.googlePlay} onChange={e => setForm({...form, googlePlay: e.target.value})} />
            <textarea placeholder="Description Text" className="p-4 bg-darkBg rounded-2xl h-24 border border-borderGray" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
            
            <button className="bg-primary text-black font-black p-5 rounded-3xl mt-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">SAVE TO CLOUD</button>
          </form>

          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-cardBg p-4 rounded-3xl flex items-center justify-between border border-borderGray group">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-borderGray" alt=""/>
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold uppercase">{item.type}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {setEditId(item.id); setForm(item); window.scrollTo(0,0);}} className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl"><Edit3 size={18}/></button>
                  <button onClick={() => deleteDoc(doc(db, "content", item.id))} className="p-3 bg-red-500/10 text-red-500 rounded-2xl"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-cardBg p-6 rounded-3xl border border-borderGray animate-in fade-in duration-500">
           <h3 className="text-primary font-bold mb-6 flex items-center gap-2"><Globe size={20}/> Site Master Settings</h3>
           <div className="space-y-4">
              <div><label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Telegram URL</label><input type="text" className="w-full p-4 bg-darkBg rounded-2xl mt-1 border border-borderGray" value={siteSettings.telegram || ''} onChange={e => setSiteSettings({...siteSettings, telegram: e.target.value})} /></div>
              <div><label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Developer Name</label><input type="text" className="w-full p-4 bg-darkBg rounded-2xl mt-1 border border-borderGray" value={siteSettings.developer || ''} onChange={e => setSiteSettings({...siteSettings, developer: e.target.value})} /></div>
              <div><label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Banner Notice</label><input type="text" className="w-full p-4 bg-darkBg rounded-2xl mt-1 border border-borderGray" value={siteSettings.bannerText || ''} onChange={e => setSiteSettings({...siteSettings, bannerText: e.target.value})} /></div>
              <div><label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Footer Copyright</label><textarea className="w-full p-4 bg-darkBg rounded-2xl mt-1 border border-borderGray h-24" value={siteSettings.footerText || ''} onChange={e => setSiteSettings({...siteSettings, footerText: e.target.value})} /></div>
              <button onClick={async () => {await updateDoc(doc(db, "settings", "siteConfig"), siteSettings); alert("Settings Updated!");}} className="w-full bg-primary text-black font-black p-5 rounded-3xl mt-4 flex items-center justify-center gap-2 shadow-xl"><Save size={20}/> SYNC ALL SETTINGS</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
