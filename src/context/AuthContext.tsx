import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CONFIG } from '../data/weddingData';

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  adminName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'durgesh_wedding_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated_durgesh';
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated_durgesh');
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [isAdmin]);

  const login = (email: string, pass: string): boolean => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (
      trimmedEmail === ADMIN_CONFIG.email.toLowerCase() &&
      trimmedPass === ADMIN_CONFIG.password
    ) {
      setIsAdmin(true);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        adminName: ADMIN_CONFIG.hostName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
