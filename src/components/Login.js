import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../firebase";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/20 dark:bg-black/30 p-8 rounded-2xl shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-md">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/30 dark:bg-gray-700 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/30 dark:bg-gray-700 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-pink-400/50 transition"
          >
            Login
          </motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full py-3 mt-5 flex items-center justify-center gap-2 bg-white text-gray-800 font-medium rounded-xl shadow-md hover:shadow-lg transition"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </motion.button>
        <p className="mt-6 text-center text-gray-200">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-pink-300 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
