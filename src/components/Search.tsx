import React from 'react';
import useSearchTerm from '../hooks/useSearchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [term, setTerm] = useSearchTerm();

  const handleSearch = () => {
    const trimmedTerm = term.trim();
    onSearch(trimmedTerm);
    localStorage.setItem('searchTerm', trimmedTerm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search Pokemon"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
