// pages/index.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../src/components/Home';
import Header from '../src/components/Header/Header';
import Flyout from '../src/components/Flyout/Flyout';
import { RootState } from '../src/store/store';
import useTheme from '../src/hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme();
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon
  );

  const handleDownload = () => {
    const csvContent = `data:text/csv;charset=utf-8,${selectedPokemon.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedPokemon.length}_pokemon.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`app ${theme}`}>
      <Header />
      <Home />
      {selectedPokemon.length > 0 && <Flyout onDownload={handleDownload} />}
    </div>
  );
};

export default HomePage;
