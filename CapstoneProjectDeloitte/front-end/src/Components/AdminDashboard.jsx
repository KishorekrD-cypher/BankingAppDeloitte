import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/AdminNavbar.css";
const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/pending-users")
      .then((response) => {
        setPendingUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const approveUser = (user_id) => {
    axios
      .put(`http://localhost:8080/admin/approve/${user_id}`)
      .then((response) => {
        console.log("User approved successfully", response.data);
        setPendingUsers(pendingUsers.filter((user) => user.user_id !== user_id));
      })
      .catch((error) => {
        console.error("There was an error approving the user!", error);
      });
  };

  return (
    <div className="admin-dashboard">
      <div className="pending-users-list">
        <h2 className="heading">Pending Users</h2>

        {pendingUsers.length === 0 ? (
          <p>No pending users to approve</p>
        ) : (
          <table className="pending-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Account Number</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.accountNumber}</td>
                  <td>
                    <button
                      className="approve-button"
                      onClick={() => approveUser(user.user_id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
