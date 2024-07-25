import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import NotFound from './components/NotFound/NotFound';
import Flyout from './components/Flyout/Flyout';
import { RootState } from './store/store';

const App: React.FC = () => {
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
    <Router>
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {selectedPokemon.length > 0 && <Flyout onDownload={handleDownload} />}
    </Router>
  );
};

export default App;
