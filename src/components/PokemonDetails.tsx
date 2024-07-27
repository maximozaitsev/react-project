import React from 'react';
import { useFetchPokemonDetailsQuery } from '../services/pokemonApi';

interface PokemonDetailsProps {
  name: string;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name, onClose }) => {
  const { data: pokemon, error, isLoading } = useFetchPokemonDetailsQuery(name);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !pokemon) {
    return <p>Pokemon details not found</p>;
  }

  return (
    <div className="pokemon-details">
      <button onClick={onClose}>Close</button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
};

export default PokemonDetails;
