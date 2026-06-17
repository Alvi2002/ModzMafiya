import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import PromptCard from './components/PromptCard';
import AppCard from './components/AppCard';

const Home = () => {
  return (
    <div className="p-4 pb-28">
      {/* Search Bar */}
      <div className="relative mt-2">
        <input 
          type="text" 
          placeholder="Search...." 
          className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:outline-none focus:border-primary text-gray-300 shadow-xl"
        />
        <div className="absolute right-5 top-4 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-700 via-purple-600 to-primary p-4 rounded-3xl flex items-center gap-3 shadow-lg">
        <div className="bg-white/20 p-2 rounded-xl">
          <Send size={24} className="text-white" />
        </div>
        <span className="text-sm font-bold text-white">সবগুলো প্রিমিয়াম Apps একদম ফ্রি! 🚀</span>
      </div>

      {/* AI Prompt Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="text-primary" />
          <h2 className="text-lg font-bold">AI Prompt (35)</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <PromptCard title="Prompt" image="https://img.freepik.com/free-photo/portrait-fashionable-man_23-2148860955.jpg" />
          <PromptCard title="Prompt" image="https://img.freepik.com/free-photo/fashion-man-portrait_23-2148860882.jpg" />
        </div>
      </div>

      {/* Trending Apps Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"></path><path d="M17 6h6v6"></path></svg>
          <h2 className="text-lg font-bold">Trending Apps (3)</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <AppCard name="CapCut Pro" rating={5} downloads="13.7K" icon="https://i.ibb.co/3W6T2f6/capcut.png" />
          <AppCard name="MovieBox Pro" rating={4} downloads="12.0K" icon="https://i.ibb.co/G3XJm3f/moviebox.png" />
          <AppCard name="YouTube Pro" rating={5} downloads="1.1K" icon="https://i.ibb.co/Srkp2N4/youtube.png" />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
