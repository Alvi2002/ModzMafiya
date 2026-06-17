import React from 'react';
import { Search, Settings, Send, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-darkBg border-b border-borderGray px-4 py-3 flex items-center justify-between">
      {/* লোগো */}
      <div className="flex items-center gap-2">
        <div className="bg-red-500 rounded-full p-1 w-8 h-8 flex items-center justify-center font-bold text-white text-xl">
          P
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          Poloja <span className="text-primary">.top</span>
        </h1>
      </div>

      {/* সেটিং ও মেনু আইকন */}
      <div className="flex items-center gap-3">
        <button className="p-2 bg-cardBg rounded-full border border-borderGray">
          <Settings size={20} className="text-gray-400" />
        </button>
        <button className="p-2 bg-blue-500 rounded-full text-white">
          <Send size={18} />
        </button>
        <button className="p-2 bg-cardBg rounded-lg border border-borderGray">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
