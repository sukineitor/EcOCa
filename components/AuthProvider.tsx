import React, { createContext, useContext, useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GOOGLE_CONFIG } from '../config/google';
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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        const userInfo = await response.json();
        
        const userData: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          verified_email: userInfo.verified_email,
          locale: userInfo.locale,
          loginTime: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          sessionId: generateSessionId(),
          ipHash: await getIPHash(),
          userAgentHash: getUserAgentHash()
        };

        setUser(userData);
        localStorage.setItem('ecocash_user', JSON.stringify(userData));
        
        // Log security event
        logSecurityEvent('LOGIN_SUCCESS', userData);
        
      } catch (error) {
        console.error('Error fetching user info:', error);
        logSecurityEvent('LOGIN_ERROR', { error: error.message });
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      logSecurityEvent('LOGIN_FAILED', { error });
    },
    scope: GOOGLE_CONFIG.SCOPE,
  });

  const logout = () => {
    if (user) {
      logSecurityEvent('LOGOUT', user);
    }
    googleLogout();
    setUser(null);
    localStorage.removeItem('ecocash_user');
    localStorage.removeItem('ecocash_v2_stats');
  };

  const generateSessionId = (): string => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const getIPHash = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return btoa(data.ip).substring(0, 16);
    } catch {
      return 'unknown_ip';
    }
  };

  const getUserAgentHash = (): string => {
    return btoa(navigator.userAgent.substring(0, 100)).substring(0, 16);
  };

  const logSecurityEvent = (eventType: string, data: any) => {
    const securityLog = {
      timestamp: new Date().toISOString(),
      eventType,
      data,
      sessionId: user?.sessionId || 'unknown'
    };
    
    // In production, send to security monitoring service
    console.log('Security Event:', securityLog);
    
    // Store critical events locally
    const existingLogs = JSON.parse(localStorage.getItem('ecocash_security_logs') || '[]');
    existingLogs.push(securityLog);
    
    // Keep only last 100 events
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('ecocash_security_logs', JSON.stringify(existingLogs));
  };

  const value: AuthContextType = {
    user,
    login: () => login(),
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
