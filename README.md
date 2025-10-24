🧾 Expense Tracker Web App
A modern, visually appealing expense tracker built with React, Firebase, and TailwindCSS, featuring Framer Motion animations and budget alerts. Keep track of your income, expenses, and visualize your spending with charts. Export your transaction history as CSV or PDF.

🚀 Features
Add Income & Expenses with category, description, and date
Real-time balance & budget tracking
Budget alerts when expenses exceed set limits
Sad animation for expenses & celebration animation for income using Framer Motion
Visual Expense Chart to analyze spending
Export Transactions to CSV or PDF
Premium UI with glassmorphism, gradients, shadows, hover effects
Responsive Design for all screen sizes
📁 Project Structure
ExpenseTrackerWebApp/
│
├── public/
│   └── index.html          ← Main HTML file
├── src/
│   ├── components/
│   │   ├── AddTransaction.js
│   │   ├── Dashboard.js
│   │   ├── ExpenseChart.js
│   │   ├── Footer.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── Signup.js
│   │   └── TransactionList.js
│   ├── firebase.js         ← Firebase config & initialization
│   ├── App.js
│   ├── index.js
│   └── style.css
├── package.json
├── README.md
└── .gitignore
⚡ Technologies Used
React.js – Frontend library
TailwindCSS – Styling and responsive design
Firebase Firestore – Backend database
React Toastify – Notifications
Framer Motion – Smooth animations
Chart.js – Expense chart visualization
jsPDF & PapaParse – Export transactions as PDF & CSV
🛠 Installation
Clone the repository:
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
Install dependencies:
npm install
Configure Firebase:

Create a project on Firebase
Copy your Firebase config to src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
Start the development server:
npm start
📈 Usage
Add your income and expenses
Set your monthly budget
View live balance and expense charts
Export transaction history as CSV or PDF
Enjoy animations when adding income or overspending
📂 Future Improvements
Monthly summary & reports
Dark mode toggle
Mobile app version
Lottie animations folder for more advanced effects
📝 License
This project is open-source and free to use under the MIT License.
