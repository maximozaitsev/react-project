'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Search from '../../src/components/Search/Search';
import PokemonList from '../../src/components/PokemonList/PokemonList';
import Pagination from '../../src/components/Pagination/Pagination';
import PokemonDetails from '../../src/components/PokemonDetails';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (searchParams.get('details')) {
      setSelectedPokemon(searchParams.get('details') as string);
    } else {
      setSelectedPokemon(null);
    }
  }, [searchParams]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', name);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    router.push(`${pathname}?${newParams.toString()}`);
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
