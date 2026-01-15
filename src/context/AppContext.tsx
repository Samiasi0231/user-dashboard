import { createContext, useState, useEffect, useCallback, } from 'react';
import type { ReactNode,FC } from "react";
import type { User, AppContextType } from '../types/index';

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);

      const cities = Array.from(
        new Set(
          data
            .map((user) => user.address?.city || 'Unknown')
            .filter(Boolean)
        )
      ).sort() as string[];

      setAvailableCities(cities);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while fetching users';
      setError(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const value: AppContextType = {
    users,
    selectedUser,
    loading,
    error,
    searchQuery,
    selectedCity,
    availableCities,
    setSearchQuery,
    setSelectedCity,
    setSelectedUser,
    fetchUsers,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};