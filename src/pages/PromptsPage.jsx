import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import PromptCard from '../components/PromptCard';

const PromptsPage = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "content"), where("type", "==", "prompt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPrompts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 pb-28 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-3 uppercase">AI Prompts</h2>
      <div className="grid grid-cols-2 gap-4">
        {prompts.map(item => (
          <Link key={item.id} to={`/details/${item.id}`}>
            <PromptCard title={item.name} image={item.imageUrl} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromptsPage;
