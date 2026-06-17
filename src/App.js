import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './index.css';

// Components & Pages
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AppCard from './components/AppCard';
import PromptCard from './components/PromptCard';
import Details from './pages/Details';
import { Send, Bot, X, Home as HomeIcon, Gamepad2, Flame, Search, Star } from 'lucide-react';

// --- মক ডেটা (সার্চিং এর জন্য) ---
const allContent = [
  { id: 'capcut-pro', name: 'CapCut Pro', type: 'app', rating: 5, downloads: '13.7K', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Capcut-logo.png' },
  { id: 'moviebox-pro', name: 'MovieBox Pro', type: 'app', rating: 4, downloads: '12K', icon: 'https://www.movieboxpro.app/img/logo.png' },
  { id: 'dslr-preset', name: 'DSLR Cinematic', type: 'preset', rating: 5, downloads: '113+', icon: 'https://via.placeholder.com/300' },
  { id: 'ai-prompt-1', name: 'AI Prompt 1', type: 'prompt', rating: 5, downloads: '7+', icon: 'https://via.placeholder.com/150' },
];

const Home = ({ searchQuery, setSearchQuery }) => {
  const filteredData = allContent.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 pb-28 min-h-screen">
      {/* Search Bar */}
      <div className="relative mt-2">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Apps, Presets, Prompts..." 
          className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:border-primary text-gray-300 outline-none" 
        />
        <div className="absolute right-5 top-4 text-primary">
          <Search size={22} />
        </div>
      </div>

      {searchQuery ? (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Search Results ({filteredData.length})</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredData.map(item => (
              <Link key={item.id} to={`/details/${item.id}`}>
                <AppCard name={item.name} rating={item.rating} downloads={item.downloads} icon={item.icon} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Default Home Sections (আগের মতই) */}
          <div className="mt-6 bg-gradient-to-r from-blue-700 to-primary p-4 rounded-3xl flex items-center gap-3">
            <Send size={24} className="text-white" />
            <span className="text-sm font-bold">Modz Mafia - সব প্রিমিয়াম Apps ফ্রি! 🚀</span>
          </div>

          <div className="mt-8">
             <div className="flex items-center gap-2 mb-4 text-primary"><Bot size={24}/><h2 className="text-lg font-bold text-white">AI Prompt</h2></div>
             <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {allContent.filter(i => i.type === 'prompt').map(item => (
                  <Link key={item.id} to={`/details/${item.id}`}><PromptCard title={item.name} image={item.icon} /></Link>
                ))}
             </div>
          </div>
          
          <div className="mt-8">
             <div className="flex items-center gap-2 mb-4"><div className="w-2 h-6 bg-primary rounded-full"></div><h2 className="text-lg font-bold">Trending Apps</h2></div>
             <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {allContent.filter(i => i.type === 'app').map(item => (
                  <Link key={item.id} to={`/details/${item.id}`}><AppCard name={item.name} rating={item.rating} downloads={item.downloads} icon={item.icon} /></Link>
                ))}
             </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // মেনু আইটেম হাইলাইট করার জন্য স্টাইল
  const activeLink = "flex items-center gap-4 text-primary bg-primary/10 p-3 rounded-2xl";
  const normalLink = "flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all text-gray-400";

  return (
    <Router>
      <div className={isDark ? "dark" : "light"}>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-darkBg text-white" : "bg-gray-100 text-black"} relative overflow-x-hidden`}>
          
          <Navbar toggleMenu={() => setIsMenuOpen(true)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

          {/* সাইড মেনু ড্রয়ার (ভিডিওর মতো হুবহু ডিজাইন) */}
          <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}></div>
          
          <div className={`fixed inset-y-0 right-0 w-64 ${isDark ? "bg-[#161b29]" : "bg-white"} z-[70] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 border-l border-borderGray p-6 shadow-2xl`}>
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 bg-darkBg rounded-full text-white"><X size={20}/></button>
             
             <div className="mt-12 flex flex-col gap-4 font-bold">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><HomeIcon size={20}/> Home</NavLink>
                <NavLink to="/apps" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Gamepad2 size={20}/> Apps</NavLink>
                <NavLink to="/presets" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Flame size={20}/> Preset</NavLink>
                <NavLink to="/prompts" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Bot size={20}/> AI Prompt</NavLink>
                <hr className="border-borderGray my-2" />
                <a href="https://t.me/ModzMafia" target="_blank" className="flex items-center gap-4 p-3 text-blue-400 font-bold"><Send size={20}/> Join Telegram</a>
             </div>
          </div>

          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>

          <Footer />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
