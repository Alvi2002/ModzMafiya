import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Send, ArrowLeft, Star, Info } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // আপাতত ডামি ডেটা (পরে আমরা এটি ফায়ারবেস থেকে আনব)
  const appData = {
    name: "CapCut Pro",
    version: "16.0.0",
    size: "272.1MB",
    developer: "Premium Mafia",
    updated: "2026-05-11",
    downloads: "13.7K+",
    description: "যেকোনো প্রয়োজনে Join Telegram এ ক্লিক করে আমাদের চ্যানেলে যুক্ত হতে পারেন...!",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Capcut-logo.png",
    rating: 5
  };

  return (
    <div className="p-4 pb-28 animate-in fade-in duration-500">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-cardBg rounded-full border border-borderGray">
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-2xl font-bold mb-4">{appData.name}</h1>
      <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-md">MODDED</span>

      {/* App Info Card */}
      <div className="mt-6 bg-cardBg border border-borderGray rounded-3xl p-5 shadow-xl">
        <div className="flex gap-4">
          <img src={appData.icon} alt="icon" className="w-24 h-24 rounded-2xl shadow-lg" />
          <div className="flex flex-col justify-center gap-1 text-sm text-gray-400">
            <p>Developer: <span className="text-primary font-medium">{appData.developer}</span></p>
            <p>Updated: <span className="text-white">{appData.updated}</span></p>
            <p>Version: <span className="text-white">{appData.version}</span></p>
            <p>Size: <span className="text-white">{appData.size}</span></p>
            <p>Downloads: <span className="text-white">{appData.downloads}</span></p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Info size={20} />
          <h2 className="text-lg font-bold text-white">Description & Information</h2>
        </div>
        <div className="bg-cardBg border border-borderGray rounded-2xl p-4 text-gray-400 text-sm leading-relaxed">
          {appData.description}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <button className="w-full bg-primary hover:bg-green-500 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
          <Download size={20} /> DOWNLOAD ({appData.size})
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
          <Send size={20} /> JOIN TELEGRAM
        </button>
      </div>

      {/* Rating Section */}
      <div className="mt-8 bg-cardBg border border-borderGray rounded-3xl p-6 text-center">
        <h2 className="text-4xl font-black mb-2">5.5</h2>
        <div className="flex justify-center gap-1 mb-2">
           {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#FFD700" stroke="#FFD700" />)}
        </div>
        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Total Votes: 22.4K</p>
      </div>
    </div>
  );
};

export default Details;
