// src/components/PokemonList.tsx
import React, { useEffect, useState } from 'react';
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
  const [checkedPokemon, setCheckedPokemon] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchPokemon(currentPage));
  }, [currentPage, dispatch]);

  const filteredPokemonList = list.filter(pokemon =>
    pokemon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (
    pokemon: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    setCheckedPokemon(prevState =>
      prevState.includes(pokemon)
        ? prevState.filter(item => item !== pokemon)
        : [...prevState, pokemon]
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-list">
      {filteredPokemonList.map(pokemon => (
        <div
          key={pokemon}
          className="pokemon-item"
          onClick={() => onPokemonClick(pokemon)}
        >
          <input
            type="checkbox"
            checked={checkedPokemon.includes(pokemon)}
            onChange={event => handleCheckboxChange(pokemon, event)}
            onClick={event => event.stopPropagation()}
          />
          <span>{pokemon}</span>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
