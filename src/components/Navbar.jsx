import React, { useState } from 'react';
import { Search, Settings, Send, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleMenu, isDark, toggleTheme }) => {
  return (
    <>
      <nav className="sticky top-0 z-40 bg-darkBg border-b border-borderGray px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1 w-8 h-8 flex items-center justify-center font-bold text-black text-xl">M</div>
          <h1 className="text-xl font-bold tracking-tight">Modz <span className="text-primary">Mafia</span></h1>
        </Link>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 bg-cardBg rounded-full border border-borderGray text-gray-400">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 bg-blue-500 rounded-full text-white shadow-lg shadow-blue-500/30">
            <Send size={18} />
          </button>
          <button onClick={toggleMenu} className="p-2 bg-cardBg rounded-lg border border-borderGray">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
