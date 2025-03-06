import React from 'react';

const PlanetSelector = ({ planets, selectedPlanets, onPlanetChange }) => {
  return (
    <div>
      <h3>Select Four (4) Planets</h3>
      {selectedPlanets.map((planet, index) => (
        <div key={index}>
          <label>Planet {index + 1}:</label>
          <select
            value={planet?.name || ''}
            onChange={(e) => onPlanetChange(index, e.target.value)}
          >
            <option value="">Select a planet</option>
            {planets.map((planet) => (
              <option key={planet.name} value={planet.name}>
                {planet.name} (Distance: {planet.distance})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default PlanetSelector;