import React from 'react';
import useTheme from '../../hooks/useTheme';
import styles from './ThemeSelector.module.css';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={`${styles.themeSelector} ${styles[theme]}`}
      onClick={handleClick}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeSelector;
