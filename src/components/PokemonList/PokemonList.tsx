import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { toggleSelectPokemon } from '../../store/reducers/selectedPokemonSlice';
import { useFetchPokemonListQuery } from '../../services/pokemonApi';
import useTheme from '../../hooks/useTheme';
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
  const {
    data: list = [],
    error,
    isLoading,
  } = useFetchPokemonListQuery(currentPage);
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon
  );
  const { theme } = useTheme();

  // console.log('List of Pokemon:', list);
  // console.log('Selected Pokemon:', selectedPokemon);

  const filteredPokemonList = list.filter((pokemon: string) =>
    pokemon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (
    pokemon: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    dispatch(toggleSelectPokemon(pokemon));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <div className={`pokemon-list ${theme}`}>
      {filteredPokemonList.map((pokemon: string) => (
        <div
          key={pokemon}
          className={`pokemon-item ${theme}`}
          onClick={() => onPokemonClick(pokemon)}
        >
          <input
            type="checkbox"
            checked={selectedPokemon.includes(pokemon)}
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
