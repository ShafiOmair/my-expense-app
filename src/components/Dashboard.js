import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import AddTransaction from "./AddTransaction";
import ExpenseChart from "./ExpenseChart";
import TransactionList from "./TransactionList";
import { toast } from "react-toastify";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Explicitly import autoTable
import { motion } from "framer-motion";
import { ArrowDownToLine, FileSpreadsheet, Wallet } from "lucide-react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);

  const fetchTransactions = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const q = query(
          collection(db, `users/${user.uid}/transactions`),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);

        const income = data
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = data
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
        setBalance(income - expenses);

        console.log("Fetch: Budget:", budget, "Expenses:", expenses); // Debug
        checkBudgetAlert(expenses);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const checkBudgetAlert = (expenses) => {
    if (budget > 0 && expenses > budget) {
      console.log("Alert Condition Met: Budget:", budget, "Expenses:", expenses); // Debug
      toast.warn(
        `Budget Alert: Expenses ($${expenses.toFixed(2)}) exceed your budget of $${budget.toFixed(2)}!`,
        { toastId: "budgetAlert" }
      );
    } else {
      console.log("No Alert: Budget:", budget, "Expenses:", expenses); // Debug
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]); // Added fetchTransactions to dependencies

  // Re-check budget on transactions or budget change
  useEffect(() => {
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    console.log("Effect Trigger: Budget:", budget, "Expenses:", expenses); // Debug
    checkBudgetAlert(expenses);
  }, [transactions, budget, checkBudgetAlert]); // Added checkBudgetAlert to dependencies

  const exportCSV = () => {
    if (!transactions.length) {
      toast.error("No transactions to export!");
      return;
    }

    try {
      const csvData = transactions.map((t) => {
        const date = t.date && t.date.seconds ? new Date(t.date.seconds * 1000).toLocaleDateString() : "N/A";
        return {
          Date: date,
          Description: t.description || "N/A",
          Category: t.category || "N/A",
          Type: t.type || "N/A",
          Amount: t.amount || 0,
        };
      });
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      document.body.appendChild(link); // Append to body to ensure visibility
      link.click();
      document.body.removeChild(link); // Clean up
      URL.revokeObjectURL(url); // Free memory
    } catch (error) {
      toast.error(`Failed to export CSV: ${error.message}`);
    }
  };

  const exportPDF = () => {
    if (!transactions.length) {
      toast.error("No transactions to export!");
      return;
    }

    try {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["Date", "Description", "Category", "Type", "Amount"]],
        body: transactions.map((t) => {
          const date = t.date && t.date.seconds ? new Date(t.date.seconds * 1000).toLocaleDateString() : "N/A";
          return [
            date,
            t.description || "-",
            t.category || "N/A",
            t.type || "N/A",
            `$${t.amount ? t.amount.toFixed(2) : "0.00"}`,
          ];
        }),
        startY: 20, // Position table below title
        styles: { overflow: "linebreak" }, // Handle long text
      });
      doc.text("Transaction History", 20, 10);
      doc.save("transactions.pdf");
    } catch (error) {
      console.error("PDF Export Error:", error); // Log full error
      toast.error(`Failed to export PDF: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Balance Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-2xl text-center backdrop-blur-lg overflow-hidden"
      >
        <div className="flex items-center justify-center space-x-3">
          <Wallet className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Balance</h2>
        </div>
        <motion.p
          key={balance}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-extrabold mt-2"
        >
          ${balance !== undefined && balance !== null ? balance.toFixed(2) : "0.00"}
        </motion.p>
        {/* Budget Input Section */}
        <div className="mt-4 text-left">
          <label htmlFor="budget-input" className="block text-sm font-medium mb-1">
            Set Your Monthly Budget (e.g., 500.00)
          </label>
          <input
            id="budget-input"
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            placeholder="Enter amount (e.g., 500)"
            className="w-full p-2 rounded-lg bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Add + Chart + List */}
      <div className="grid lg:grid-cols-2 gap-8">
        <AddTransaction onAdd={fetchTransactions} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <ExpenseChart transactions={transactions} />
        </motion.div>
      </div>

      {/* Export Buttons */}
      <div className="flex space-x-6 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={exportCSV}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-md hover:opacity-90"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Export CSV
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={exportPDF}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-medium rounded-xl shadow-md hover:opacity-90"
        >
          <ArrowDownToLine className="w-5 h-5" />
          Export PDF
        </motion.button>
      </div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <TransactionList transactions={transactions} />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;