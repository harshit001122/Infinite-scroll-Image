import React from 'react';
import Gallery from './components/Gallexy';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Infinite Scroll Image Gallery</h1>
      <Gallery />
    </div>
  );
};

export default App;