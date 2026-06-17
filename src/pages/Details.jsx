import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Send, ArrowLeft, Star, Info, Copy, Check } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // আপাতত ডামি লজিক: আইডি দেখে টাইপ নির্ধারণ (পরে ফায়ারবেস থেকে আসবে)
  const isApp = id.includes('pro') || id.includes('mod');
  const isPrompt = id.includes('prompt');
  const isPreset = id.includes('preset');

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("Your AI Prompt Text Here...");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 pb-28 animate-in slide-in-from-right duration-300">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-cardBg rounded-full border border-borderGray">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold truncate">
          {isApp ? "CapCut Pro" : isPrompt ? "AI Prompt Details" : "DSLR Cinematic Preset"}
        </h1>
      </div>

      {/* --- ক্যাটাগরি অনুযায়ী ট্যাগ --- */}
      <div className="mb-4">
        {isApp && <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-md">MODDED</span>}
        {isPrompt && <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase">AI PROMPT 📄</span>}
        {isPreset && <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase">PRESET 🌐</span>}
      </div>

      {/* --- মেইন কন্টেন্ট কার্ড (Apps এর জন্য আইকন, বাকিদের জন্য ইমেজ) --- */}
      <div className="bg-cardBg border border-borderGray rounded-3xl p-5 shadow-xl">
        <div className={isApp ? "flex gap-4" : "flex flex-col gap-4"}>
          
          {/* Apps এর জন্য ছোট আইকন, অন্যগুলোর জন্য বড় ব্যানার */}
          <img 
            src="https://via.placeholder.com/300" 
            alt="thumb" 
            className={isApp ? "w-24 h-24 rounded-2xl" : "w-full h-48 object-cover rounded-2xl"} 
          />

          {/* Stats List */}
          <div className="flex flex-col justify-center gap-1.5 text-sm">
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Updated</span>
              <span className="text-white font-medium">2026-06-15</span>
            </div>
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Size</span>
              <span className="text-white font-medium">272.1 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Downloads</span>
              <span className="text-white font-medium">13.7K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- বাটন সেকশন (Apps/Preset এর জন্য Download, Prompt এর জন্য Copy) --- */}
      <div className="mt-8 flex flex-col gap-3">
        {isPrompt ? (
          <button 
            onClick={handleCopy}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
            {copied ? "COPIED!" : "COPY HERE"}
          </button>
        ) : (
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <Download size={20} /> DOWNLOAD (272.1MB)
          </button>
        )}

        <button className="w-full bg-[#24A1DE] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
          <Send size={20} /> JOIN TELEGRAM
        </button>
      </div>

      {/* --- রেটিং সেকশন (সবগুলোর জন্য একই) --- */}
      <div className="mt-8 bg-cardBg border border-borderGray rounded-3xl p-6 text-center">
        <h2 className="text-4xl font-black mb-1">5.5</h2>
        <div className="flex justify-center gap-1 mb-2">
           {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FFD700" stroke="#FFD700" />)}
        </div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Votes: 30.0K</p>
      </div>
    </div>
  );
};

export default Details;
