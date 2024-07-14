import { useState } from 'react';
import Search from './Search';
import PokemonList from './PokemonList';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <div className="App">
      <h1>My Pokemon App</h1>
      <div className="top-section">
        <Search onSearch={handleSearch} />
      </div>
      <div className="bottom-section">
        <PokemonList searchTerm={searchTerm} />
      </div>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};

export default App;
