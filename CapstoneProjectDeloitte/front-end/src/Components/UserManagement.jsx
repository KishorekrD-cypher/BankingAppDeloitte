import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/AdminNavbar.css";
const UserManagement = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/approved-users")
      .then((response) => {
        setApprovedUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the approved users!", error);
      });
  }, []);

  const handleRemoveUser = (userId) => {
    axios
      .delete(`http://localhost:8080/admin/remove-user/${userId}`)
      .then((response) => {
        setApprovedUsers(approvedUsers.filter((user) => user.user_id !== userId));
        console.log("User removed successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error removing the users!", error);
      });
  };

  return (
    <div className="user-management">
      <h2 className="heading">Approved Users</h2>

      {approvedUsers.length === 0 ? (
        <p>No approved users available.</p>
      ) : (
        <table className="user-management-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Account Number</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {approvedUsers.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.accountNumber}</td>
                <td>
                  <button
                    className="removebutton"
                    onClick={() => handleRemoveUser(user.user_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
