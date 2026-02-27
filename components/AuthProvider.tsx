import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const generateSessionId = () => Math.random().toString(36).substring(2, 15);
const getUserAgentHash = () => navigator.userAgent.substring(0, 50);
const getIPHash = async () => 'dev_ip_hash';

const logSecurityEvent = (event: string, data: any) => {
  console.log(`[SECURITY] ${event}:`, data);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ecocash_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ecocash_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    // Login simulado para desarrollo
    const mockUser: User = {
      id: 'dev_user_123',
      email: 'developer@ecocash.dev',
      name: 'Developer User',
      picture: '',
      verified_email: true,
      locale: 'es',
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      sessionId: generateSessionId(),
      ipHash: await getIPHash(),
      userAgentHash: getUserAgentHash()
    };

    setUser(mockUser);
    localStorage.setItem('ecocash_user', JSON.stringify(mockUser));
    logSecurityEvent('LOGIN_SUCCESS', mockUser);
  };

  const logout = () => {
    if (user) {
      logSecurityEvent('LOGOUT', { userId: user.id });
    }
    setUser(null);
    localStorage.removeItem('ecocash_user');
    localStorage.removeItem('ecocash_v2_stats');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
