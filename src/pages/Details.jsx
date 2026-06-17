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
      const docRef = doc(db, "content", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setItem(docSnap.data());
    };
    fetchData();
  }, [id]);

  if (!item) return <div className="p-10 text-center">Loading...</div>;

  const isApp = item.type === 'app';
  const isPrompt = item.type === 'prompt';

  return (
    <div className="p-4 pb-28">
      <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-cardBg rounded-full border border-borderGray"><ArrowLeft size={20}/></button>
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      
      <div className="bg-cardBg border border-borderGray rounded-3xl p-5 shadow-xl">
        <div className={isApp ? "flex gap-4" : "flex flex-col gap-4"}>
          <img src={item.imageUrl} className={isApp ? "w-24 h-24 rounded-3xl object-cover" : "w-full h-48 object-cover rounded-2xl"} alt="icon" />
          <div className="flex flex-col gap-1 text-xs w-full justify-center">
            {isApp && <div className="flex justify-between border-b border-borderGray/50 pb-1 text-primary font-bold"><span>Developer</span><span>{item.developer}</span></div>}
            <div className="flex justify-between border-b border-borderGray/50 pb-1"><span>Version</span><span className="text-white">{item.version}</span></div>
            <div className="flex justify-between"><span>Size</span><span className="text-white">{item.size}</span></div>
          </div>
        </div>
      </div>

      {isApp && item.googlePlay && (
        <div className="mt-6 bg-[#161b29] border border-borderGray p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3"><Play className="text-white fill-white" /><p className="font-bold">Google Play</p></div>
          <a href={item.googlePlay} target="_blank" className="text-primary font-bold">VIEW</a>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {isPrompt ? (
          <button onClick={() => {navigator.clipboard.writeText(item.downloadUrl); setCopied(true); setTimeout(() => setCopied(false), 2000);}} className="w-full bg-cardBg border border-borderGray text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            {copied ? <Check className="text-green-500" /> : <Copy />} {copied ? "COPIED" : "COPY PROMPT"}
          </button>
        ) : (
          <a href={item.downloadUrl} target="_blank" className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 text-center"><Download size={20} /> DOWNLOAD ({item.size})</a>
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
