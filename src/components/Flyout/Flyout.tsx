import React from 'react';
import './Flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearSelectedPokemon } from '../../store/reducers/selectedPokemonSlice';
import { useTheme } from '../../contexts/ThemeContext';

interface FlyoutProps {
  onDownload: () => void;
}

const Flyout: React.FC<FlyoutProps> = ({ onDownload }) => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon
  );
  const { theme } = useTheme();

  const handleUnselectAll = () => {
    dispatch(clearSelectedPokemon());
  };

  return (
    <div className={`flyout ${theme}`}>
      <p>{selectedPokemon.length} item(s) are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={onDownload}>Download</button>
    </div>
  );
};

export default Flyout;
