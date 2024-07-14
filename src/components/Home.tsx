import React from 'react';
import Search from '../Search';
import PokemonList from '../PokemonList';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

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

export default Home;
