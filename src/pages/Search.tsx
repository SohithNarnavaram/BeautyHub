import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { VendorCard } from '../components/VendorCard';
import { SearchBar } from '../components/SearchBar';
import { api } from '../api/mockApi';
import { Vendor, Gender, SearchFilters } from '../types';
import { Filter, X } from 'lucide-react';

export const Search = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  // Default gender based on theme
  const defaultGender = theme === 'dark' ? 'male' : 'female';
  const [filters, setFilters] = useState<SearchFilters>({
    city: searchParams.get('city') || 'Bangalore',
    service: searchParams.get('service') || undefined,
    gender: (searchParams.get('gender') as Gender) || defaultGender,
    homeVisit: searchParams.get('homeVisit') === 'true' ? true : searchParams.get('homeVisit') === 'false' ? false : undefined,
    minRating: undefined,
    maxPrice: undefined,
  });

  const bgColor = theme === 'dark' ? 'bg-dark-bg' : 'bg-pink-bg';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const cardBg = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';

  useEffect(() => {
    loadVendors();
  }, [filters]);

  const loadVendors = async () => {
    setLoading(true);
    const results = await api.searchVendors(filters);
    setVendors(results);
    setLoading(false);
  };

  const handleSearch = (newFilters: {
    city: string;
    service?: string;
    gender?: Gender;
    homeVisit?: boolean;
  }) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    setSearchParams({
      city: updated.city,
      ...(updated.service && { service: updated.service }),
      ...(updated.gender && { gender: updated.gender }),
      ...(updated.homeVisit !== undefined && { homeVisit: String(updated.homeVisit) }),
    });
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    const cleared = { city: 'Bangalore' };
    setFilters(cleared);
    setSearchParams({ city: 'Bangalore' });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== 'Bangalore'
  ).length;

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            initialCity={filters.city}
            initialService={filters.service}
            initialGender={filters.gender}
            initialHomeVisit={filters.homeVisit}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${textColor}`}>
              {loading ? 'Searching...' : `${vendors.length} Professionals Found`}
            </h1>
            {filters.service && (
              <p className={`${textSecondary} mt-1`}>for "{filters.service}" in {filters.city}</p>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${cardBg} ${borderColor} border px-4 py-2 rounded-lg flex items-center space-x-2 ${textColor} hover:opacity-80 transition`}
          >
            <Filter size={18} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className={`${theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent'} text-white text-xs px-2 py-0.5 rounded-full`}>
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className={`${cardBg} ${borderColor} border rounded-lg p-6 mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${textColor}`}>Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className={`text-sm ${theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent'} hover:opacity-80 flex items-center space-x-1`}
              >
                <X size={16} />
                <span>Clear All</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
                  className={`w-full p-2 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                  }`}
                >
                  <option value="">Any</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Maximum Price (₹)
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g., 5000"
                  className={`w-full p-2 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`${cardBg} rounded-xl h-80 animate-pulse`}
              />
            ))}
          </div>
        ) : vendors.length === 0 ? (
          <div className={`${cardBg} rounded-lg p-12 text-center`}>
            <p className={`${textSecondary} text-lg`}>No professionals found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className={`mt-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent'} hover:opacity-80`}
            >
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

