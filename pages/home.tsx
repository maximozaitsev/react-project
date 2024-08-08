import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Search from '../src/components/Search/Search';
import PokemonList from '../src/components/PokemonList/PokemonList';
import Pagination from '../src/components/Pagination/Pagination';
import PokemonDetails from '../src/components/PokemonDetails';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const router = useRouter();
  const { query } = router;

  const currentPage = parseInt((query.page as string) || '1', 10);

  useEffect(() => {
    if (query.details) {
      setSelectedPokemon(query.details as string);
    } else {
      setSelectedPokemon(null);
    }
  }, [query.details]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
    router.push({
      pathname: router.pathname,
      query: { ...query, details: name },
    });
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
    const newQuery = { ...query };
    delete newQuery.details;
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="App">
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
