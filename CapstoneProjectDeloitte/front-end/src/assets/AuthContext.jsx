import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook for easy access to the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // Function to sign in the user
  const signIn = (role, token, email) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setAuthToken(token);
    setUserEmail(email);

    // Optionally, you can also save this in localStorage or sessionStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
  };

  // Function to sign out the user
  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setAuthToken(null);
    setUserEmail(null);

    // Optionally, you can also clear these from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, authToken, userEmail, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
