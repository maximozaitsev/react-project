import React from 'react';
import PokemonList from './PokemonList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>My Pokemon App</h1>
      <PokemonList />
    </div>
  );
};

export default App;
