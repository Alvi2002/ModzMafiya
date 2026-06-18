import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Download, Send, ArrowLeft, Star, Play, Copy, Check, Info } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // গেট কন্টেন্ট
    getDoc(doc(db, "content", id)).then(s => s.exists() && setItem(s.data()));
    // গেট সেটিংস (ডেভেলপার নামের জন্য)
    onSnapshot(doc(db, "settings", "siteConfig"), d => d.exists() && setSettings(d.data()));
  }, [id]);

  if (!item) return <div className="p-20 text-center font-bold text-primary animate-pulse uppercase tracking-widest">Loading Mafia Mods...</div>;

  const isApp = item.type === 'app';
  const isPrompt = item.type === 'prompt';

  return (
    <div className="p-4 pb-32 animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-cardBg rounded-full border border-borderGray active:scale-90 transition-transform"><ArrowLeft size={22} /></button>
        <h1 className="text-xl font-bold truncate tracking-tight">{item.name}</h1>
      </div>

      <div className="mb-4">
        <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg uppercase shadow-lg ${isApp ? 'bg-primary/20 text-primary' : isPrompt ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
          {isApp ? 'MODDED' : isPrompt ? 'AI PROMPT 📄' : 'PRESET 🌐'}
        </span>
      </div>

      {/* Stats Card */}
      <div className="bg-cardBg border border-borderGray rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
        <div className={isApp ? "flex gap-6" : "flex flex-col gap-6"}>
          <img src={item.imageUrl} className={isApp ? "w-24 h-24 rounded-3xl object-cover shadow-2xl ring-4 ring-darkBg" : "w-full h-56 object-cover rounded-[24px] shadow-2xl"} alt="" />
          
          <div className="flex flex-col gap-2 text-[11px] w-full justify-center font-semibold">
             <div className="flex justify-between border-b border-borderGray/40 pb-2"><span className="text-gray-500 uppercase">Developer</span><span className="text-primary">{item.developer || settings.developer}</span></div>
             <div className="flex justify-between border-b border-borderGray/40 pb-2"><span className="text-gray-500 uppercase">Updated</span><span className="text-white">{item.updated}</span></div>
             <div className="flex justify-between border-b border-borderGray/40 pb-2"><span className="text-gray-500 uppercase">Version</span><span className="text-white">{item.version}</span></div>
             <div className="flex justify-between border-b border-borderGray/40 pb-2"><span className="text-gray-500 uppercase">Size</span><span className="text-white">{item.size}</span></div>
             <div className="flex justify-between"><span className="text-gray-500 uppercase">Downloads</span><span className="text-white">6.2K+</span></div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {item.description && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3 text-primary"><Info size={18} /><h2 className="font-bold text-white uppercase text-sm tracking-widest">Description</h2></div>
          <div className="bg-cardBg border border-borderGray p-5 rounded-[24px] text-xs text-gray-400 leading-relaxed italic">{item.description}</div>
        </div>
      )}

      {isApp && item.googlePlay && (
        <div className="mt-8 bg-[#161b29] border border-borderGray p-5 rounded-[24px] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4"><div className="bg-white p-2 rounded-xl"><Play size={24} className="text-black fill-black" /></div><p className="font-black text-sm uppercase">Google Play</p></div>
          <a href={item.googlePlay} target="_blank" rel="noreferrer" className="text-primary font-black bg-primary/10 px-6 py-2 rounded-xl text-xs uppercase tracking-tighter hover:bg-primary hover:text-black transition-all">VIEW</a>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4">
        {isPrompt ? (
          <button onClick={() => {navigator.clipboard.writeText(item.downloadUrl); setCopied(true); setTimeout(() => setCopied(false), 2000);}} className="w-full bg-white text-black font-black py-5 rounded-[24px] flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all text-sm uppercase">
            {copied ? <Check size={22} className="text-green-600" /> : <Copy size={22} />} {copied ? "COPIED TO CLIPBOARD" : "COPY PROMPT HERE"}
          </button>
        ) : (
          <a href={item.downloadUrl} target="_blank" rel="noreferrer" className="w-full bg-red-500 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-2 text-center shadow-2xl shadow-red-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest">
            <Download size={22} /> DOWNLOAD ({item.size})
          </a>
        )}
        <a href={settings.telegram} target="_blank" rel="noreferrer" className="w-full bg-[#24A1DE] text-white font-bold py-5 rounded-[24px] flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all text-sm uppercase tracking-widest">
          <Send size={22} /> JOIN OUR TELEGRAM
        </a>
      </div>

      {/* Ratings Section */}
      <div className="mt-10 bg-cardBg border border-borderGray rounded-[32px] p-8 text-center shadow-2xl">
        <h2 className="text-5xl font-black mb-2 text-white">{item.rating || '5.5'}</h2>
        <div className="flex justify-center gap-1.5 mb-3">
           {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#FFD700" stroke="#FFD700" className="drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />)}
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Total Votes: {item.votes || '22.4K'}</p>
      </div>
    </div>
  );
};

export default Details;
