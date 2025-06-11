// src/context/AuthContext.jsx - UPGRADED FOR GOOGLE SIGN-IN
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, // 👈 IMPORT GOOGLE'S AUTH PROVIDER
  signInWithPopup     // 👈 IMPORT THE FUNCTION FOR POPUP SIGN-IN
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- AUTHENTICATION FUNCTIONS ---
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }

  // 👇 NEW FUNCTION FOR GOOGLE SIGN-IN 👇
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // This listener checks for login/logout status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // The object available to all components
  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle, // 👈 ADD THE NEW FUNCTION HERE
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}