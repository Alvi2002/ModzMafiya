import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin-dashboard');
    } catch (error) {
      alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg p-6">
      <form onSubmit={handleLogin} className="bg-cardBg p-8 rounded-3xl border border-borderGray w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h2>
        <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-darkBg border border-borderGray mb-4 outline-none focus:border-primary" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-4 rounded-2xl bg-darkBg border border-borderGray mb-6 outline-none focus:border-primary" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all">LOGIN TO MAFIA PANEL</button>
      </form>
    </div>
  );
};

export default Login;
