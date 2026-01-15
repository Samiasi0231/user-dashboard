import React from 'react';
import { UserListView } from '../components/UserListview';
import { UserDetailView } from '../components/UserDetailview';
import { useApp } from '../hooks/useApp';
interface HomePageProps {
  onLogout: () => void;
}
export const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const { selectedUser } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            User Management Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {selectedUser ? <UserDetailView /> : <UserListView />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-sm text-gray-600">
            © 2024 User Management Dashboard assessment test. Built with React & TypeScript @Asitect.
          </p>
        </div>
      </footer>
    </div>
  );
};
