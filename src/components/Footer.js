import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 dark:bg-gray-800 text-white text-center p-4 mt-8 shadow-md">
      <p className="text-sm sm:text-base">
        &copy; {year} Expense Tracker. Built with 
        <span className="text-pink-400 hover:animate-pulse"> 💙 </span> 
        by <span className="font-semibold hover:text-yellow-300 cursor-pointer">Mahii</span>.
      </p>
    </footer>
  );
};

export default Footer;