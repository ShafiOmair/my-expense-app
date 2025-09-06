import React from 'react';
import { motion } from 'framer-motion';

const TransactionList = ({ transactions }) => {
  // Convert Firestore timestamp or JS date safely
  const formatDate = (date) => {
    if (!date) return "-";
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Transaction History</h3>

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No transactions yet. Start by adding one!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <motion.tr
                  key={t.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{formatDate(t.date)}</td>
                  <td className="p-3">{t.description || '-'}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm ${
                        t.type === 'income'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="p-3">${t.amount?.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionList;