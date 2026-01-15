import type { FC } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';

export const SearchBar: FC = () => {
  const { searchQuery, setSearchQuery, selectedCity, setSelectedCity, availableCities } =
    useApp();

  return (
    <div className="space-y-5 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      {/* Search Input */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-900">
          Search Users
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-900">
          Filter by City
        </label>
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Cities</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-3.5 text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          {selectedCity && (
            <button
              onClick={() => setSelectedCity('')}
              className="absolute right-12 top-3.5 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Clear filter"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedCity) && (
        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {searchQuery && (
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-100">
              🔍 {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 transition-colors hover:text-blue-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          {selectedCity && (
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 border border-indigo-100">
              📍 {selectedCity}
              <button
                onClick={() => setSelectedCity('')}
                className="ml-1 transition-colors hover:text-indigo-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};