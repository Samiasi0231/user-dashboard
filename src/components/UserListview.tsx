import React, { useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';
import { LoadingSpinner } from './LoadingSpinner';
import { useApp } from '../hooks/useApp';

export const UserListView: React.FC = () => {
  const { 
    users, 
    searchQuery, 
    selectedCity, 
    loading, 
    error, 
    setSelectedUser 
  } = useApp();

  
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCity = !selectedCity || user.address?.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [users, searchQuery, selectedCity]);

  if (loading) {
    return <LoadingSpinner text="Loading users..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Users</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar />
      <div className="text-sm text-gray-600">
        {filteredUsers.length > 0 ? (
          <p>
            Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{users.length}</span> users
          </p>
        ) : (
          <p>No users found</p>
        )}
      </div>
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 sm:p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};