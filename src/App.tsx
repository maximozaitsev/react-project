import React, { Component } from 'react';
import Search from './Search';
import PokemonList from './PokemonList';

interface State {
  searchTerm: string;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term });
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    return (
      <div className="App">
        <h1>My Pokemon App</h1>
        <div className="top-section">
          <Search onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section">
          <PokemonList searchTerm={this.state.searchTerm} />
        </div>
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}

export default App;
