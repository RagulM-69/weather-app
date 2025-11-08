import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading: boolean;
  locationLoading: boolean;
  error: string | null;
}

export function SearchBar({ onSearch, onLocationClick, loading, locationLoading, error }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={loading}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX />
            </button>
          )}
        </div>
        <motion.button
          type="submit"
          disabled={loading || !searchQuery.trim()}
          className="px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
        <motion.button
          type="button"
          onClick={onLocationClick}
          disabled={locationLoading}
          className="px-4 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Use my location"
        >
          <FiMapPin className={locationLoading ? 'animate-spin' : ''} />
        </motion.button>
      </form>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 dark:text-red-400 text-sm mt-2 px-4"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

