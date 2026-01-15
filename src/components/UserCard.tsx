import React from 'react';
import { Mail, MapPin, Phone, Building2 } from 'lucide-react';
import  type { User } from '../types/index';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border-l-4 border-blue-500 overflow-hidden group"
    >
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {user.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{user.address?.city || 'Unknown'}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{user.phone}</span>
          </div>

          {user.company && (
            <div className="flex items-start gap-3 pt-1">
              <Building2 className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">
                {user.company.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};