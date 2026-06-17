import React from 'react';
import { Star, Download } from 'lucide-react';

const AppCard = ({ icon, name, rating, downloads }) => {
  return (
    <div className="bg-cardBg border border-borderGray rounded-3xl p-3 flex flex-col items-center min-w-[110px] text-center">
      <img src={icon} alt={name} className="w-16 h-16 rounded-2xl mb-2 shadow-lg object-cover" />
      <h3 className="text-[13px] font-bold truncate w-full">{name}</h3>
      <div className="flex items-center gap-0.5 my-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={10} fill={i < rating ? "#FFD700" : "none"} stroke={i < rating ? "#FFD700" : "gray"} />
        ))}
      </div>
      <div className="bg-[#00df8215] text-primary text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <Download size={10} /> {downloads}
      </div>
    </div>
  );
};

export default AppCard;
