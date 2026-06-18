import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import AppCard from '../components/AppCard';

const PresetsPage = () => {
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "content"), where("type", "==", "preset"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPresets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 pb-28 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-3 uppercase">DSLR Presets</h2>
      <div className="grid grid-cols-2 gap-4">
        {presets.map(item => (
          <Link key={item.id} to={`/details/${item.id}`}>
            <div className="bg-cardBg border border-borderGray rounded-2xl overflow-hidden shadow-lg">
               <img src={item.imageUrl} alt="" className="w-full h-32 object-cover" />
               <div className="p-3">
                 <p className="text-xs font-bold truncate">{item.name}</p>
                 <p className="text-[10px] text-gray-500 mt-1">Lightroom Preset</p>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PresetsPage;
