import React from 'react';
import { X, Plane, Clock, MapPin, Navigation, Gauge, BarChart3 } from 'lucide-react';
import type { Flight } from '../types/flight';

interface FlightDetailsProps {
  flight: Flight | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FlightDetails: React.FC<FlightDetailsProps> = ({ flight, isOpen, onClose }) => {
  if (!isOpen || !flight) return null;

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatSpeed = (speed: number | null) => {
    return speed ? `${Math.round(speed)} km/h` : 'N/A';
  };

  const formatAltitude = (altitude: number | null) => {
    return altitude ? `${Math.round(altitude)} m` : 'N/A';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {flight.airline.name} {flight.flight.number}
              </h2>
              <p className="text-gray-500">Flight Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Flight Route */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Route</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{flight.departure.iata}</div>
                <div className="text-sm text-gray-600 mb-1">{flight.departure.airport}</div>
                <div className="text-xs text-gray-500">Departure</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                  <Plane className="w-5 h-5 text-blue-500" />
                  <div className="w-16 h-px bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{flight.arrival.iata}</div>
                <div className="text-sm text-gray-600 mb-1">{flight.arrival.airport}</div>
                <div className="text-xs text-gray-500">Arrival</div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Departure
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduled:</span>
                  <span className="font-medium">{formatDateTime(flight.departure.scheduled)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated:</span>
                  <span className="font-medium">{formatDateTime(flight.departure.estimated)}</span>
                </div>
                {flight.departure.actual && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual:</span>
                    <span className="font-medium">{formatDateTime(flight.departure.actual)}</span>
                  </div>
                )}
                {flight.departure.gate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gate:</span>
                    <span className="font-medium">{flight.departure.gate}</span>
                  </div>
                )}
                {flight.departure.terminal && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terminal:</span>
                    <span className="font-medium">{flight.departure.terminal}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                Arrival
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduled:</span>
                  <span className="font-medium">{formatDateTime(flight.arrival.scheduled)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated:</span>
                  <span className="font-medium">{formatDateTime(flight.arrival.estimated)}</span>
                </div>
                {flight.arrival.actual && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual:</span>
                    <span className="font-medium">{formatDateTime(flight.arrival.actual)}</span>
                  </div>
                )}
                {flight.arrival.gate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gate:</span>
                    <span className="font-medium">{flight.arrival.gate}</span>
                  </div>
                )}
                {flight.arrival.terminal && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terminal:</span>
                    <span className="font-medium">{flight.arrival.terminal}</span>
                  </div>
                )}
                {flight.arrival.baggage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Baggage:</span>
                    <span className="font-medium">{flight.arrival.baggage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Tracking Data */}
          {flight.live && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-green-600" />
                Live Tracking Data
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatAltitude(flight.live.altitude)}</div>
                  <div className="text-sm text-gray-600">Altitude</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatSpeed(flight.live.speed_horizontal)}</div>
                  <div className="text-sm text-gray-600">Ground Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {flight.live.direction ? `${Math.round(flight.live.direction)}°` : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Heading</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {flight.live.is_ground ? 'Ground' : 'Airborne'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
              {flight.live.updated && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Last updated: {formatDateTime(flight.live.updated)}
                </div>
              )}
            </div>
          )}

          {/* Aircraft Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              Flight Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight Date:</span>
                  <span className="font-medium">{flight.flight_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{flight.flight_status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Airline Code:</span>
                  <span className="font-medium">{flight.airline.iata} / {flight.airline.icao}</span>
                </div>
              </div>
              <div className="space-y-3">
                {flight.aircraft.registration && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aircraft Registration:</span>
                    <span className="font-medium">{flight.aircraft.registration}</span>
                  </div>
                )}
                {flight.aircraft.iata && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aircraft Type:</span>
                    <span className="font-medium">{flight.aircraft.iata}</span>
                  </div>
                )}
                {flight.aircraft.icao24 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">ICAO24:</span>
                    <span className="font-medium font-mono text-sm">{flight.aircraft.icao24}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};