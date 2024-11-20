import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Payments.css';

const Payments = () => {
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [isWithdrawMoneyModalOpen, setIsWithdrawMoneyModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [accountBalance, setAccountBalance] = useState(() => {
    return parseFloat(localStorage.getItem('accountBalance')) || 0;
  });

  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    if (accountBalance >= 0) {
      localStorage.setItem('accountBalance', accountBalance.toString());
    }
  }, [accountBalance]);

  const handleAddMoney = () => setIsAddMoneyModalOpen(true);
  const handleSendMoney = () => setIsSendMoneyModalOpen(true);
  const handleWithdrawMoney = () => setIsWithdrawMoneyModalOpen(true);

  const handleConfirmAddMoney = () => {
    const amount = parseFloat(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      const email = localStorage.getItem('userEmail');
      axios
        .post('http://localhost:8080/user/payments/add-money', { email, amountToAdd: amount })
        .then((response) => {
          setAccountBalance(response.data.newBalance);
          setMessage(`Money added successfully. New balance: $${response.data.newBalance}`);
          setIsAddMoneyModalOpen(false);
          setAmountToAdd('');
        })
        .catch((error) => setError('Unable to add money. Please try again.'));
    } else {
      setError('Please enter a valid amount.');
    }
  };

  const handleConfirmSendMoney = () => {
    const amount = parseFloat(amountToSend);
    if (!isNaN(amount) && amount > 0 && accountNumber) {
      const email = localStorage.getItem('userEmail');
      axios
        .post('http://localhost:8080/user/payments/send-money', { email, accountNumber, amountToSend: amount })
        .then((response) => {
          setAccountBalance(response.data.newBalance);
          setMessage(`Money sent successfully. New balance: $${response.data.newBalance}`);
          setIsSendMoneyModalOpen(false);
          setAmountToSend('');
          setAccountNumber('');
        })
        .catch((error) => setError('Unable to send money. Please try again.'));
    } else {
      setError('Please enter valid details.');
    }
  };

  const handleConfirmWithdrawMoney = () => {
    const amount = parseFloat(amountToWithdraw);
    if (!isNaN(amount) && amount > 0 && amount <= accountBalance) {
      const email = localStorage.getItem('userEmail');
      axios
        .post('http://localhost:8080/user/payments/withdraw-money', { email, amountToWithdraw: amount })
        .then((response) => {
          setAccountBalance(response.data.newBalance);
          setMessage(`Money withdrawn successfully. New balance: $${response.data.newBalance}`);
          setIsWithdrawMoneyModalOpen(false);
          setAmountToWithdraw('');
        })
        .catch((error) => setError('Unable to withdraw money. Please try again.'));
    } else {
      setError('Please enter a valid amount that does not exceed your balance.');
    }
  };

  return (
    <div className="payments-container">
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="card-container">
        <div className="card" onClick={handleAddMoney}>
          <h3>Add Money</h3>
          <p>Add funds to your account</p>
        </div>
        <div className="card" onClick={handleSendMoney}>
          <h3>Send Money</h3>
          <p>Transfer money to another user</p>
        </div>
        <div className="card" onClick={handleWithdrawMoney}>
          <h3>Withdraw Money</h3>
          <p>Withdraw funds from your account</p>
        </div>
      </div>

      <div className="balance-container">
        <h4>Your Current Balance: ${accountBalance.toFixed(2)}</h4>
      </div>

      {isAddMoneyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Money</h2>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              placeholder="Enter amount"
              min="1"
            />
            <div className="modal-buttons">
              <button onClick={handleConfirmAddMoney}>Confirm</button>
              <button onClick={() => setIsAddMoneyModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isSendMoneyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Send Money</h2>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Recipient Account Number"
            />
            <input
              type="number"
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder="Enter amount"
              min="1"
            />
            <div className="modal-buttons">
              <button onClick={handleConfirmSendMoney}>Confirm</button>
              <button onClick={() => setIsSendMoneyModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isWithdrawMoneyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Withdraw Money</h2>
            <input
              type="number"
              value={amountToWithdraw}
              onChange={(e) => setAmountToWithdraw(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max={accountBalance}
            />
            <div className="modal-buttons">
              <button onClick={handleConfirmWithdrawMoney}>Confirm</button>
              <button onClick={() => setIsWithdrawMoneyModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
