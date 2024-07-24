// src/components/PokemonList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../../reducers/pokemonSlice';
import { RootState, AppDispatch } from '../../store';
import './PokemonList.css';

interface PokemonListProps {
  searchTerm: string;
  currentPage: number;
  onPokemonClick: (name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  searchTerm,
  currentPage,
  onPokemonClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon(currentPage));
  }, [currentPage, dispatch]);

  const filteredPokemonList = list.filter(pokemon =>
    pokemon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-list">
      {filteredPokemonList.map(pokemon => (
        <div key={pokemon} onClick={() => onPokemonClick(pokemon)}>
          {pokemon}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
