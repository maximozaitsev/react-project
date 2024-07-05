import React, { Component } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
}

interface State {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
}

class PokemonList extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      pokemons: [],
      loading: false,
      error: null,
      offset: 0,
      limit: 10,
    };
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  fetchPokemons = async () => {
    const { offset, limit } = this.state;
    this.setState({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      this.setState({ pokemons: response.data.results, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: String(error), loading: false });
      }
    }
  };

  render() {
    const { pokemons, loading, error } = this.state;
    return (
      <div>
        <h1>Pokemon List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PokemonList;
