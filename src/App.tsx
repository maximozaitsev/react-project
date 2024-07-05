import React, { useState } from 'react';
import Search from './Search';
import PokemonList from './PokemonList';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <h1>My Pokemon App</h1>
      <div className="top-section">
        <Search onSearch={handleSearch} />
      </div>
      <div className="bottom-section">
        <PokemonList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;
