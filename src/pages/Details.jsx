import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Send, ArrowLeft, Star, Info, Copy, Check, Play } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const isApp = id.includes('pro') || id.includes('mod') || id.includes('capcut');

  return (
    <div className="p-4 pb-28">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-cardBg rounded-full border border-borderGray"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold">{isApp ? "CapCut Pro" : "Details"}</h1>
      </div>

      <div className="mb-4">
        <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-md">MODDED</span>
      </div>

      {/* App Info Card */}
      <div className="bg-cardBg border border-borderGray rounded-3xl p-5 shadow-xl">
        <div className="flex gap-4">
          <img src="https://via.placeholder.com/100" alt="icon" className="w-24 h-24 rounded-3xl shadow-lg" />
          <div className="flex flex-col justify-center gap-1 text-xs w-full">
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Developer</span>
              <span className="text-primary font-medium">Premium Mafia</span>
            </div>
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Updated</span>
              <span className="text-white">2026-05-11</span>
            </div>
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Version</span>
              <span className="text-white">16.0.0</span>
            </div>
            <div className="flex justify-between border-b border-borderGray/50 pb-1">
              <span className="text-gray-500">Size</span>
              <span className="text-white">272.1MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Downloads</span>
              <span className="text-white">13.7K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Play Section (শুধুমাত্র অ্যাপের জন্য) */}
      {isApp && (
        <div className="mt-6 bg-[#161b29] border border-borderGray p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white p-1 rounded-lg"><Play size={24} className="text-black fill-black" /></div>
             <div>
               <p className="text-[10px] text-gray-400">Get it on</p>
               <p className="text-sm font-bold">Google Play</p>
             </div>
          </div>
          <button className="text-primary text-sm font-bold">VIEW</button>
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-8 flex flex-col gap-3">
        <button className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
          <Download size={20} /> DOWNLOAD (272.1MB)
        </button>
        <button className="w-full bg-[#24A1DE] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Send size={20} /> JOIN TELEGRAM
        </button>
      </div>

      {/* Rating Section */}
      <div className="mt-8 bg-cardBg border border-borderGray rounded-3xl p-6 text-center">
        <h2 className="text-4xl font-black mb-1">5.5</h2>
        <div className="flex justify-center gap-1 mb-2">
           {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FFD700" stroke="#FFD700" />)}
        </div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Votes: 22.4K</p>
      </div>
    </div>
  );
};

export default Details;
