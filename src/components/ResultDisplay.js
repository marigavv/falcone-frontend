import React from 'react';

const ResultsPage = ({ result, timeTaken, onBack, onReset }) => {
  return (
    <div className="container results">
      {result?.status === 'success' ? (
        <>
          <h1>Congratulations on Finding Falcone!</h1>
          <h2>King Shan is mighty pleased.</h2>
          <p>Time Taken: {timeTaken}</p>
          <p>Planet Found: <strong>{result.planet}</strong></p> {/* Highlight the planet */}
        </>
      ) : (
        <>
          <h1>Mission Failed</h1>
          <h2>Falcone was not found. Better luck next time!</h2>
          <p>Time Taken: {timeTaken}</p>
        </>
      )}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={onBack}>Back to Search</button>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  );
};

export default ResultsPage;