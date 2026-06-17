import React from 'react';
import { Shield, Mail, Code, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 p-6 border-t border-borderGray bg-[#0b0f1a] text-center pb-32">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="bg-primary rounded-full p-1 w-6 h-6 flex items-center justify-center font-bold text-black text-sm">M</div>
        <h2 className="text-lg font-bold">ModzMafia.top 2026</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-400 mb-8">
        <div className="flex items-center justify-center gap-1 bg-cardBg py-3 rounded-xl border border-borderGray">
          <Shield size={14} className="text-primary" /> Disclaimer
        </div>
        <div className="flex items-center justify-center gap-1 bg-cardBg py-3 rounded-xl border border-borderGray">
          <Mail size={14} className="text-primary" /> Privacy Policy
        </div>
        <div className="flex items-center justify-center gap-1 bg-cardBg py-3 rounded-xl border border-borderGray">
          <Code size={14} className="text-primary" /> Developer
        </div>
        <div className="flex items-center justify-center gap-1 bg-cardBg py-3 rounded-xl border border-borderGray">
          <Send size={14} className="text-primary" /> Telegram
        </div>
      </div>
      
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Powered by Modz Mafia Team</p>
    </footer>
  );
};

export default Footer;
