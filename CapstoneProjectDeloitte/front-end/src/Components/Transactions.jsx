import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../assets/AuthContext"; 
import "../Styles/Transactions.css";

const Transactions = () => {
  const { authToken } = useAuth(); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    
    const fetchTransactions = async () => {
      if (!userEmail) {
        setError("User email is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/user/transactions/history?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          }
        );

        console.log("Fetched transactions:", response.data); 
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions.");
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userEmail, authToken]); 

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="transactions">
      <h2 className="heading">Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance After Transaction</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balanceAfterTransaction}</td>
                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
