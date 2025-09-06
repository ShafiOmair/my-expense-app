import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { PieChart, BarChart3 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const categories = [...new Set(transactions.map((t) => t.category))];
  const categoryData = categories.map((cat) =>
    transactions
      .filter((t) => t.category === cat && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const barData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Bar Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold">Income vs Expenses</h3>
        </div>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: false },
            },
          }}
        />
      </motion.div>

      {/* Pie Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          <h3 className="text-xl font-semibold">Expenses by Category</h3>
        </div>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              title: { display: false },
            },
          }}
        />
      </motion.div>
    </div>
  );
};

export default ExpenseChart;