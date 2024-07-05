import React, { useState, useEffect } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
      setTerm(savedTerm);
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem('searchTerm', term);
    onSearch(term);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search Pokemon"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
