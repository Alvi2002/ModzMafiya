import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import AppCard from '../components/AppCard';

const AppsPage = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "content"), where("type", "==", "app"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setApps(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 pb-28 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-3 uppercase tracking-wider">All Applications</h2>
      <div className="grid grid-cols-3 gap-4">
        {apps.map(app => (
          <Link key={app.id} to={`/details/${app.id}`}>
            <AppCard name={app.name} rating={app.rating} downloads={app.size} icon={app.imageUrl} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;
