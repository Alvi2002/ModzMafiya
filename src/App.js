import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import PromptCard from './components/PromptCard';
import AppCard from './components/AppCard';
import Details from './pages/Details'; // নিশ্চিত করুন এই ফাইলটি src/pages/Details.jsx এ আছে
import { Send, Bot } from 'lucide-react';

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
          {/* লিঙ্কে ক্লিক করলে Details পেজে যাবে */}
          <Link to="/details/prompt-1">
            <PromptCard title="Prompt 1" image="https://images.unsplash.com/photo-1675557009875-436f595b1812?q=80&w=1000&auto=format&fit=crop" />
          </Link>
          <Link to="/details/prompt-2">
            <PromptCard title="Prompt 2" image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" />
          </Link>
        </div>
      </div>

      {/* Trending Apps Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-primary rounded-full"></div>
          <h2 className="text-lg font-bold">Trending Apps</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {/* অ্যাপ কার্ডে লিঙ্ক যুক্ত করা হয়েছে */}
          <Link to="/details/capcut-pro">
            <AppCard name="CapCut Pro" rating={5} downloads="13.7K" icon="https://upload.wikimedia.org/wikipedia/commons/0/0e/Capcut-logo.png" />
          </Link>
          <Link to="/details/moviebox-pro">
            <AppCard name="MovieBox Pro" rating={4} downloads="12.0K" icon="https://www.movieboxpro.app/img/logo.png" />
          </Link>
          <Link to="/details/youtube-pro">
            <AppCard name="YouTube Pro" rating={5} downloads="1.1K" icon="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" />
          </Link>
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
          <Route path="/details/:id" element={<Details />} /> {/* এই লাইনটি ডিটেইলস পেজ দেখাবে */}
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
