import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Send, ArrowLeft, Star, Play, Copy, Check } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // আইডি চেক করে ক্যাটাগরি নির্ধারণ
  const isApp = id.includes('pro') || id.includes('capcut') || id.includes('movie');
  const isPrompt = id.includes('prompt');
  const isPreset = id.includes('preset');

  return (
    <div className="p-4 pb-28">
      <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-cardBg rounded-full border border-borderGray"><ArrowLeft size={20} /></button>

      <h1 className="text-2xl font-bold mb-2">{id.replace('-', ' ').toUpperCase()}</h1>
      <div className="mb-4">
        {isApp && <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-md">MODDED</span>}
        {isPrompt && <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-md">AI PROMPT</span>}
        {isPreset && <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-md">PRESET</span>}
      </div>

      <div className="bg-cardBg border border-borderGray rounded-3xl p-5 shadow-xl">
        <div className={isApp ? "flex gap-4" : "flex flex-col gap-4"}>
          <img src="https://via.placeholder.com/300" className={isApp ? "w-24 h-24 rounded-3xl" : "w-full h-48 object-cover rounded-2xl"} alt="thumb" />
          
          <div className="flex flex-col gap-1.5 text-xs w-full">
            {isApp && (
              <div className="flex justify-between border-b border-borderGray/50 pb-1">
                <span className="text-gray-500">Developer</span>
                <span className="text-primary font-bold">Modz Mafia</span>
              </div>
            )}
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Updated</span>
              <span className="text-white">2026-06-18</span>
            </div>
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Size</span>
              <span className="text-white">20 KB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Downloads</span>
              <span className="text-white">6.2K+</span>
            </div>
          </div>
        </div>
      </div>

      {isApp && (
        <div className="mt-6 bg-[#161b29] border border-borderGray p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white p-1 rounded-lg"><Play size={24} className="text-black fill-black" /></div>
             <p className="font-bold">Google Play</p>
          </div>
          <button className="text-primary font-bold">VIEW</button>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {isPrompt ? (
          <button 
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="w-full bg-cardBg border border-borderGray text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            {copied ? "COPIED" : "COPY HERE"}
          </button>
        ) : (
          <button className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95">
            <Download size={20} /> DOWNLOAD (20 KB)
          </button>
        )}
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"><Send size={20} /> JOIN TELEGRAM</button>
      </div>

      <div className="mt-8 bg-cardBg border border-borderGray rounded-3xl p-6 text-center">
        <h2 className="text-4xl font-black mb-1">5.5</h2>
        <div className="flex justify-center gap-1">
           {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FFD700" stroke="#FFD700" />)}
        </div>
        <p className="text-gray-400 text-[10px] uppercase font-bold mt-2">Total Votes: 39.8K</p>
      </div>
    </div>
  );
};

export default Details;
