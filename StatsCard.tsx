import React from 'react';

const StatsCard = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-green-600 text-xs mt-2 font-medium">{trend}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;