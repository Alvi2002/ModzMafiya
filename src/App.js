import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

// স্যাম্পল পেজ (পরের ধাপে আমরা এগুলো ডিজাইন করব)
const Home = () => (
  <div className="p-4 pb-24">
    {/* সার্চবার */}
    <div className="relative mt-4">
      <input 
        type="text" 
        placeholder="Search...." 
        className="w-full bg-cardBg border border-borderGray rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-gray-300"
      />
      <div className="absolute right-4 top-3 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
    </div>
    
    {/* ব্যানার */}
    <div className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl flex items-center justify-between">
       <span className="text-sm font-medium">সবগুলো প্রিমিয়াম Apps একদম ফ্রি! 🚀</span>
    </div>
    
    <p className="mt-10 text-gray-500 text-center text-sm">Content will load here...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<div className="p-10">Apps Page</div>} />
          <Route path="/presets" element={<div className="p-10">Presets Page</div>} />
          <Route path="/prompts" element={<div className="p-10">AI Prompts Page</div>} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
