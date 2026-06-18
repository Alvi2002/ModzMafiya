import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { db, auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './index.css';

// Components & Pages Import
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

// Icons Import
import { Send, Bot, X, Home as HomeIcon, Gamepad2, Flame, Search } from 'lucide-react';

// --- Home Component ---
const Home = ({ searchQuery, setSearchQuery }) => {
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

  const filtered = data.filter(i => i.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="flex justify-center items-center h-64 text-primary font-bold animate-pulse">Mafia Loading...</div>;

  return (
    <div className="p-4 pb-28">
      {/* Search Section */}
      <div className="relative mt-2">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Apps, Presets, Prompts..." 
          className="w-full bg-cardBg border border-borderGray rounded-2xl py-4 px-5 focus:border-primary text-gray-300 outline-none shadow-xl" 
        />
        <Search className="absolute right-5 top-4 text-primary" />
      </div>

      {searchQuery ? (
        <div className="mt-8 animate-in slide-in-from-bottom duration-500">
          <h2 className="text-lg font-bold mb-4">Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map(item => (
              <Link key={item.id} to={`/details/${item.id}`}>
                <AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} />
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-gray-500 mt-10">No items found!</p>}
        </div>
      ) : (
        <>
          <div className="mt-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-primary p-4 rounded-3xl flex items-center gap-3 shadow-lg">
            <Send size={24} className="text-white" />
            <span className="text-sm font-bold text-white">Modz Mafia - সব প্রিমিয়াম Apps ফ্রি! 🚀</span>
          </div>

          {/* AI Prompt Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Bot size={24}/>
              <h2 className="text-lg font-bold text-white">AI Prompt ({data.filter(i => i.type === 'prompt').length})</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {data.filter(i => i.type === 'prompt').map(item => (
                <Link key={item.id} to={`/details/${item.id}`}><PromptCard title={item.name} image={item.imageUrl} /></Link>
              ))}
            </div>
          </div>

          {/* Trending Apps Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-6 bg-primary rounded-full"></div>
              <h2 className="text-lg font-bold">Trending Apps</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {data.filter(i => i.type === 'app').slice(0, 6).map(item => (
                <Link key={item.id} to={`/details/${item.id}`}><AppCard name={item.name} rating={item.rating} downloads={item.size} icon={item.imageUrl} /></Link>
              ))}
            </div>
          </div>
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  // মেনু হাইলাইট করার জন্য স্টাইল
  const activeLink = "flex items-center gap-4 text-primary bg-primary/10 p-3 rounded-2xl border border-primary/20 transition-all duration-300";
  const normalLink = "flex items-center gap-4 p-3 hover:bg-cardBg rounded-2xl transition-all text-gray-400";

  return (
    <Router>
      <div className={isDark ? "dark" : ""}>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-darkBg text-white" : "bg-gray-50 text-black"} relative overflow-x-hidden`}>
          
          <Navbar toggleMenu={toggleMenu} isDark={isDark} toggleTheme={toggleTheme} />

          {/* --- Sidebar Menu Drawer --- */}
          <div 
            className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
            onClick={toggleMenu}
          ></div>
          
          <div className={`fixed inset-y-0 right-0 w-64 ${isDark ? "bg-[#161b29]" : "bg-white"} z-[70] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 border-l border-borderGray p-6 shadow-2xl`}>
             <button onClick={toggleMenu} className="mb-10 p-2 bg-darkBg rounded-full text-white border border-borderGray transition-transform active:scale-90">
               <X size={20}/>
             </button>
             
             <div className="flex flex-col gap-4 font-bold text-sm">
                <NavLink to="/" onClick={toggleMenu} className={({isActive}) => isActive ? activeLink : normalLink}><HomeIcon size={20}/> Home</NavLink>
                <NavLink to="/apps" onClick={toggleMenu} className={({isActive}) => isActive ? activeLink : normalLink}><Gamepad2 size={20}/> Apps</NavLink>
                <NavLink to="/presets" onClick={toggleMenu} className={({isActive}) => isActive ? activeLink : normalLink}><Flame size={20}/> Preset</NavLink>
                <NavLink to="/prompts" onClick={toggleMenu} className={({isActive}) => isActive ? activeLink : normalLink}><Bot size={20}/> AI Prompt</NavLink>
                <hr className="border-borderGray my-2" />
                <a href="https://t.me/ModzMafia" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 text-blue-400 font-bold hover:bg-blue-400/10 rounded-2xl transition-all">
                  <Send size={20}/> Join Telegram
                </a>
                {user && (
                  <NavLink to="/admin-dashboard" onClick={toggleMenu} className={({isActive}) => isActive ? activeLink : normalLink}>
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div> Dashboard
                  </NavLink>
                )}
             </div>
          </div>

          {/* --- Main Routing --- */}
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/presets" element={<PresetsPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            
            {/* Admin Security Routes */}
            <Route path="/admin-login" element={<Login />} />
            <Route path="/admin-dashboard" element={user ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
          </Routes>

          <Footer />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
