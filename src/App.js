import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import PromptCard from './components/PromptCard';
import AppCard from './components/AppCard';
import { Send, Bot } from 'lucide-react'; // এই লাইনটি জরুরি

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
      </div>

      {/* Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-700 to-primary p-4 rounded-3xl flex items-center gap-3 shadow-lg">
        <div className="bg-white/20 p-2 rounded-xl">
          <Send size={24} className="text-white" />
        </div>
        <span className="text-sm font-bold text-white">Modz Mafia - সব প্রিমিয়াম Apps ফ্রি! 🚀</span>
      </div>

      {/* AI Prompt Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Bot size={24} />
          <h2 className="text-lg font-bold text-white">AI Prompt (35)</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <PromptCard title="Prompt 1" image="https://images.unsplash.com/photo-1675557009875-436f595b1812?q=80&w=1000&auto=format&fit=crop" />
          <PromptCard title="Prompt 2" image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" />
        </div>
      </div>

      {/* Trending Apps Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-primary rounded-full"></div>
          <h2 className="text-lg font-bold">Trending Apps</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <AppCard name="CapCut Pro" rating={5} downloads="13.7K" icon="https://upload.wikimedia.org/wikipedia/commons/0/0e/Capcut-logo.png" />
          <AppCard name="MovieBox Pro" rating={4} downloads="12.0K" icon="https://www.movieboxpro.app/img/logo.png" />
          <AppCard name="YouTube Pro" rating={5} downloads="1.1K" icon="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" />
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
          <Route path="/apps" element={<div className="p-10">Apps Coming Soon</div>} />
          <Route path="/presets" element={<div className="p-10">Presets Coming Soon</div>} />
          <Route path="/prompts" element={<div className="p-10">Prompts Coming Soon</div>} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
