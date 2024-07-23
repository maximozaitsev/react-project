import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';
import PokemonList from './PokemonList';
import Pagination from '../components/Pagination';
import PokemonDetails from '../components/PokemonDetails';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get('page') || '1', 10);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
    params.set('details', name);
    navigate({ search: params.toString() });
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
    params.delete('details');
    navigate({ search: params.toString() });
  };

  return (
    <div className="App">
      <h1>My Pokemon App</h1>
      <div className="top-section">
        <Search onSearch={handleSearch} />
      </div>
      <div className="bottom-section">
        <div
          className={`left-section ${selectedPokemon ? 'with-details' : ''}`}
        >
          <PokemonList
            searchTerm={searchTerm}
            currentPage={currentPage}
            onPokemonClick={handlePokemonClick}
          />
          <Pagination currentPage={currentPage} totalPages={10} />
        </div>
        {selectedPokemon && (
          <div className="right-section">
            <PokemonDetails
              name={selectedPokemon}
              onClose={handleCloseDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
