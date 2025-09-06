import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span>Welcome, {user.email}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition"
              >
                <FaSignOutAlt />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;