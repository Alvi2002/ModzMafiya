import React from 'react';
import { Bot, ChevronDown } from 'lucide-react';

const PromptCard = ({ image, title }) => {
  return (
    <div className="bg-cardBg border border-borderGray rounded-2xl overflow-hidden min-w-[160px]">
      <div className="relative h-28">
        <img src={image} alt="prompt" className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded text-white">AI</span>
      </div>
      <div className="p-3 flex items-center justify-between">
        <span className="text-sm font-semibold truncate">{title} 👆</span>
        <ChevronDown size={16} className="text-primary" />
      </div>
    </div>
  );
};

export default PromptCard;
