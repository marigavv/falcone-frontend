import React from 'react';

const VehicleSelector = ({ vehicles, selectedVehicles, onVehicleChange }) => {
  return (
    <div>
      <h3>Assign Four (4) Vehicles</h3>
      {selectedVehicles.map((vehicle, index) => (
        <div key={index}>
          <label>Vehicle for Planet {index + 1}:</label>
          <select
            value={vehicle?.name || ''}
            onChange={(e) => onVehicleChange(index, e.target.value)}
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.name} value={vehicle.name}>
                {vehicle.name} (Speed: {vehicle.speed}, Range: {vehicle.max_distance})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default VehicleSelector;