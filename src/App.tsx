import React from 'react';
import { useSelector } from 'react-redux';
import Flyout from './components/Flyout/Flyout';
import { RootState } from './store/store';
import useTheme from './hooks/useTheme';

const App: React.FC = () => {
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon
  );
  const { theme } = useTheme();

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
      {selectedPokemon.length > 0 && <Flyout onDownload={handleDownload} />}
    </div>
  );
};

export default App;
