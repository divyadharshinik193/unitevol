import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, role = 'volunteer') => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual login logic
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: email,
        role: role,
      };
      setUser(mockUser);
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual signup logic
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      setUser(mockUser);
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual logout logic
      setUser(null);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 