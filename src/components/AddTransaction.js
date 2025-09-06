import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  DollarSign,
  List,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const AddTransaction = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  const categories = {
    income: ["Salary", "Freelance", "Investments", "Other"],
    expense: ["Food", "Transport", "Bills", "Shopping", "Other"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const transaction = {
          amount: parseFloat(amount),
          type,
          category,
          date: new Date(date),
          description,
          createdAt: new Date(),
        };
        await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
        toast.success("Transaction added!");
        onAdd();
        setAmount("");
        setType("expense");
        setCategory("");
        setDescription("");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-md"
    >
      <h3 className="text-2xl font-bold mb-6 text-center">
        Add New Transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 text-gray-500" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Type */}
        <div className="relative">
          {type === "income" ? (
            <TrendingUp className="absolute left-3 top-3 text-green-500" />
          ) : (
            <TrendingDown className="absolute left-3 top-3 text-red-500" />
          )}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="relative">
          <List className="absolute left-3 top-3 text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTransaction;
