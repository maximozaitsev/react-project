import React, { Component } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface State {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
}

interface Props {
  searchTerm: string;
}

class PokemonList extends Component<Props, State> {
  constructor(props: Props) {
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchPokemons();
    }
  }

  fetchPokemons = async () => {
    const { searchTerm } = this.props;
    const { offset, limit } = this.state;
    this.setState({ loading: true, error: null });
    try {
      const url = searchTerm
        ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}&name=${searchTerm}`
        : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      const response = await axios.get(url);
      const pokemons = response.data.results.filter((pokemon: Pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      );

      this.setState({ pokemons, loading: false });
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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name}
              {/* Можно добавить описание, если оно доступно */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PokemonList;
