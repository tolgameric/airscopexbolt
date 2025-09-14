import React from 'react';
import { Search, Plane } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  showSearchIcon?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, showSearchIcon = true }) => {
  const Icon = showSearchIcon ? Search : Plane;
  
  return (
    <div className="text-center py-12">
      <div className="flex items-center justify-center mb-4">
        <div className="p-4 bg-gray-100 rounded-2xl">
          <Icon className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No flights found</h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
    </div>
  );
};