import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../../store/reducers/pokemonSlice';
import { RootState, AppDispatch } from '../../store/store';
import { toggleSelectPokemon } from '../../store/reducers/selectedPokemonSlice';
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
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon
  );

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
    dispatch(toggleSelectPokemon(pokemon));
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
