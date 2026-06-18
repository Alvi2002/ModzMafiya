import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { db } from './firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './index.css';

// Components & Pages
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AppCard from './components/AppCard';
import PromptCard from './components/PromptCard';
import Details from './pages/Details';
import Admin from './pages/Admin';
import { Send, Bot, X, Home as HomeIcon, Gamepad2, Flame, Search } from 'lucide-react';

const Home = ({ searchQuery, setSearchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "content"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // ইউনিফাইড সার্চ (সব ক্যাটাগরি একসাথে দেখাবে)
  const filtered = data.filter(i => i.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 pb-28">
      <div className="relative mt-2">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search Apps, Presets, Prompts..." 
          className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:border-primary text-gray-300 outline-none" 
        />
        <Search className="absolute right-5 top-4 text-primary" />
      </div>

      {searchQuery ? (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map(item => (
              <Link key={item.id} to={`/details/${item.id}`}>
                <AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 bg-gradient-to-r from-blue-700 to-primary p-4 rounded-3xl flex items-center gap-3">
            <Send size={24} className="text-white" />
            <span className="text-sm font-bold">Modz Mafia - সব প্রিমিয়াম Apps ফ্রি! 🚀</span>
          </div>

          {/* AI Prompt Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Bot className="text-primary"/> AI Prompt</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {data.filter(i => i.type === 'prompt').map(item => (
                <Link key={item.id} to={`/details/${item.id}`}><PromptCard title={item.name} image={item.imageUrl} /></Link>
              ))}
            </div>
          </div>

          {/* Trending Apps Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-primary rounded-full"></div> Trending Apps</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {data.filter(i => i.type === 'app').map(item => (
                <Link key={item.id} to={`/details/${item.id}`}><AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} /></Link>
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

  // হাইলাইট স্টাইল
  const activeLink = "flex items-center gap-4 text-primary bg-primary/10 p-3 rounded-2xl border border-primary/20 transition-all";
  const normalLink = "flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all text-gray-400";

  return (
    <Router>
      <div className={isDark ? "dark" : "light-mode"}>
        <div className={`min-h-screen ${isDark ? "bg-darkBg text-white" : "bg-gray-100 text-black"} transition-colors duration-300`}>
          <Navbar toggleMenu={() => setIsMenuOpen(true)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
          
          {/* Sidebar Menu Drawer (ভিডিওর মতো স্লিমি ডিজাইন) */}
          <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}></div>
          <div className={`fixed inset-y-0 right-0 w-64 ${isDark ? "bg-[#161b29]" : "bg-white"} z-[70] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 border-l border-borderGray p-6 shadow-2xl`}>
             <button onClick={() => setIsMenuOpen(false)} className="mb-10 p-2 bg-darkBg rounded-full text-white border border-borderGray"><X size={20}/></button>
             <div className="flex flex-col gap-4 font-bold">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><HomeIcon size={20}/> Home</NavLink>
                <NavLink to="/apps" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Gamepad2 size={20}/> Apps</NavLink>
                <NavLink to="/presets" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Flame size={20}/> Preset</NavLink>
                <NavLink to="/prompts" onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeLink : normalLink}><Bot size={20}/> AI Prompt</NavLink>
             </div>
          </div>

          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/admin-mafia" element={<Admin />} />
          </Routes>
          <Footer />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
