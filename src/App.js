import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AppCard from './components/AppCard';
import PromptCard from './components/PromptCard';
import Details from './pages/Details';

// Icons Import
import { Send, Bot, X, Home as HomeIcon, Gamepad2, Flame, Search } from 'lucide-react';

// --- Home Component (হোম পেজের ডিজাইন) ---
const Home = () => {
  return (
    <div className="p-4 pb-28 animate-in fade-in duration-500">
      {/* Search Bar Section */}
      <div className="relative mt-2">
        <input 
          type="text" 
          placeholder="Search...." 
          className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:outline-none focus:border-primary text-gray-300 shadow-xl transition-all"
        />
        <div className="absolute right-5 top-4 text-primary">
          <Search size={22} strokeWidth={2.5} />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mt-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-primary p-4 rounded-3xl flex items-center gap-3 shadow-lg relative overflow-hidden">
        <div className="bg-white/20 p-2 rounded-xl z-10">
          <Send size={24} className="text-white" />
        </div>
        <span className="text-sm font-bold text-white z-10">সবগুলো প্রিমিয়াম Apps একদম ফ্রি! 🚀</span>
        {/* Banner Decorative Circle */}
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>

      {/* AI Prompt Section (Horizontal Scroll) */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Bot size={24} />
          <h2 className="text-lg font-bold text-white tracking-tight">AI Prompt (35)</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <Link to="/details/prompt-1">
            <PromptCard title="Prompt 👆" image="https://img.freepik.com/free-photo/portrait-fashionable-man_23-2148860955.jpg" />
          </Link>
          <Link to="/details/prompt-2">
            <PromptCard title="Prompt 👆" image="https://img.freepik.com/free-photo/fashion-man-portrait_23-2148860882.jpg" />
          </Link>
          <Link to="/details/prompt-3">
            <PromptCard title="Prompt 👆" image="https://img.freepik.com/free-photo/cool-man-posing-outdoors_23-2148850982.jpg" />
          </Link>
        </div>
      </div>

      {/* Trending Apps Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-primary rounded-full"></div>
          <h2 className="text-lg font-bold">Trending Apps (3)</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
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

      {/* Latest Updates Section (Grid Layout) */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-lg font-bold">Latest Updates (101)</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Link to="/details/sportzfy"><AppCard name="Sportzfy" rating={5} downloads="v6" icon="https://via.placeholder.com/100" /></Link>
          <Link to="/details/picsart"><AppCard name="PicsArt Pro" rating={5} downloads="v16.0" icon="https://via.placeholder.com/100" /></Link>
          <Link to="/details/tiktok"><AppCard name="TikTok Pro" rating={4} downloads="v10.0" icon="https://via.placeholder.com/100" /></Link>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={isDark ? "dark" : ""}>
        <div className="min-h-screen bg-darkBg text-white relative overflow-x-hidden selection:bg-primary selection:text-black">
          
          {/* Navbar */}
          <Navbar toggleMenu={toggleMenu} isDark={isDark} toggleTheme={toggleTheme} />

          {/* --- Sidebar Menu Drawer (স্ক্রিনশটের মতো মেনু) --- */}
          <div 
            className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={toggleMenu}
          ></div>
          
          <div className={`fixed inset-y-0 right-0 w-72 bg-[#161b29] z-[70] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out border-l border-borderGray shadow-2xl p-6`}>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-full p-1 w-6 h-6 flex items-center justify-center font-bold text-black text-xs">M</div>
                <span className="font-bold text-gray-400">ModzMafia.top</span>
              </div>
              <button onClick={toggleMenu} className="p-2 bg-darkBg rounded-full text-gray-400 border border-borderGray">
                <X size={20}/>
              </button>
            </div>

            <div className="flex flex-col gap-5 font-bold text-lg">
              <Link to="/" onClick={toggleMenu} className="flex items-center gap-4 text-primary bg-primary/10 p-3 rounded-2xl">
                <HomeIcon size={22}/> Home
              </Link>
              <Link to="/apps" onClick={toggleMenu} className="flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all">
                <Gamepad2 size={22} className="text-green-500"/> Apps
              </Link>
              <Link to="/presets" onClick={toggleMenu} className="flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all">
                <Flame size={22} className="text-red-500"/> Preset
              </Link>
              <Link to="/prompts" onClick={toggleMenu} className="flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all">
                <Bot size={22} className="text-blue-500"/> AI Prompt
              </Link>
              <hr className="border-borderGray my-2" />
              <Link to="#" className="flex items-center gap-4 p-3 text-blue-400">
                <Send size={22}/> Join Telegram
              </Link>
            </div>
            
            <div className="absolute bottom-10 left-0 right-0 text-center text-gray-600 text-[10px] font-bold tracking-widest uppercase">
              © Modz Mafia 2026
            </div>
          </div>

          {/* Main Routing Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/apps" element={<div className="p-10 text-center">Apps Collection coming soon...</div>} />
            <Route path="/presets" element={<div className="p-10 text-center">Presets coming soon...</div>} />
            <Route path="/prompts" element={<div className="p-10 text-center">AI Prompts coming soon...</div>} />
          </Routes>

          {/* Footer & Bottom Navigation */}
          <Footer />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
