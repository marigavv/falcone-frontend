import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Router>
    <App />
  </Router>
);