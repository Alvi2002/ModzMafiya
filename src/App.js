import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { db, auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, query, orderBy } from 'firebase/firestore';
import './index.css';

// Components & Pages
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AppCard from './components/AppCard';
import PromptCard from './components/PromptCard';
import Details from './pages/Details';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AppsPage from './pages/AppsPage';
import PresetsPage from './pages/PresetsPage';
import PromptsPage from './pages/PromptsPage';

import { Send, Bot, Search, Home as HomeIcon, Gamepad2, Flame, X } from 'lucide-react';

// --- Home Component (সাইটের ডিফল্ট ভিউ) ---
const Home = ({ searchQuery, setSearchQuery, settings }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "content"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const apps = data.filter(i => i.type === 'app');
  const prompts = data.filter(i => i.type === 'prompt');
  const filtered = data.filter(i => i.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="flex justify-center items-center h-64 text-primary font-bold">Loading Mafia Mods...</div>;

  return (
    <div className="p-4 pb-28">
      {/* Search Bar */}
      <div className="relative mt-2">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:border-primary text-gray-300 outline-none shadow-xl" />
        <Search className="absolute right-5 top-4 text-primary" />
      </div>

      {searchQuery ? (
        <div className="mt-8 grid grid-cols-3 gap-3">
          {filtered.map(item => (
            <Link key={item.id} to={`/details/${item.id}`}><AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} /></Link>
          ))}
        </div>
      ) : (
        <>
          <div className="mt-6 bg-gradient-to-r from-blue-700 to-primary p-4 rounded-3xl flex items-center gap-3">
            <Send size={24} className="text-white" />
            <span className="text-sm font-bold text-white">{settings.bannerText || "সব প্রিমিয়াম Apps একদম ফ্রি!"}</span>
          </div>

          {/* AI Prompt Section - ডাটা থাকলে দেখাবে নয়তো হাইড */}
          {prompts.length > 0 && (
            <div className="mt-8 animate-in fade-in duration-700">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Bot className="text-primary"/> AI Prompt</h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {prompts.map(item => (
                  <Link key={item.id} to={`/details/${item.id}`}><PromptCard title={item.name} image={item.imageUrl} /></Link>
                ))}
              </div>
            </div>
          )}

          {/* Trending Apps Section - ডাটা থাকলে দেখাবে নয়তো হাইড */}
          {apps.length > 0 && (
            <div className="mt-8 animate-in fade-in duration-700">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-primary rounded-full"></div> Trending Apps</h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {apps.map(item => (
                  <Link key={item.id} to={`/details/${item.id}`}><AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} /></Link>
                ))}
              </div>
            </div>
          )}

          {data.length === 0 && <div className="mt-20 text-center text-gray-500 font-bold">Nothing available right now. Check back later!</div>}
        </>
      )}
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({ telegram: '', developer: '', footerText: '', bannerText: '' });

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
    // সাইট সেটিংস লোড করা
    onSnapshot(doc(db, "settings", "siteConfig"), (doc) => {
      if (doc.exists()) setSettings(doc.data());
    });
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={isDark ? "dark" : "light"}>
        <div className={`min-h-screen transition-all ${isDark ? "bg-darkBg text-white" : "bg-gray-100 text-black"} relative overflow-x-hidden`}>
          
          {/* যদি অ্যাডমিন প্যানেলে থাকে তবে ন্যাভবার দেখাবে না (পেশাদার লুকের জন্য) */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Navbar toggleMenu={toggleMenu} isDark={isDark} toggleTheme={toggleTheme} />} />
          </Routes>

          {/* Sidebar Menu */}
          <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={toggleMenu}></div>
          <div className={`fixed inset-y-0 right-0 w-64 ${isDark ? "bg-[#161b29]" : "bg-white"} z-[70] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 border-l border-borderGray p-6 shadow-2xl`}>
             <button onClick={toggleMenu} className="mb-10 p-2 bg-darkBg rounded-full text-white border border-borderGray"><X size={20}/></button>
             <div className="flex flex-col gap-4 font-bold">
                <NavLink to="/" onClick={toggleMenu} className={({isActive})=>isActive?"text-primary bg-primary/10 p-3 rounded-xl flex items-center gap-3":"p-3 flex items-center gap-3 text-gray-400"}><HomeIcon size={20}/> Home</NavLink>
                <NavLink to="/apps" onClick={toggleMenu} className={({isActive})=>isActive?"text-primary bg-primary/10 p-3 rounded-xl flex items-center gap-3":"p-3 flex items-center gap-3 text-gray-400"}><Gamepad2 size={20}/> Apps</NavLink>
                <NavLink to="/presets" onClick={toggleMenu} className={({isActive})=>isActive?"text-primary bg-primary/10 p-3 rounded-xl flex items-center gap-3":"p-3 flex items-center gap-3 text-gray-400"}><Flame size={20}/> Preset</NavLink>
                <a href={settings.telegram} target="_blank" rel="noreferrer" className="p-3 flex items-center gap-3 text-blue-400 border-t border-borderGray mt-4"><Send size={20}/> Join Telegram</a>
                {user && <Link to="/admin" className="p-3 text-red-400 font-black">ADMIN PANEL</Link>}
             </div>
          </div>

          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} settings={settings} />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/presets" element={<PresetsPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            
            {/* Admin Access */}
            <Route path="/admin-login" element={<Login />} />
            <Route path="/admin" element={user ? <AdminDashboard settings={settings} /> : <Navigate to="/admin-login" />} />
          </Routes>

          <Footer settings={settings} />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
