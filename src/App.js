import React, { useState, useEffect } from 'react';
import { fetchPlanets, fetchVehicles, fetchToken, findFalcone } from './services/api';
import PlanetSelector from './components/PlanetSelector';
import VehicleSelector from './components/VehicleSelector';
import ResultsPage from './components/ResultDisplay';
import './styles/global.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([{}, {}, {}, {}]);
  const [selectedVehicles, setSelectedVehicles] = useState([{}, {}, {}, {}]);
  const [result, setResult] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  // Fetch planets and vehicles on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const planetsData = await fetchPlanets();
        setPlanets(planetsData);
      } catch (error) {
        setError('Failed to load planets. Please try again later.');
      }

      try {
        const vehiclesData = await fetchVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        setError('Failed to load vehicles. Please try again later.');
      }
    };

    loadData();
  }, []);

  // Handle planet selection
  const handlePlanetChange = (index, planetName) => {
    const newSelectedPlanets = [...selectedPlanets];
    newSelectedPlanets[index] = planets.find((p) => p.name === planetName);
    setSelectedPlanets(newSelectedPlanets);
  };

  // Handle vehicle selection
  const handleVehicleChange = (index, vehicleName) => {
    const vehicle = vehicles.find((v) => v.name === vehicleName);
    const planet = selectedPlanets[index];

    // Check if the vehicle can reach the planet
    if (planet.distance > vehicle.max_distance) {
      setError(`The ${vehicle.name} cannot reach ${planet.name}. Choose a different vehicle.`);
      return;
    }

    // Check if the vehicle is available
    const usedVehicles = selectedVehicles.filter((v) => v.name === vehicle.name).length;
    if (usedVehicles >= vehicle.total_no) {
      setError(`No more ${vehicle.name} units are available. Choose a different vehicle.`);
      return;
    }

    // Assign the vehicle
    const newSelectedVehicles = [...selectedVehicles];
    newSelectedVehicles[index] = vehicle;
    setSelectedVehicles(newSelectedVehicles);
    setError(null); // Clear any previous errors
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError(null);

    // Validate selected planets and vehicles
    if (selectedPlanets.some((planet) => !planet.name)) {
      setError('Please select 4 planets.');
      return;
    }

    if (selectedVehicles.some((vehicle) => !vehicle.name)) {
      setError('Please assign a vehicle to each planet.');
      return;
    }

    // Calculate time taken
    let totalTime = 0;
    selectedPlanets.forEach((planet, index) => {
      const vehicle = selectedVehicles[index];
      if (planet.distance && vehicle.speed) {
        totalTime += planet.distance / vehicle.speed;
      }
    });
    setTimeTaken(totalTime);

    try {
      // Submit the request
      const planetNames = selectedPlanets.map((p) => p.name);
      const vehicleNames = selectedVehicles.map((v) => v.name);
      const token = await fetchToken();
      const result = await findFalcone(token, planetNames, vehicleNames);

      console.log('API Response:', result); // Debugging: Log the API response

      if (result.status === 'success') {
        setResult(result);
        setShowResults(true);
      } else {
        setError('Failed to find Falcone. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while searching for Falcone. Please try again.');
    }
  };

  // Reset the game state
  const resetGame = () => {
    setSelectedPlanets([{}, {}, {}, {}]);
    setSelectedVehicles([{}, {}, {}, {}]);
    setResult(null);
    setTimeTaken(0);
    setShowResults(false);
    setError(null);
  };

  // If showResults is true, render the ResultsPage
  if (showResults) {
    return (
      <ResultsPage
        result={result}
        timeTaken={timeTaken}
        onBack={() => setShowResults(false)}
        onReset={resetGame}
      />
    );
  }

  // Otherwise, render the search page
  return (
    <div className="container">
      <h1>Find Falcone</h1>
      {error && <div className="error">{error}</div>}
      <PlanetSelector
        planets={planets}
        selectedPlanets={selectedPlanets}
        onPlanetChange={handlePlanetChange}
      />
      <VehicleSelector
        vehicles={vehicles}
        selectedVehicles={selectedVehicles}
        onVehicleChange={handleVehicleChange}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleSubmit}>Find Falcone</button>
        <button onClick={resetGame}>Reset</button> {/* Add Reset Button */}
      </div>
    </div>
  );
};

export default App;