import React from 'react';
import { Home, Gamepad2, Flame, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: <Home size={22} />, path: '/' },
    { name: 'Apps', icon: <Gamepad2 size={22} />, path: '/apps' },
    { name: 'Preset', icon: <Flame size={22} />, path: '/presets' },
    { name: 'AI Prompt', icon: <Bot size={22} />, path: '/prompts' },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-[#161b29]/95 backdrop-blur-md border border-borderGray rounded-3xl p-2 flex justify-around items-center z-50 shadow-2xl">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
            location.pathname === item.path 
            ? 'bg-primary text-black font-bold' 
            : 'text-gray-400'
          }`}
        >
          {item.icon}
          <span className="text-[10px] uppercase font-semibold">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
