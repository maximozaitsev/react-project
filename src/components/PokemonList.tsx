import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PokemonListProps {
  searchTerm: string;
  currentPage: number;
  onPokemonClick: (name: string) => void;
}

interface Pokemon {
  name: string;
}

const PokemonList: React.FC<PokemonListProps> = ({
  searchTerm,
  currentPage,
  onPokemonClick,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            offset: (currentPage - 1) * 20,
            limit: 20,
          },
        });
        setPokemonList(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentPage]);

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-list">
      {filteredPokemonList.map(pokemon => (
        <div key={pokemon.name} onClick={() => onPokemonClick(pokemon.name)}>
          {pokemon.name}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
