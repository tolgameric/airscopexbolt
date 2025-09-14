import React from 'react';
import { Plane, Clock, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type { Flight } from '../types/flight';

interface FlightCardProps {
  flight: Flight;
  onClick?: () => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'scheduled':
        return 'text-green-600 bg-green-100';
      case 'delayed':
        return 'text-orange-600 bg-orange-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'scheduled':
        return CheckCircle;
      case 'delayed':
        return AlertCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '--:--';
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  };

  const StatusIcon = getStatusIcon(flight.flight_status);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-200">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {flight.airline.name} {flight.flight.number}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(flight.flight_date)}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(flight.flight_status)}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">{flight.flight_status}</span>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-gray-900">{flight.departure.iata}</div>
          <div className="text-sm text-gray-500">{formatTime(flight.departure.scheduled)}</div>
          <div className="text-xs text-gray-400">
            {flight.departure.gate && `Gate ${flight.departure.gate}`}
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-px bg-gray-300"></div>
            <Plane className="w-4 h-4 text-blue-500" />
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-gray-900">{flight.arrival.iata}</div>
          <div className="text-sm text-gray-500">{formatTime(flight.arrival.scheduled)}</div>
          <div className="text-xs text-gray-400">
            {flight.arrival.gate && `Gate ${flight.arrival.gate}`}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{flight.departure.airport} → {flight.arrival.airport}</span>
        </div>
        {flight.departure.delay && flight.departure.delay > 0 && (
          <div className="text-orange-600 font-medium">
            Delayed {flight.departure.delay} min
          </div>
        )}
      </div>

      {/* Live tracking indicator */}
      {flight.live && (
        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live tracking available</span>
        </div>
      )}
    </div>
  );
};