import React, { useState } from 'react';
import { Search, Plane, MapPin, Building2 } from 'lucide-react';
import type { FlightSearchParams } from '../types/flight';

interface FlightSearchProps {
  onSearch: (params: FlightSearchParams) => void;
  isLoading: boolean;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch, isLoading }) => {
  const [searchType, setSearchType] = useState<'flight' | 'route' | 'airline'>('flight');
  const [flightNumber, setFlightNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [airline, setAirline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: FlightSearchParams = {};
    
    switch (searchType) {
      case 'flight':
        if (flightNumber.trim()) {
          params.flight_iata = flightNumber.trim().toUpperCase();
        }
        break;
      case 'route':
        if (departure.trim()) params.dep_iata = departure.trim().toUpperCase();
        if (arrival.trim()) params.arr_iata = arrival.trim().toUpperCase();
        break;
      case 'airline':
        if (airline.trim()) params.airline_iata = airline.trim().toUpperCase();
        break;
    }
    
    onSearch(params);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Search className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Flight Search</h2>
      </div>

      {/* Search Type Tabs */}
      <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-xl">
        {[
          { key: 'flight', label: 'Flight Number', icon: Plane },
          { key: 'route', label: 'Route', icon: MapPin },
          { key: 'airline', label: 'Airline', icon: Building2 }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSearchType(key as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              searchType === key
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {searchType === 'flight' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flight Number
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="e.g., AA100, BA123"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}

        {searchType === 'route' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure Airport
              </label>
              <input
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                placeholder="e.g., JFK, LAX"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Airport
              </label>
              <input
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                placeholder="e.g., LHR, CDG"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}

        {searchType === 'airline' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airline Code
            </label>
            <input
              type="text"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              placeholder="e.g., AA, BA, LH"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Flights
            </span>
          )}
        </button>
      </form>
    </div>
  );
};