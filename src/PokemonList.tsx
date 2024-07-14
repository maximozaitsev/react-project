import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface Props {
  searchTerm: string;
}

const PokemonList: React.FC<Props> = ({ searchTerm }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const offset = 0;
  const limit = 10;

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}&name=${searchTerm}`
        : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      const response = await axios.get(url);
      const pokemons = response.data.results.filter((pokemon: Pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      );

      setPokemons(pokemons);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      setLoading(false);
    }
  }, [searchTerm, offset, limit]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {pokemons.map((pokemon: Pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
