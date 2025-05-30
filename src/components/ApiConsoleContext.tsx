import React, { createContext, useContext, useState } from 'react';

export type ApiLog = {
  id: string;
  method: string;
  url: string;
  status?: number;
  statusText?: string;
  time?: number;
  headers?: Record<string, string>;
  body?: unknown;
  response?: unknown;
  comment?: string;
  timestamp: string;
};

interface ApiConsoleContextType {
  logs: ApiLog[];
  logApiCall: (log: Omit<ApiLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

const ApiConsoleContext = createContext<ApiConsoleContextType | undefined>(undefined);

export const ApiConsoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<ApiLog[]>([]);

  const logApiCall = (log: Omit<ApiLog, 'id' | 'timestamp'>) => {
    setLogs(prev => [
      ...prev,
      {
        ...log,
        id: Math.random().toString(36).slice(2),
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <ApiConsoleContext.Provider value={{ logs, logApiCall, clearLogs }}>
      {children}
    </ApiConsoleContext.Provider>
  );
};

export const useApiConsole = () => {
  const ctx = useContext(ApiConsoleContext);
  if (!ctx) throw new Error('useApiConsole debe usarse dentro de ApiConsoleProvider');
  return ctx;
}; 