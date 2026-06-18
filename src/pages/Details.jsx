import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Download, Send, ArrowLeft, Star, Play, Copy, Check } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "content", id));
      if (docSnap.exists()) setItem(docSnap.data());
    };
    fetchData();
  }, [id]);

  if (!item) return <div className="p-10 text-center text-primary font-bold">Loading...</div>;

  return (
    <div className="p-4 pb-28">
      <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-cardBg rounded-full border border-borderGray"><ArrowLeft size={20}/></button>
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      
      <div className="bg-cardBg border border-borderGray rounded-3xl p-5">
        <div className={item.type === 'app' ? "flex gap-4" : "flex flex-col gap-4"}>
          <img src={item.imageUrl} className={item.type === 'app' ? "w-24 h-24 rounded-3xl object-cover shadow-lg" : "w-full h-48 object-cover rounded-2xl"} alt="icon" />
          <div className="flex flex-col gap-1 text-xs w-full justify-center">
            {item.type === 'app' && <div className="flex justify-between border-b border-borderGray/50 pb-1 text-primary font-bold"><span>Developer</span><span>{item.developer || 'Mafia Modz'}</span></div>}
            <div className="flex justify-between border-b border-borderGray/50 pb-1"><span>Version</span><span className="text-white font-medium">{item.version || 'v1.0'}</span></div>
            <div className="flex justify-between"><span>Size</span><span className="text-white font-medium">{item.size || '20 KB'}</span></div>
          </div>
        </div>
      </div>

      {item.type === 'app' && item.googlePlay && (
        <div className="mt-6 bg-[#161b29] border border-borderGray p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3"><Play className="text-white fill-white" /><p className="font-bold">Google Play</p></div>
          <a href={item.googlePlay} target="_blank" rel="noreferrer" className="text-primary font-bold">VIEW</a>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {item.type === 'prompt' ? (
          <button onClick={() => {navigator.clipboard.writeText(item.downloadUrl); setCopied(true); setTimeout(() => setCopied(false), 2000);}} className="w-full bg-cardBg border border-borderGray text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />} {copied ? "COPIED" : "COPY PROMPT"}
          </button>
        ) : (
          <a href={item.downloadUrl} target="_blank" rel="noreferrer" className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 text-center shadow-lg"><Download size={20} /> DOWNLOAD ({item.size})</a>
        )}
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"><Send size={20} /> JOIN TELEGRAM</button>
      </div>

      <div className="mt-8 bg-cardBg border border-borderGray rounded-3xl p-6 text-center">
        <h2 className="text-4xl font-black mb-1">5.5</h2>
        <div className="flex justify-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FFD700" stroke="#FFD700" />)}</div>
        <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase">Verified Content</p>
      </div>
    </div>
  );
};

export default Details;
