import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// এই পেজগুলো আমরা পরে তৈরি করব, এখন জাস্ট সেটআপ করে রাখছি
const Home = () => <div className="p-10 text-center">Home Page (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
